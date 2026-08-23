import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
];

export function Achievements() {
  const [preview, setPreview] = useState<Achievement | null>(null);

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

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-x-clip bg-[#0b0614]">
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
          className="mb-8 sm:mb-12 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-3 sm:mb-4"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {achievements.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => setPreview(item)}
              className="group text-left rounded-2xl overflow-hidden border border-white/10 bg-[#110c1a] shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/45 hover:shadow-[0_18px_40px_rgba(109,40,217,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60">
              <div className="relative aspect-[16/11] bg-white">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-contain p-2"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/90 backdrop-blur-sm">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                <p className="text-[10px] uppercase tracking-[0.18em] text-purple-300">
                  {item.issuer}
                </p>
                <h3 className="font-heading mt-1 text-base font-semibold text-white leading-snug group-hover:text-purple-100 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{item.date}</p>
              </div>
            </motion.button>
          ))}
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
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(100%,1100px)] max-h-[90dvh] overflow-y-auto rounded-2xl border border-purple-500/25 bg-[#0c0914] p-3 sm:p-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
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
                className="w-full max-h-[72dvh] object-contain rounded-lg bg-white"
              />
              <div className="mt-3 sm:mt-4 text-center px-2">
                <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">
                  {preview.title}
                </h3>
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
