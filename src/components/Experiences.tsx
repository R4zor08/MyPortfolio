import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2 } from 'lucide-react';

const experiences = [
  {
    icon: Briefcase,
    role: 'Freelance Web & App Developer',
    org: 'Independent',
    period: '2024 — Present',
    location: 'Philippines',
    description:
      'Designing and building responsive websites and mobile apps for personal and freelance projects, from UI to backend APIs and deployment.',
    tags: ['React', 'Node.js', 'Flutter', 'MongoDB'],
  },
  {
    icon: GraduationCap,
    role: 'BSCS Student · Academic Projects',
    org: 'Computer Science',
    period: '2022 — Present',
    location: 'Philippines',
    description:
      'Building academic systems focused on real campus needs — student concern management, sentiment analysis, and practical full-stack workflows.',
    tags: ['CITEzen', 'NEMSUTalks', 'Full-Stack'],
  },
  {
    icon: Code2,
    role: 'Independent Project Developer',
    org: 'Personal Builds',
    period: '2023 — Present',
    location: 'Remote',
    description:
      'Shipping end-to-end products including IoT fire monitoring, car rental management, and a car wash booking mobile experience.',
    tags: ['FIREGUARD3', 'WheelGo', 'WashGO'],
  },
];

export function Experiences() {
  return (
    <section
      id="experience"
      className="section-padding relative overflow-x-clip bg-[#080812]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 -right-24 w-72 h-72 bg-purple-600/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/8 rounded-full blur-[100px]" />
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
            My <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent"
            aria-hidden="true"
          />

          <ul className="space-y-5 sm:space-y-6">
            {experiences.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.role}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="relative pl-12 sm:pl-16">
                  <div className="absolute left-0 sm:left-2 top-5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-purple-500/40 bg-[#0e0a18] text-purple-300 shadow-[0_0_16px_rgba(139,92,246,0.25)]">
                    <Icon size={15} />
                  </div>

                  <article className="glass-card glass-card-hover rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-white/[0.08] group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-base sm:text-lg text-white group-hover:text-purple-100 transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-purple-300/90 text-sm font-medium mt-0.5">
                          {item.org}
                          <span className="text-gray-600 mx-1.5">·</span>
                          <span className="text-gray-500 font-normal">{item.location}</span>
                        </p>
                      </div>
                      <span className="shrink-0 self-start text-[11px] sm:text-xs font-medium tracking-wide text-purple-300/80 bg-purple-500/10 border border-purple-500/25 rounded-full px-3 py-1">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-500 border border-white/8 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
