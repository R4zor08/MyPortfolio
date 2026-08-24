import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  logo?: string;
  link?: string;
  github?: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 'recordsync',
    title: 'RecordSync',
    subtitle: 'Smart Payroll Management',
    description:
      'A real-time payroll system with biometric attendance, automated processing, and multi-branch employee management for full control from check-in to payout.',
    category: 'WEB APP / PAYROLL',
    image: '/recordsync-screenshot.png',
    technologies: ['React', 'Node.js', 'Biometric Integration', 'Cloud Sync'],
    link: 'https://recordsync.vercel.app/',
  },
  {
    id: 'citezen',
    title: 'CITEzen',
    subtitle: 'Student Concern System',
    description:
      'A Student Concern Management System designed to simplify the submission, tracking, and management of student concerns through a centralized digital platform.',
    category: 'WEB APP / STUDENT SYSTEM',
    image: '/citezen-screenshot.png',
    logo: '/citezen-logo.png',
    technologies: ['MongoDB', 'ExpressJS', 'React', 'Node.js'],
    github: 'https://github.com/R4zor08/CITEzen',
    link: 'https://citezen-demo.vercel.app',
  },
  {
    id: 'fireguard3',
    title: 'FIREGUARD3',
    subtitle: 'IoT Fire Safety',
    description:
      'An IoT-based Fire Alarm Monitoring System that provides real-time alerts and monitoring to improve safety and emergency response.',
    category: 'IOT / FIRE SAFETY',
    image: '/fireguard3-screenshot.png',
    logo: '/fireguard3-logo.png',
    technologies: ['MongoDB', 'ExpressJS', 'React', 'Node.js'],
    github: 'https://github.com/R4zor08/FIREGUARD3',
    link: 'https://fireguard3.vercel.app',
  },
];

const AUTOPLAY_MS = 5000;

export function Projects() {
  const reducedMotion = useReducedMotion();
  const count = projects.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number, direction = 1) => {
      setDir(direction);
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => goTo(index + 1, 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, index, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const active = projects[index];
  const nextProjects = useMemo(
    () =>
      Array.from({ length: Math.min(2, Math.max(0, count - 1)) }, (_, i) =>
        projects[(index + i + 1) % count]
      ),
    [index, count]
  );

  const onPointerDown = (x: number) => {
    dragStart.current = x;
    setPaused(true);
  };

  const onPointerUp = (x: number) => {
    if (dragStart.current === null) return;
    const dx = x - dragStart.current;
    dragStart.current = null;
    setPaused(false);
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <section
      id="projects"
      ref={stageRef}
      className="relative overflow-hidden bg-[#080812] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
      onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
      onMouseDown={(e) => onPointerDown(e.clientX)}
      onMouseUp={(e) => onPointerUp(e.clientX)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${active.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.15 : 0.45 }}
          className="absolute inset-0">
          <img
            src={active.image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-[#080812]/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080812]/90 via-[#080812]/45 to-[#080812]/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080812]/55 via-transparent to-[#080812]/75" />
          <div className="absolute inset-0 bg-purple-900/8" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 py-12 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-8 sm:mb-14 text-center">
            <h2
              className="font-heading font-bold text-white tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>
              Featured <span className="text-gradient">Projects</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-6 sm:gap-8 lg:gap-10 min-h-0 lg:min-h-[520px] items-stretch">
            <div className="flex flex-col justify-between min-w-0 py-1 order-1">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={active.id}
                  custom={dir}
                  initial={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: dir > 0 ? 18 : -18 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: dir > 0 ? -14 : 14 }
                  }
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="max-w-xl">
                  <p className="mb-2 sm:mb-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-purple-300/90">
                    {active.category}
                  </p>
                  <h3
                    className="font-heading font-bold text-white tracking-tight leading-[1.05] sm:leading-[0.95] mb-2 sm:mb-3"
                    style={{ fontSize: 'clamp(1.85rem, 8vw, 4.5rem)' }}>
                    {active.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300/95 leading-relaxed mb-2">
                    {active.subtitle}
                  </p>
                  <p className="text-sm sm:text-[15px] text-gray-400 leading-relaxed mb-4 sm:mb-5 line-clamp-3 sm:line-clamp-4">
                    {active.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5 sm:mb-6">
                    {active.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-white/15 bg-black/30 text-purple-100/90 backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {active.link && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 sm:px-5 py-2.5 text-sm font-semibold text-[#120a1c] transition-all hover:bg-white hover:-translate-y-0.5">
                        See More
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {active.github && (
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2.5 text-sm font-medium text-gray-200 backdrop-blur-sm transition-all hover:border-purple-400/45 hover:text-white">
                        <Github size={15} />
                        GitHub
                      </a>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center gap-2.5">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={prev}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-gray-200 backdrop-blur-md transition-all hover:border-purple-400/40 hover:text-white">
                  <ChevronLeft size={18} strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={next}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/35 text-gray-200 backdrop-blur-md transition-all hover:border-purple-400/40 hover:text-white">
                  <ChevronRight size={18} strokeWidth={1.75} />
                </button>
                <p className="ml-2 sm:ml-3 text-xs tracking-[0.18em] text-gray-500">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </p>
              </div>
            </div>

            <div className="relative order-2 flex items-center justify-center lg:justify-end gap-3 sm:gap-4 min-h-[220px] sm:min-h-[320px] md:min-h-[360px] overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                {nextProjects.map((project, i) => (
                  <motion.button
                    key={`${active.id}-next-${project.id}`}
                    type="button"
                    layout
                    initial={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: 48, scale: 0.96 }
                    }
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={
                      reducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -36, scale: 0.96 }
                    }
                    transition={{
                      duration: 0.4,
                      delay: reducedMotion ? 0 : i * 0.05,
                      ease: [0.25, 1, 0.5, 1],
                    }}
                    onClick={() => goTo((index + i + 1) % count, 1)}
                    className={`relative shrink-0 overflow-hidden rounded-2xl sm:rounded-[1.75rem] border border-white/15 shadow-[0_18px_50px_rgba(0,0,0,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 ${
                      i === 0
                        ? 'h-[220px] w-[150px] sm:h-[340px] sm:w-[220px] md:h-[400px] md:w-[250px]'
                        : 'hidden sm:block h-[230px] w-[150px] sm:h-[320px] sm:w-[200px] md:h-[380px] md:w-[230px]'
                    }`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-left">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-purple-200/90 mb-1 truncate">
                        {project.subtitle}
                      </p>
                      <p className="font-heading text-sm sm:text-lg font-semibold text-white truncate">
                        {project.title}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
