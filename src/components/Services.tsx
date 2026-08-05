import { motion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Layers,
  PenTool,
  Network,
  Database,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  iconGlow: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Building responsive, modern, and user-friendly websites using frontend and backend technologies.',
    tags: ['React', 'Node.js', 'REST APIs'],
    accent: 'from-violet-500/15 via-transparent to-purple-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(139,92,246,0.45)]',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Creating mobile applications with clean interfaces and smooth user experiences.',
    tags: ['Flutter', 'Dart', 'Cross-platform'],
    accent: 'from-purple-500/15 via-transparent to-fuchsia-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(168,85,247,0.45)]',
  },
  {
    icon: Layers,
    title: 'Full-Stack Development',
    description:
      'Developing complete digital solutions from frontend design to backend logic and database management.',
    tags: ['Frontend', 'Backend', 'Databases'],
    accent: 'from-indigo-500/15 via-transparent to-violet-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(99,102,241,0.4)]',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    description:
      'Designing clean, intuitive, and visually appealing interfaces focused on usability.',
    tags: ['Figma', 'Wireframes', 'Prototypes'],
    accent: 'from-fuchsia-500/15 via-transparent to-purple-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(217,70,239,0.35)]',
  },
  {
    icon: Network,
    title: 'API Integration',
    description:
      'Connecting applications with APIs to enable powerful features and seamless data flow.',
    tags: ['REST', 'JSON', 'Third-party'],
    accent: 'from-cyan-500/10 via-transparent to-violet-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(6,182,212,0.3)]',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Organizing, managing, and connecting databases for reliable application performance.',
    tags: ['MySQL', 'MongoDB', 'SQLite'],
    accent: 'from-emerald-500/10 via-transparent to-purple-600/5',
    iconGlow: 'group-hover:shadow-[0_0_24px_rgba(16,185,129,0.3)]',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-6 sm:p-7 relative overflow-hidden group cursor-default flex flex-col h-full min-h-[280px] w-[min(85vw,340px)] sm:w-[320px] lg:w-[360px] shrink-0 snap-center">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-start justify-between mb-5">
          <span className="font-mono text-xs font-bold text-purple-500/50 group-hover:text-purple-400/70 transition-colors tracking-widest">
            {num}
          </span>
          <div
            className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/40 transition-all duration-300 ${service.iconGlow}`}>
            <Icon size={26} strokeWidth={1.75} />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-heading font-semibold text-white mb-2.5 group-hover:text-purple-50 transition-colors">
          {service.title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow group-hover:text-gray-400 transition-colors">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5 group-hover:border-purple-500/15 transition-colors">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-500 border border-white/8 group-hover:border-purple-500/25 group-hover:text-purple-300/80 transition-all duration-300 font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="section-padding relative bg-[#0b0614] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 mix-blend-screen">
          <img
            src="/2.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-violet-600/12 rounded-full blur-[130px]" />
        <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-purple-600/12 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0614]/60 via-transparent to-[#0b0614]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 text-center max-w-2xl mx-auto">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            What I <span className="text-gradient">Do</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        {/* Horizontal scroll track */}
        <div className="relative -mx-4 sm:-mx-6 md:-mx-12">
          <div
            className="overflow-x-auto pb-4 scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}>
            <div className="flex gap-5 sm:gap-6 px-4 sm:px-6 md:px-12 snap-x snap-mandatory min-w-max">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}>
                  <ServiceCard service={service} index={index} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#0b0614] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0b0614] to-transparent" />
        </div>
      </div>
    </section>
  );
}
