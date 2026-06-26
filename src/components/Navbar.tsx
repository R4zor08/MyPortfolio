import React, { useEffect, useState } from 'react';
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
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-purple-500/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-2">
          <img
            src="/razor.png"
            alt="R4zor08 logo"
            className="w-10 h-10 sm:w-12 sm:h-14 object-contain drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]"
          />
          <span className="hidden sm:inline">R4zor08</span>
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${activeSection === link.href.substring(1) ? 'text-purple-400' : 'text-gray-300'}`}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-glow">
            Contact Me
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden text-gray-300 hover:text-white p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#080812]/95 backdrop-blur-xl border-b border-purple-500/20 py-4 px-6 md:hidden flex flex-col gap-4 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium py-2 border-b border-white/5 ${activeSection === link.href.substring(1) ? 'text-purple-400' : 'text-gray-300'}`}>
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 text-center rounded-full text-base font-medium text-white bg-gradient-glow">
              Contact Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
