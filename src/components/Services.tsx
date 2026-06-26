import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Layers,
  PenTool,
  Network,
  Database } from
'lucide-react';
const services = [
{
  icon: <Globe size={28} />,
  title: 'Web Development',
  description:
  'Building responsive, modern, and user-friendly websites using frontend and backend technologies.'
},
{
  icon: <Smartphone size={28} />,
  title: 'Mobile App Development',
  description:
  'Creating mobile applications with clean interfaces and smooth user experiences.'
},
{
  icon: <Layers size={28} />,
  title: 'Full-Stack Development',
  description:
  'Developing complete digital solutions from frontend design to backend logic and database management.'
},
{
  icon: <PenTool size={28} />,
  title: 'UI/UX Design',
  description:
  'Designing clean, intuitive, and visually appealing interfaces focused on usability.'
},
{
  icon: <Network size={28} />,
  title: 'API Integration',
  description:
  'Connecting applications with APIs to enable powerful features and seamless data flow.'
},
{
  icon: <Database size={28} />,
  title: 'Database Management',
  description:
  'Organizing, managing, and connecting databases for reliable application performance.'
}];

export function Services() {
  return (
    <section
      id="services"
      className="section-padding relative bg-[#0b0614] overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 mix-blend-screen">
        <img
          src="/2.png"
          alt="Abstract Light Wave"
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
          className="mb-16 text-center">
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            What I <span className="text-gradient">Do</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) =>
          <motion.div
            key={index}
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
            transition={{
              delay: index * 0.1
            }}
            whileHover={{
              scale: 1.03
            }}
            className="glass-card glass-card-hover p-6 md:p-8 rounded-2xl flex flex-col gap-4 group">
            
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold text-white mt-2">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {service.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}