import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
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
      className={`fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-xl transition-shadow duration-300 ${
        isScrolled ? 'shadow-[0_8px_30px_rgba(0,0,0,0.45)]' : ''
      }`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="relative flex items-center justify-between h-20 sm:h-24">
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            className="shrink-0 font-heading font-bold text-xl sm:text-2xl text-white tracking-tight"
            aria-label="R4ZOR — Home">
            R4ZOR
          </a>

          {/* Desktop links — centered */}
          <nav
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2"
            aria-label="Main navigation">
            <ul className="flex items-center gap-5 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`relative block py-2.5 text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-500 hover:text-white'
                      }`}>
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center justify-center px-7 py-3.5 rounded-md text-base font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-[0_8px_24px_rgba(147,51,234,0.25)] hover:-translate-y-0.5 transition-all duration-200 shrink-0">
            Let&apos;s Talk
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-md border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500/40 transition-all duration-200"
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
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-[#050505]/98 backdrop-blur-xl">
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
                            ? 'text-white bg-white/[0.05] border border-white/10'
                            : 'text-gray-500 hover:text-white hover:bg-white/[0.03] border border-transparent'
                        }`}>
                        {link.name}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-4 block w-full text-center px-5 py-3 rounded-md text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors">
                Let&apos;s Talk
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
