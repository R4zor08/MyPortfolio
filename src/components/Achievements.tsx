import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Trophy,
  Rocket,
  Layers,
  Cpu,
  Github,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

type Achievement = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  number: string;
};

const achievements: Achievement[] = [
  {
    icon: Rocket,
    number: '01',
    title: '5+ Projects Shipped',
    description:
      'Built and published full applications across web, mobile, AI, and IoT — from concept to working demos.',
    accent: 'from-violet-500/25 to-purple-600/5',
  },
  {
    icon: Layers,
    number: '02',
    title: 'Full-Stack Delivery',
    description:
      'End-to-end experience with React, Node.js, Express, MongoDB, Flutter, and REST APIs in real project builds.',
    accent: 'from-purple-500/25 to-fuchsia-600/5',
  },
  {
    icon: Cpu,
    number: '03',
    title: 'AI & IoT Systems',
    description:
      'Developed NEMSUTalks for AI sentiment analysis and FIREGUARD3 for real-time IoT fire monitoring.',
    accent: 'from-indigo-500/25 to-violet-600/5',
  },
  {
    icon: Github,
    number: '04',
    title: 'Open GitHub Portfolio',
    description:
      'Active repositories under R4zor08 showcasing CITEzen, WheelGo, WashGO, and more for public review.',
    accent: 'from-fuchsia-500/25 to-purple-600/5',
  },
  {
    icon: Trophy,
    number: '05',
    title: 'Problem-Focused Builds',
    description:
      'Focused on practical campus and community tools — student concerns, bookings, rentals, and safety systems.',
    accent: 'from-amber-500/20 to-purple-600/5',
  },
];

const AUTOPLAY_MS = 4200;

function AchievementCard({
  item,
  isActive,
}: {
  item: Achievement;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <article
      className={`relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border p-6 sm:p-8 transition-all duration-500 ${
        isActive
          ? 'border-purple-400/40 bg-[#120d1f] shadow-[0_20px_60px_rgba(76,29,149,0.35)]'
          : 'border-white/10 bg-[#100c1a] shadow-[0_10px_30px_rgba(0,0,0,0.35)]'
      }`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.accent} transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-40'
        }`}
      />
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-purple-500/15 blur-3xl" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-400 ${
              isActive
                ? 'border-purple-400/50 bg-purple-500/20 text-purple-200 shadow-[0_0_24px_rgba(139,92,246,0.35)]'
                : 'border-purple-500/25 bg-purple-500/10 text-purple-300'
            }`}>
            <Icon size={24} />
          </div>
          <span className="font-heading text-4xl font-bold text-white/[0.06]">
            {item.number}
          </span>
        </div>

        <h3
          className={`mb-3 font-heading text-xl font-semibold sm:text-2xl transition-colors duration-300 ${
            isActive ? 'text-white' : 'text-gray-200'
          }`}>
          {item.title}
        </h3>
        <p
          className={`text-sm leading-relaxed sm:text-[15px] transition-colors duration-300 ${
            isActive ? 'text-gray-300' : 'text-gray-500'
          }`}>
          {item.description}
        </p>

        <div className="mt-auto pt-6">
          <div
            className={`h-1 w-16 rounded-full transition-all duration-500 ${
              isActive
                ? 'bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                : 'bg-white/10'
            }`}
          />
        </div>
      </div>
    </article>
  );
}

export function Achievements() {
  const reducedMotion = useReducedMotion();
  const count = achievements.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef<number | null>(null);
  const dragDelta = useRef(0);

  const goTo = useCallback(
    (next: number, dir = 1) => {
      setDirection(dir);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, count]);

  const getCardStyle = (i: number) => {
    let dist = i - index;
    if (dist > count / 2) dist -= count;
    if (dist < -count / 2) dist += count;

    if (dist === 0) {
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1)',
        pointerEvents: 'auto' as const,
      };
    }
    if (dist === -1) {
      return {
        transform: 'translateX(-72%) scale(0.86) rotateY(28deg)',
        opacity: 0.55,
        zIndex: 20,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto' as const,
      };
    }
    if (dist === 1) {
      return {
        transform: 'translateX(72%) scale(0.86) rotateY(-28deg)',
        opacity: 0.55,
        zIndex: 20,
        filter: 'brightness(0.72)',
        pointerEvents: 'auto' as const,
      };
    }
    if (dist === -2) {
      return {
        transform: 'translateX(-125%) scale(0.72) rotateY(42deg)',
        opacity: 0.2,
        zIndex: 10,
        filter: 'brightness(0.45)',
        pointerEvents: 'none' as const,
      };
    }
    if (dist === 2) {
      return {
        transform: 'translateX(125%) scale(0.72) rotateY(-42deg)',
        opacity: 0.2,
        zIndex: 10,
        filter: 'brightness(0.45)',
        pointerEvents: 'none' as const,
      };
    }
    return {
      transform: `translateX(${dist > 0 ? 160 : -160}%) scale(0.55) rotateY(${
        dist > 0 ? -55 : 55
      }deg)`,
      opacity: 0,
      zIndex: 0,
      filter: 'brightness(0.3)',
      pointerEvents: 'none' as const,
    };
  };

  const onPointerDown = (clientX: number) => {
    dragStartX.current = clientX;
    dragDelta.current = 0;
    setPaused(true);
  };

  const onPointerMove = (clientX: number) => {
    if (dragStartX.current === null) return;
    dragDelta.current = clientX - dragStartX.current;
  };

  const onPointerUp = () => {
    if (dragStartX.current === null) return;
    const dx = dragDelta.current;
    dragStartX.current = null;
    if (Math.abs(dx) > 45) {
      if (dx < 0) next();
      else prev();
    }
    setPaused(false);
  };

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-x-clip bg-[#0b0614] select-none">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/8 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[50vh] bg-purple-600/8 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-8 sm:mb-12 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
          <p className="mt-4 text-xs text-gray-500 md:hidden tracking-wide">
            Swipe to explore →
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
          onTouchEnd={onPointerUp}
          onMouseDown={(e) => onPointerDown(e.clientX)}
          onMouseMove={(e) => {
            if (e.buttons === 1) onPointerMove(e.clientX);
          }}
          onMouseUp={onPointerUp}>
          {/* Side controls */}
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-1 sm:px-2">
            <button
              type="button"
              aria-label="Previous achievement"
              onClick={prev}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]">
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next achievement"
              onClick={next}
              className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-purple-400/50 hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* 3D cover-flow stage */}
          <div className="relative mx-auto h-[340px] sm:h-[380px] md:h-[400px] w-full overflow-hidden [perspective:1200px]">
            {achievements.map((item, i) => {
              const style = getCardStyle(i);
              const isActive = i === index;

              return (
                <div
                  key={item.title}
                  role="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-label={item.title}
                  onClick={() => {
                    if (i !== index) goTo(i, i > index ? 1 : -1);
                  }}
                  className="absolute left-1/2 top-1/2 h-[280px] w-[min(82vw,320px)] sm:h-[300px] sm:w-[360px] cursor-pointer [transform-style:preserve-3d] will-change-transform"
                  style={{
                    transform: `translate(-50%, -50%) ${style.transform}`,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    filter: style.filter,
                    pointerEvents: style.pointerEvents,
                    transition: reducedMotion
                      ? 'opacity 0.2s ease'
                      : 'transform 0.65s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.65s ease, filter 0.65s ease',
                  }}>
                  <AchievementCard item={item} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Active title crossfade under carousel */}
          <div className="relative mx-auto mt-2 h-8 max-w-md overflow-hidden text-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.p
                key={achievements[index].title}
                custom={direction}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction > 0 ? 12 : -12 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction > 0 ? -12 : 12 }
                }
                transition={{ duration: 0.28 }}
                className="absolute inset-0 text-sm text-purple-300/90 font-medium truncate px-4">
                {achievements[index].title}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {achievements.map((item, i) => {
              const active = i === index;
              return (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Go to ${item.title}`}
                  aria-current={active}
                  onClick={() => goTo(i, i > index ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active
                      ? 'w-8 bg-gradient-to-r from-purple-400 to-fuchsia-400 shadow-[0_0_12px_rgba(168,85,247,0.55)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              );
            })}
          </div>

          {/* Autoplay progress bar */}
          {!reducedMotion && (
            <div className="mx-auto mt-4 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                key={`${index}-${paused}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{
                  duration: paused ? 0 : AUTOPLAY_MS / 1000,
                  ease: 'linear',
                }}
                className="h-full origin-left bg-gradient-to-r from-purple-500 to-fuchsia-400"
                style={paused ? { scaleX: 0 } : undefined}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
