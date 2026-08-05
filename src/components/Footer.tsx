import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowRight } from 'lucide-react';
import { SiGithub, SiFacebook, SiInstagram } from 'react-icons/si';
import type { IconType } from 'react-icons';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
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
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full glass-card border border-purple-500/30 text-purple-300 hover:text-white hover:border-purple-500/60 hover:shadow-[0_0_24px_rgba(139,92,246,0.4)] flex items-center justify-center transition-colors duration-300">
          <ArrowUp size={18} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

export function Footer() {
  return (
    <>
      <footer className="relative bg-[#050505] border-t border-white/5 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-purple-600/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-40 bg-violet-600/6 rounded-full blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 pt-14 sm:pt-16 pb-8">
          {/* Main grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <a
                href="#home"
                className="inline-flex items-center gap-2.5 text-2xl font-heading font-bold text-white tracking-tight mb-3 group">
                <span className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/30 bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
                  <img
                    src="/razor.png"
                    alt="Razor logo"
                    className="w-7 h-7 object-contain"
                  />
                </span>
                Razor
              </a>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-5">
                Web & App Developer building modern digital solutions from the Philippines.
              </p>

              <div className="flex gap-2.5">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-xl glass-card border border-white/10 text-gray-500 hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_16px_rgba(139,92,246,0.25)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-3 flex flex-col items-center sm:items-start">
              <h4 className="text-gray-400 font-heading font-semibold mb-4 text-xs tracking-[0.2em] uppercase">
                Navigate
              </h4>
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-6 gap-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-2 group">
                      <span className="w-1 h-1 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-all duration-200 shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini CTA */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start justify-center">
              <h4 className="text-gray-400 font-heading font-semibold mb-4 text-xs tracking-[0.2em] uppercase">
                Let&apos;s Work Together
              </h4>
              <p className="text-gray-500 text-sm mb-5 max-w-xs text-center sm:text-left">
                Open to freelance projects, collaborations, and new opportunities.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-glow hover:-translate-y-0.5 transition-transform duration-300">
                Get in touch
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-gray-700 text-xs order-1 sm:order-2">
              © 2026 R4zor08. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <BackToTop />
    </>
  );
}
