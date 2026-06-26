import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10 mb-12 text-center md:text-left">
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <a
              href="#home"
              className="text-2xl font-heading font-bold text-white tracking-tight flex items-center gap-1 mb-4">
              
              Ryan<span className="text-purple-500">.dev</span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building modern web and mobile solutions with creativity, clean
              code, and purpose.
            </p>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="text-white font-heading font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Skills', 'Projects', 'Services', 'Contact'].map(
                (link) =>
                <li key={link}>
                    <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                    
                      {link}
                    </a>
                  </li>

              )}
            </ul>
          </div>

          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="text-white font-heading font-semibold mb-4">
              Connect
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors">
                
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors">
                
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:ryanllanto44@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors">
                
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            Ryan C. Llanto — Web & App Developer
          </p>
          <p className="text-gray-500 text-sm">
            © 2026 Ryan C. Llanto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>);

}