import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';
export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! I will get back to you soon.');
  };
  return (
    <section
      id="contact"
      className="section-padding relative bg-[#0b0614] overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-20 mix-blend-screen -translate-y-1/2">
        <img
          src="/1.png"
          alt="Abstract Glow"
          className="w-full h-full object-cover" />
        
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          className="mb-16 text-center max-w-2xl mx-auto">
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto mb-6"></div>
          <p className="text-gray-400">
            Have a project idea, collaboration, or opportunity? Let’s connect
            and build something meaningful.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Contact Info Card */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            className="lg:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl -mr-10 -mt-10" />

            <h3 className="text-2xl font-heading font-bold text-white mb-2">
              Ryan C. Llanto
            </h3>
            <p className="text-purple-400 font-medium mb-8">
              Web & App Developer
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                  <MapPin size={18} />
                </div>
                <span>Philippines</span>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                  <Mail size={18} />
                </div>
                <a
                  href="mailto:ryanllanto44@gmail.com"
                  className="hover:text-purple-400 transition-colors break-all sm:break-normal text-sm">
                  ryanllanto44@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400 border border-white/10">
                  <Phone size={18} />
                </div>
                <a
                  href="tel:+639453475555"
                  className="hover:text-purple-400 transition-colors text-sm">
                  +63 945 347 5555
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-purple-500">
                
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-purple-500">
                
                <Linkedin size={18} />
              </a>
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300 border border-white/10 hover:border-purple-500">
                
                <Globe size={18} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            viewport={{
              once: true
            }}
            className="lg:col-span-3 glass-card p-8 rounded-3xl">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300">
                    
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="John Doe" />
                  
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-300">
                    
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="john@example.com" />
                  
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-300">
                  
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  placeholder="Project Collaboration" />
                
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300">
                  
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Tell me about your project...">
                </textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-medium text-white bg-gradient-glow flex justify-center items-center gap-2">
                
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}