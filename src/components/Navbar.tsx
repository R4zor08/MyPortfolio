import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 120 && rect.bottom >= 120;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050505]/75 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex items-center justify-between h-16 sm:h-[4.25rem]">
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="Razor — Home">
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center group-hover:border-purple-500/40 transition-colors duration-300 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <img
                src="/razor.png"
                alt=""
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </span>
            <span className="font-heading font-bold text-base sm:text-lg text-white tracking-tight">
              Razor
            </span>
          </a>

          {/* Desktop links — centered */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation">
            <ul className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white bg-white/[0.1] shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                          : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                      }`}>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-400" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-glow hover:-translate-y-0.5 transition-transform duration-300 shrink-0">
            Hire Me
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-gray-300 hover:text-white hover:border-purple-500/40 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-[#080812]/95 backdrop-blur-xl">
            <nav aria-label="Mobile navigation" className="px-4 sm:px-6 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}>
                      <a
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-purple-500/15 border border-purple-500/25'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}>
                        {link.name}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-4 block w-full text-center px-5 py-3 rounded-full text-sm font-semibold text-white bg-gradient-glow">
                Hire Me
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
