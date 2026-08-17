import { motion } from 'framer-motion';

const HEADLINE = 'PORTFOLIO';
const ROLE = 'WEB & APP DEVELOPER';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#050505] pb-0">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <motion.div
          animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] h-[45%] bg-purple-600/15 rounded-full blur-[140px]"
        />
      </div>

      {/* Composition: ends at portrait bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end px-3 sm:px-4 pt-[5.5rem] sm:pt-28">
        {/* Role — same font family, weight, letter-spacing & center as PORTFOLIO */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="hero-display-solid relative z-20 select-none text-center mb-1 sm:mb-2"
          style={{
            fontSize: 'clamp(1.35rem, 4.5vw + 0.35rem, 3.25rem)',
            lineHeight: 0.9,
          }}>
          {ROLE}
        </motion.p>

        <div className="relative w-full max-w-6xl mx-auto flex items-end justify-center">
          {/* Layer 1 — solid PORTFOLIO */}
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

          {/* Layer 3 — outline PORTFOLIO */}
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
