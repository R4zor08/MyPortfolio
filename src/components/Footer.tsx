import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SiGithub, SiFacebook, SiInstagram } from 'react-icons/si';
import type { IconType } from 'react-icons';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks: { label: string; href: string; icon: IconType }[] = [
  { label: 'GitHub', href: 'https://github.com/R4zor08', icon: SiGithub },
  { label: 'Facebook', href: 'https://www.facebook.com/Ryeeeee505', icon: SiFacebook },
  { label: 'Instagram', href: 'https://www.instagram.com/r4zorrrz/', icon: SiInstagram },
];

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Back to top"
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-4 sm:left-6 z-50 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a0a12]/90 text-gray-400 backdrop-blur-md transition-colors duration-300 hover:border-purple-400/40 hover:text-white">
          <ArrowUp size={17} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <>
      <footer className="relative overflow-hidden bg-[#050505]">
        {/* Soft top edge + ambient wash */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
          <div className="absolute bottom-0 left-1/2 h-40 w-[min(90vw,520px)] -translate-x-1/2 rounded-full bg-purple-600/[0.07] blur-[90px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12 pt-10 sm:pt-12 pb-8 sm:pb-10">
          {/* Primary row: brand · nav · social */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            {/* Brand */}
            <a
              href="#home"
              className="group inline-flex items-center gap-2.5 shrink-0"
              aria-label="Razor — Home">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden sm:h-10 sm:w-10">
                <img
                  src="/razor.png"
                  alt=""
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </span>
              <span className="font-heading text-lg font-bold tracking-tight text-white sm:text-xl">
                Razor
              </span>
            </a>

            {/* Nav — single horizontal strip */}
            <nav aria-label="Footer navigation" className="w-full max-w-xl lg:max-w-none lg:flex-1">
              <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-7">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="relative text-[13px] text-gray-500 transition-colors duration-200 hover:text-white sm:text-sm after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-purple-400 after:transition-all after:duration-300 hover:after:w-full">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <div className="flex items-center gap-1 shrink-0">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition-all duration-300 hover:bg-white/[0.04] hover:text-purple-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Bottom meta */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 sm:mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:flex-row">
            <p className="text-[11px] tracking-wide text-gray-600 sm:text-xs">
              © 2026 R4zor08
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 text-[11px] tracking-wide text-gray-500 transition-colors duration-200 hover:text-purple-300 sm:text-xs">
              Available for work
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </motion.div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
