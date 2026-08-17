import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  Layout,
  Lightbulb,
  GraduationCap,
  MapPin,
  Quote,
  ArrowUpRight,
} from 'lucide-react';
import { PixelVanishAvatar } from './PixelVanishAvatar';

const highlights = [
  {
    icon: Code,
    number: '01',
    title: 'Web Development',
    description: 'Responsive, performant sites with modern frameworks.',
    accent: 'from-violet-500/20 to-purple-600/5',
  },
  {
    icon: Smartphone,
    number: '02',
    title: 'Mobile Apps',
    description: 'Cross-platform apps with smooth, native-like UX.',
    accent: 'from-purple-500/20 to-fuchsia-600/5',
  },
  {
    icon: Layout,
    number: '03',
    title: 'UI/UX Design',
    description: 'Clean interfaces that balance beauty and usability.',
    accent: 'from-indigo-500/20 to-violet-600/5',
  },
  {
    icon: Lightbulb,
    number: '04',
    title: 'Problem Solving',
    description: 'Turning complex ideas into practical digital solutions.',
    accent: 'from-fuchsia-500/20 to-purple-600/5',
  },
];

const stats = [
  { value: '5+', label: 'Projects Built' },
  { value: 'BSCS', label: 'Student' },
  { value: 'PH', label: 'Based In' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
  },
};

export function About() {
  return (
    <section
      id="about"
      className="section-padding relative overflow-x-clip overflow-y-visible bg-[#080812]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 -left-24 sm:-left-32 w-56 h-56 sm:w-80 sm:h-80 bg-purple-600/15 rounded-full blur-[100px] sm:blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-violet-600/10 rounded-full blur-[110px] sm:blur-[140px]" />
        <div className="absolute top-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-fuchsia-600/8 rounded-full blur-[80px] sm:blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-start">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="glass-card rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 relative overflow-visible group h-full border-purple-400/15 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-[2rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-transparent to-violet-600/5 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-6 sm:inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent" />
              </div>
              <div className="absolute -top-20 -right-20 w-40 h-40 sm:w-48 sm:h-48 bg-purple-600/15 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar with glowing ring + pixel vanish */}
                <div className="relative mb-5 sm:mb-7 z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 shrink-0 max-w-full">
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow:
                        '0 0 28px 8px rgba(139,92,246,0.4), 0 0 48px 12px rgba(168,85,247,0.18)',
                    }}
                  />
                  <div className="relative w-full h-full rounded-full p-[2px] sm:p-[3px] bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 overflow-hidden">
                    <div
                      className="relative w-full h-full rounded-full bg-[#0a0518] border-2 border-[#080812] overflow-hidden"
                      style={{ clipPath: 'circle(50%)' }}>
                      <PixelVanishAvatar
                        baseSrc="/cb1b18c738d44dcfbf8c8ec0b89cfff1.png"
                        coverSrc="/spiderman.png?v=4"
                        alt="Profile photo covered by Spider-Man — hover or tap to reveal"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-[2px] sm:border-[3px] border-[#10101c] bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)]">
                    <span className="sr-only">Available for projects</span>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white mb-1">
                  Ryan C. Llanto
                </h3>
                <p className="text-purple-300 text-xs sm:text-sm font-medium mb-4 sm:mb-5">
                  Web & App Developer
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-5 sm:mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/25">
                    <GraduationCap size={12} className="shrink-0" />
                    Computer Science
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                    <MapPin size={12} className="shrink-0" />
                    Philippines
                  </span>
                </div>

                {/* Stats row */}
                <div className="w-full grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-3 border-t border-white/[0.07] pt-5 sm:pt-6">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="min-w-0 rounded-xl sm:rounded-2xl border border-white/[0.07] bg-black/20 px-1 py-2.5 sm:px-2 sm:py-3 md:px-3 md:py-4 text-center transition-colors duration-300 hover:border-purple-400/25 hover:bg-purple-500/[0.06]">
                      <div className="font-heading font-bold text-sm sm:text-base md:text-xl text-gradient truncate">
                        {stat.value}
                      </div>
                      <div className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5 leading-tight px-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio + highlights */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-5 md:gap-6 min-w-0">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card rounded-2xl sm:rounded-[2rem] p-5 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden group border-white/[0.08]">
              <div className="absolute inset-y-6 sm:inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-purple-500/70 to-transparent hidden sm:block" />
              <div className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-purple-600/10 rounded-full blur-3xl -mr-16 sm:-mr-24 -mt-16 sm:-mt-24 transition-all duration-500 group-hover:bg-purple-600/18" />
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-violet-600/8 rounded-full blur-3xl -ml-10 sm:-ml-16 -mb-10 sm:-mb-16" />

              <div className="relative z-10 space-y-4 sm:space-y-5">
                <div>
                  <span className="mb-2 sm:mb-3 block text-[10px] font-semibold uppercase tracking-[0.25em] text-purple-400">
                    My story
                  </span>
                  <h3
                    className="max-w-2xl font-heading font-bold leading-tight text-white"
                    style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.875rem)' }}>
                    Building digital experiences that feel{' '}
                    <span className="text-gradient">simple and meaningful.</span>
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  I am a passionate{' '}
                  <span className="text-purple-300 font-medium">Web & App Developer</span> and a
                  Bachelor of Science in Computer Science student from the Philippines. I enjoy
                  creating modern, responsive, and user-friendly websites and mobile applications
                  that combine clean design with real functionality.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  I am continuously improving my skills and committed to building meaningful
                  digital solutions that solve real-world problems and deliver great user
                  experiences.
                </p>

                <blockquote className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-purple-400/15 bg-purple-500/[0.06] py-3.5 sm:py-4 pl-12 sm:pl-14 pr-4 sm:pr-5 text-sm italic leading-relaxed text-gray-300 sm:text-base">
                  <Quote
                    className="absolute left-3 sm:left-4 top-3.5 sm:top-4 text-purple-400/70"
                    size={20}
                  />
                  &ldquo;Every line of code is a chance to make someone&apos;s day a little
                  easier.&rdquo;
                </blockquote>
              </div>
            </motion.div>

            {/* Highlight cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="glass-card glass-card-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 relative overflow-hidden group cursor-default border-white/[0.08] min-w-0">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                    />
                    <span className="absolute right-4 sm:right-5 top-3 sm:top-4 font-heading text-3xl sm:text-4xl font-bold text-white/[0.035] transition-colors duration-300 group-hover:text-purple-400/[0.08]">
                      {item.number}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-700 opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-300 group-hover:opacity-100 hidden sm:block"
                    />
                    <div className="relative z-10 flex gap-3 sm:gap-4 items-start">
                      <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                        <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
                      </div>
                      <div className="min-w-0 flex-1 pr-2">
                        <h3 className="font-heading font-semibold text-sm sm:text-base md:text-lg text-white mb-1 sm:mb-1.5 group-hover:text-purple-100 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
