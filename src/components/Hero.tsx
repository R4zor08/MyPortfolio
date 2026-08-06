import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HEADLINE = 'PORTFOLIO';

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#050505] flex flex-col pb-6 sm:pb-12 sm:min-h-[100svh]">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] h-[50%] bg-purple-600/15 rounded-full blur-[140px]"
        />
      </div>

      {/* Corner metadata */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute top-[4.75rem] sm:top-24 left-3 sm:left-6 md:left-10 max-w-[42%] truncate text-[10px] sm:text-xs md:text-sm tracking-[0.15em] uppercase text-gray-400 font-medium">
          Web &amp; App Developer
        </motion.p>

        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="absolute top-[4.75rem] sm:top-24 right-3 sm:right-6 md:right-10 pointer-events-auto inline-flex items-center gap-1.5 sm:gap-2 min-h-[44px] sm:min-h-0 text-[10px] sm:text-xs md:text-sm tracking-[0.12em] uppercase text-gray-400 hover:text-purple-300 transition-colors font-medium">
          <span className="hidden sm:inline">Available for work</span>
          <span className="sm:hidden">Available</span>
          <ArrowRight size={14} className="text-purple-400 shrink-0" />
        </motion.a>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 md:left-10 max-w-[45%] truncate text-[10px] sm:text-xs md:text-sm tracking-[0.12em] text-gray-400 font-medium">
          Ryan C. Llanto
        </motion.p>

        <motion.a
          href="https://github.com/R4zor08"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="absolute bottom-3 sm:bottom-6 right-3 sm:right-6 md:right-10 pointer-events-auto max-w-[45%] truncate text-[10px] sm:text-xs md:text-sm tracking-[0.08em] text-gray-500 hover:text-purple-300 transition-colors font-medium">
          <span className="sm:hidden">GitHub</span>
          <span className="hidden sm:inline">github.com/R4zor08</span>
        </motion.a>
      </div>

      {/* Composition: PORTFOLIO perfectly centered on portrait */}
      <div className="relative z-10 flex sm:flex-1 items-end justify-center px-3 sm:px-4 pt-16 sm:pt-24">
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center overflow-hidden">
          {/* Layer 1 — solid PORTFOLIO (true center) */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            aria-label="Portfolio"
            className="hero-display-solid absolute inset-0 flex items-center justify-center z-[1] select-none pointer-events-none"
            style={{ fontSize: 'clamp(2.25rem, 11vw + 0.25rem, 15rem)' }}>
            {HEADLINE}
          </motion.h1>

          {/* Layer 2 — portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-[2] w-[min(62vw,280px)] sm:w-[min(58vw,500px)] md:w-[min(50vw,540px)]">
            <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-[80px] scale-90 translate-y-6 pointer-events-none" />
            <img
              src="/cb1b18c738d44dcfbf8c8ec0b89cfff1.png"
              alt="Ryan C. Llanto"
              className="relative w-full h-auto object-contain object-bottom block"
              draggable={false}
            />
          </motion.div>

          {/* Layer 3 — outline PORTFOLIO (true center, over face) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            aria-hidden="true"
            className="hero-display-outline absolute inset-0 flex items-center justify-center z-[3] select-none pointer-events-none"
            style={{ fontSize: 'clamp(2.25rem, 11vw + 0.25rem, 15rem)' }}>
            {HEADLINE}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
