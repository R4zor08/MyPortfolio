import { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Trophy,
  Rocket,
  Layers,
  Cpu,
  Github,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  type LucideIcon,
} from 'lucide-react';

type Achievement = {
  icon: LucideIcon;
  title: string;
  description: string;
  number: string;
  tone: string;
};

const achievements: Achievement[] = [
  {
    icon: Rocket,
    number: '01',
    title: '5+ Projects Shipped',
    description:
      'Built and published full applications across web, mobile, AI, and IoT — from concept to working demos.',
    tone: 'from-[#1a1230] via-[#241848] to-[#120c22]',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Full-Stack Delivery',
    description:
      'End-to-end experience with React, Node.js, Express, MongoDB, Flutter, and REST APIs in real project builds.',
    tone: 'from-[#18122e] via-[#2a1850] to-[#100c1c]',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'AI & IoT Systems',
    description:
      'Developed NEMSUTalks for AI sentiment analysis and FIREGUARD3 for real-time IoT fire monitoring.',
    tone: 'from-[#14182e] via-[#1e2450] to-[#0e1020]',
  },
  {
    icon: Github,
    number: '04',
    title: 'Open GitHub Portfolio',
    description:
      'Active repositories under R4zor08 showcasing CITEzen, WheelGo, WashGO, and more for public review.',
    tone: 'from-[#1c1230] via-[#3a1850] to-[#120a1c]',
  },
  {
    icon: Trophy,
    number: '05',
    title: 'Problem-Focused Builds',
    description:
      'Focused on practical campus and community tools — student concerns, bookings, rentals, and safety systems.',
    tone: 'from-[#1c1620] via-[#3a2818] to-[#120e0c]',
  },
];

const AUTOPLAY_MS = 4500;

/** Cylindrical carousel math — cards sit on an invisible arc facing the viewer */
function getCylinderStyle(
  index: number,
  active: number,
  total: number,
  compact: boolean
) {
  let dist = index - active;
  if (dist > total / 2) dist -= total;
  if (dist < -total / 2) dist += total;

  const abs = Math.abs(dist);
  const rotateY = dist * (compact ? -22 : -34);
  const translateX = dist * (compact ? 48 : 62);
  const translateZ = -Math.abs(dist) * (compact ? 70 : 110);
  const scale = dist === 0 ? 1 : Math.max(compact ? 0.78 : 0.7, 1 - abs * (compact ? 0.1 : 0.13));
  const opacity = dist === 0 ? 1 : Math.max(0, 1 - abs * (compact ? 0.42 : 0.34));
  const brightness = dist === 0 ? 1 : Math.max(0.42, 1 - abs * 0.24);

  return {
    transform: `translate(-50%, -50%) translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: 40 - abs * 5,
    filter: `brightness(${brightness})`,
    pointerEvents: (abs <= (compact ? 1 : 2) ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
  };
}

function AchievementMediaCard({
  item,
  isActive,
}: {
  item: Achievement;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-xl border transition-shadow duration-500 ${
        isActive
          ? 'border-purple-400/35 shadow-[0_18px_50px_rgba(76,29,149,0.35)]'
          : 'border-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.35)]'
      }`}>
      {/* Photo-like filled card surface */}
      <div className={`absolute inset-0 bg-gradient-to-br ${item.tone}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(168,85,247,0.22),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Soft vignette like product photos */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

      <div className="relative z-10 flex h-full flex-col p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div
            className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-all duration-400 ${
              isActive
                ? 'border-purple-300/40 bg-purple-500/20 text-purple-100 shadow-[0_0_22px_rgba(139,92,246,0.4)]'
                : 'border-white/15 bg-white/5 text-purple-200/80'
            }`}>
            <Icon size={22} className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
          </div>
          <span className="font-heading text-2xl sm:text-3xl font-bold text-white/10">{item.number}</span>
        </div>

        <div className="mt-auto">
          <h3
            className={`font-heading text-base sm:text-xl font-semibold leading-tight mb-1.5 sm:mb-2 ${
              isActive ? 'text-white' : 'text-white/85'
            }`}>
            {item.title}
          </h3>
          <p
            className={`text-xs sm:text-sm leading-relaxed line-clamp-3 ${
              isActive ? 'text-gray-300' : 'text-gray-400/80'
            }`}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Achievements() {
  const reducedMotion = useReducedMotion();
  const count = achievements.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const goTo = useCallback(
    (next: number) => setIndex(((next % count) + count) % count),
    [count]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, index, goTo]);

  const onPointerDown = (x: number) => setDragStart(x);
  const onPointerUp = (x: number) => {
    if (dragStart === null) return;
    const dx = x - dragStart;
    setDragStart(null);
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-x-clip bg-[#0b0614] select-none">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/8 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-8 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
          onMouseDown={(e) => onPointerDown(e.clientX)}
          onMouseUp={(e) => onPointerUp(e.clientX)}>
          {/* Cylinder stage */}
          <div className="relative mx-auto h-[300px] sm:h-[400px] md:h-[420px] w-full overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                perspective: reducedMotion ? undefined : compact ? '900px' : '1400px',
                perspectiveOrigin: '50% 50%',
              }}>
              {achievements.map((item, i) => {
                const style = getCylinderStyle(i, index, count, compact);
                const isActive = i === index;

                return (
                  <div
                    key={item.number}
                    role="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={item.title}
                    aria-current={isActive}
                    onClick={() => {
                      if (i !== index) goTo(i);
                    }}
                    className="absolute left-1/2 top-1/2 h-[240px] w-[min(78vw,240px)] sm:h-[310px] sm:w-[280px] md:h-[330px] md:w-[300px] cursor-pointer [transform-style:preserve-3d] will-change-transform"
                    style={{
                      transform: style.transform,
                      opacity: style.opacity,
                      zIndex: style.zIndex,
                      filter: style.filter,
                      pointerEvents: style.pointerEvents,
                      transition: reducedMotion
                        ? 'opacity 0.2s ease'
                        : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease, filter 0.55s ease',
                    }}>
                    <AchievementMediaCard item={item} isActive={isActive} />
                  </div>
                );
              })}
            </div>

            {/* Soft purple glow under active card */}
            <div className="pointer-events-none absolute bottom-6 sm:bottom-8 left-1/2 h-8 sm:h-10 w-[min(55vw,240px)] -translate-x-1/2 rounded-[100%] bg-purple-500/35 blur-2xl" />
            <div className="pointer-events-none absolute bottom-8 sm:bottom-10 left-1/2 h-3 sm:h-4 w-[min(40vw,160px)] -translate-x-1/2 rounded-[100%] bg-fuchsia-400/25 blur-xl" />
          </div>

          {/* Controls */}
          <div className="relative z-20 -mt-1 sm:-mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-7 px-1">
            <button
              type="button"
              aria-label="Previous achievement"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center text-purple-300/80 transition-colors hover:text-purple-200">
              <ChevronLeft size={26} strokeWidth={1.5} />
            </button>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-purple-400/45 bg-transparent px-4 sm:px-6 py-2.5 text-sm font-medium text-purple-200 transition-all duration-300 hover:border-purple-300/70 hover:bg-purple-500/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.25)]">
              View Projects
              <ArrowUpRight size={15} strokeWidth={1.75} />
            </a>

            <button
              type="button"
              aria-label="Next achievement"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center text-purple-300/80 transition-colors hover:text-purple-200">
              <ChevronRight size={26} strokeWidth={1.5} />
            </button>
          </div>

          <p className="mt-3 sm:mt-4 text-center text-[11px] tracking-[0.2em] text-gray-500">
            {String(index + 1).padStart(2, '0')} — {String(count).padStart(2, '0')}
          </p>
        </div>
      </div>
    </section>
  );
}
