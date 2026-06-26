import React from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] flex items-center pt-28 pb-8 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <img
          src="/1.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-full h-full object-cover opacity-30 mix-blend-screen"
        />
        <motion.div
          animate={{ x: [-30, 30, -30], y: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 md:w-[500px] md:h-[500px] bg-purple-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ x: [30, -30, 30], y: [20, -20, 20] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 md:w-[600px] md:h-[600px] bg-violet-600/15 rounded-full blur-[150px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-4">
              Web & App <br />
              <span className="text-gradient">Developer</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl">
              Crafting modern web and mobile applications with clean code,
              creative design, and innovative solutions.
            </p>
          </div>

          <blockquote className="border-l-2 border-purple-500 pl-4 sm:pl-5 py-2 my-2 text-gray-400 italic text-sm sm:text-base bg-gradient-to-r from-purple-500/5 to-transparent rounded-r-lg relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
            &ldquo;Turning ideas into digital experiences that make an impact.&rdquo;
          </blockquote>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-4">
            <a
              href="#projects"
              className="w-full sm:w-auto flex justify-center px-8 py-3.5 rounded-full font-medium text-white bg-gradient-glow shadow-lg hover:-translate-y-1 transition-transform duration-300">
              View My Projects
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto flex justify-center px-8 py-3.5 rounded-full font-medium text-white glass-card hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              Get In Touch
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 md:order-2 flex justify-center items-end min-h-[280px] sm:min-h-[360px] md:min-h-[480px] mt-4 md:mt-0">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-48 h-48 sm:w-72 md:w-[28rem] md:h-[28rem] bg-purple-600/40 rounded-full blur-[120px]"
            />
          </div>
          <div className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[660px] flex justify-center translate-y-4 sm:translate-y-8 md:translate-y-16">
            <img
              src="/cb1b18c738d44dcfbf8c8ec0b89cfff1.png"
              alt="Ryan C. Llanto"
              className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(168,85,247,0.4)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
