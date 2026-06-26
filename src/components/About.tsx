import React from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Layout, Lightbulb } from 'lucide-react';
export function About() {
  const highlights = [
  {
    icon: <Code size={20} />,
    title: 'Web Development'
  },
  {
    icon: <Smartphone size={20} />,
    title: 'Mobile Apps'
  },
  {
    icon: <Layout size={20} />,
    title: 'UI/UX Design'
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Problem Solving'
  }];

  return (
    <section id="about" className="section-padding relative overflow-hidden bg-[#080812]">
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
          className="mb-16 text-center md:text-left">
          
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto md:mx-0"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-12 items-start">
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
            className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden group">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -mr-20 -mt-20 transition-all duration-500 group-hover:bg-purple-600/20" />

            <div className="relative z-10 space-y-6 text-gray-300 leading-relaxed">
              <p>
                I am a passionate Web &amp; App Developer and a Bachelor of
                Science in Computer Science student from the Philippines. I
                enjoy creating modern, responsive, and user-friendly websites
                and mobile applications that combine clean design with real
                functionality. I am continuously improving my skills and
                committed to building meaningful digital solutions that solve
                real-world problems and deliver great user experiences.
              </p>
            </div>
          </motion.div>

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
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            
            {highlights.map((item, index) =>
            <motion.div
              key={index}
              whileHover={{
                scale: 1.02
              }}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group">
              
                <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 group-hover:text-purple-300 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-heading font-semibold text-lg text-white">
                  {item.title}
                </h3>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>);

}