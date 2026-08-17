import { motion } from 'framer-motion';
import {
  Trophy,
  Rocket,
  Layers,
  Cpu,
  Github,
  type LucideIcon,
} from 'lucide-react';

type Achievement = {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
};

const achievements: Achievement[] = [
  {
    icon: Rocket,
    title: '5+ Projects Shipped',
    description:
      'Built and published full applications across web, mobile, AI, and IoT — from concept to working demos.',
    accent: 'from-violet-500/20 to-purple-600/5',
  },
  {
    icon: Layers,
    title: 'Full-Stack Delivery',
    description:
      'End-to-end experience with React, Node.js, Express, MongoDB, Flutter, and REST APIs in real project builds.',
    accent: 'from-purple-500/20 to-fuchsia-600/5',
  },
  {
    icon: Cpu,
    title: 'AI & IoT Systems',
    description:
      'Developed NEMSUTalks for AI sentiment analysis and FIREGUARD3 for real-time IoT fire monitoring.',
    accent: 'from-indigo-500/20 to-violet-600/5',
  },
  {
    icon: Github,
    title: 'Open GitHub Portfolio',
    description:
      'Active repositories under R4zor08 showcasing CITEzen, WheelGo, WashGO, and more for public review.',
    accent: 'from-fuchsia-500/20 to-purple-600/5',
  },
  {
    icon: Trophy,
    title: 'Problem-Focused Builds',
    description:
      'Focused on practical campus and community tools — student concerns, bookings, rentals, and safety systems.',
    accent: 'from-amber-500/15 to-purple-600/5',
  },
];

export function Achievements() {
  return (
    <section
      id="achievements"
      className="section-padding relative overflow-x-clip bg-[#0b0614]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/8 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {achievements.map((item, index) => {
            const Icon = item.icon;
            const featured = index === 0;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className={`glass-card glass-card-hover relative overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-white/[0.08] group cursor-default ${
                  featured ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                />
                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/10 text-purple-300 group-hover:border-purple-500/45 group-hover:bg-purple-500/20 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-white mb-2 group-hover:text-purple-100 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
