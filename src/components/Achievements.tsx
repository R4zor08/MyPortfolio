import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';

type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
};

const achievements: Achievement[] = [
  {
    id: 'startup-bootcamp',
    title: 'Startup Incubation Bootcamp',
    issuer: 'NEMSU × DOST',
    date: 'December 17–19, 2025',
    description:
      'Completed Ignite and Incubate, a 3-day comprehensive startup incubation bootcamp in Tandag City.',
    image: '/certificates/startup-bootcamp.png',
  },
  {
    id: 'technical-workshop',
    title: 'Technical Workshop Completion',
    issuer: 'NEMSU College of ITE',
    date: 'May 27–29, 2026',
    description:
      'Completed Graphics & Web Design, paperless software integration, Minecraft Education, and Advanced Microsoft Office.',
    image: '/certificates/technical-workshop.png',
  },
  {
    id: 'aquila-internship',
    title: 'Back-End Developer Internship',
    issuer: 'Aquila Softwares',
    date: 'June 15 – August 7, 2026',
    description:
      'Completed 324 hours of internship as a Back-End Developer Intern with dedication and skill.',
    image: '/certificates/aquila-internship.png',
  },
  {
    id: 'founders-forum',
    title: 'Founders Forum: Navigating the Startup Journey',
    issuer: 'NEMSU × DOST CARAGA',
    date: 'August 29, 2026',
    description:
      'Certificate of Participation for actively joining the Founders Forum at NEMSU Tandag Campus, fostering innovation, entrepreneurship, and technology-driven learning.',
    image: '/certificates/founders-forum.jpg',
  },
];

const AUTOPLAY_MS = 5500;

function getSlideStyle(index: number, active: number, total: number, compact: boolean) {
  let dist = index - active;
  if (dist > total / 2) dist -= total;
  if (dist < -total / 2) dist += total;

  const abs = Math.abs(dist);
  const shift = compact ? 72 : 78;
  const scale = dist === 0 ? 1 : 0.84;
  const opacity = dist === 0 ? 1 : abs === 1 ? 0.38 : 0;

  return {
    transform: `translate(-50%, -50%) translateX(${dist * shift}%) scale(${scale})`,
    opacity,
    zIndex: 20 - abs,
    pointerEvents: (abs <= 1 ? 'auto' : 'none') as React.CSSProperties['pointerEvents'],
  };
}

export function Achievements() {
  const reducedMotion = useReducedMotion();
  const count = achievements.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);
  const [preview, setPreview] = useState<Achievement | null>(null);

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
    if (paused || reducedMotion || preview) return;
    const id = window.setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, preview, index, goTo]);

  useEffect(() => {
    if (!preview) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [preview]);

  const onPointerDown = (x: number) => setDragStart(x);
  const onPointerUp = (x: number) => {
    if (dragStart === null) return;
    const dx = x - dragStart;
    setDragStart(null);
    if (Math.abs(dx) < 40) return;
    if (dx < 0) next();
    else prev();
  };

  const active = achievements[index];

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-x-clip bg-[#0b0614] select-none">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-purple-600/12 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-6 sm:mb-10 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-3"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto" />
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => onPointerUp(e.changedTouches[0].clientX)}
          onMouseDown={(e) => onPointerDown(e.clientX)}
          onMouseUp={(e) => onPointerUp(e.clientX)}>
          <div className="relative mx-auto h-[240px] sm:h-[300px] md:h-[340px] w-full">
            {achievements.map((item, i) => {
              const style = getSlideStyle(i, index, count, compact);
              const isActive = i === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  aria-current={isActive}
                  onClick={() => {
                    if (i !== index) goTo(i);
                    else setPreview(item);
                  }}
                  className="absolute left-1/2 top-1/2 h-[200px] w-[min(86vw,300px)] sm:h-[250px] sm:w-[400px] md:h-[280px] md:w-[460px] rounded-2xl overflow-hidden bg-[#f7f4ef] p-[5px] sm:p-1.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/70"
                  style={{
                    transform: style.transform,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                    boxShadow: isActive
                      ? '0 0 0 1px rgba(196,181,253,0.35), 0 22px 50px rgba(76,29,149,0.35)'
                      : '0 10px 28px rgba(0,0,0,0.28)',
                    transition: reducedMotion
                      ? 'opacity 0.2s ease'
                      : 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease, box-shadow 0.4s ease',
                  }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="h-full w-full rounded-xl object-contain bg-white"
                  />
                </button>
              );
            })}
          </div>

          <div className="mt-6 sm:mt-8 text-center min-h-[72px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}>
                <p className="text-[10px] uppercase tracking-[0.22em] text-purple-300/90">
                  {active.issuer}
                </p>
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-white mt-1">
                  {active.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{active.date}</p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md p-3 sm:p-6 flex items-center justify-center"
            onClick={() => setPreview(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(100%,1040px)] max-h-[90dvh] rounded-2xl border border-white/10 bg-[#0c0914] p-3 sm:p-5">
              <button
                type="button"
                aria-label="Close certificate"
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-gray-300 hover:text-white">
                <X size={18} />
              </button>
              <img
                src={preview.image}
                alt={preview.title}
                className="w-full max-h-[70dvh] object-contain rounded-lg bg-white"
              />
              <div className="mt-4 text-center px-2">
                <h3 className="font-heading text-lg font-semibold text-white">{preview.title}</h3>
                <p className="text-sm text-purple-300 mt-1">
                  {preview.issuer} · {preview.date}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
                  {preview.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
