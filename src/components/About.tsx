import { motion } from 'framer-motion';
import {
  Code,
  Smartphone,
  Layout,
  Lightbulb,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { PixelVanishAvatar } from './PixelVanishAvatar';

const highlights = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Responsive, performant sites with modern frameworks.',
    accent: 'from-violet-500/20 to-purple-600/5',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform apps with smooth, native-like UX.',
    accent: 'from-purple-500/20 to-fuchsia-600/5',
  },
  {
    icon: Layout,
    title: 'UI/UX Design',
    description: 'Clean interfaces that balance beauty and usability.',
    accent: 'from-indigo-500/20 to-violet-600/5',
  },
  {
    icon: Lightbulb,
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
    <section id="about" className="section-padding relative overflow-x-clip overflow-y-visible bg-[#080812]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-fuchsia-600/8 rounded-full blur-[100px]" />
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
          className="mb-12 sm:mb-16 text-center max-w-2xl mx-auto">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4">
            <div className="glass-card rounded-3xl p-6 sm:p-8 relative overflow-visible group h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Avatar with glowing ring + pixel vanish */}
                <div className="relative mb-6 overflow-visible z-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 blur-md opacity-60 scale-110 pointer-events-none" />
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-br from-purple-400 via-violet-500 to-purple-600 shadow-[0_0_40px_rgba(139,92,246,0.4)] overflow-visible">
                    <div className="relative w-full h-full rounded-full bg-[#0a0518] border-2 border-[#080812] overflow-visible">
                      <PixelVanishAvatar
                        baseSrc="/cb1b18c738d44dcfbf8c8ec0b89cfff1.png"
                        coverSrc="/spiderman.png?v=3"
                        alt="Profile photo covered by Spider-Man — hover or tap to reveal"
                      />
                    </div>
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-white mb-1">
                  Web & App Developer
                </h3>
                <p className="text-purple-300 text-sm font-medium mb-5">
                  BSCS Student · Philippines
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/25">
                    <GraduationCap size={12} />
                    Computer Science
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                    <MapPin size={12} />
                    Philippines
                  </span>
                </div>

                {/* Stats row */}
                <div className="w-full grid grid-cols-3 gap-1.5 sm:gap-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="glass-card rounded-2xl px-1.5 py-3 sm:px-3 sm:py-4 border-white/5 text-center">
                      <div className="font-heading font-bold text-base sm:text-xl text-gradient">
                        {stat.value}
                      </div>
                      <div className="text-[9px] sm:text-xs text-gray-500 mt-0.5 leading-tight px-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio + highlights */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Bio card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass-card rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -mr-24 -mt-24 transition-all duration-500 group-hover:bg-purple-600/18" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/8 rounded-full blur-3xl -ml-16 -mb-16" />

              <div className="relative z-10 space-y-5">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  I am a passionate <span className="text-purple-300 font-medium">Web & App Developer</span> and
                  a Bachelor of Science in Computer Science student from the
                  Philippines. I enjoy creating modern, responsive, and
                  user-friendly websites and mobile applications that combine
                  clean design with real functionality.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  I am continuously improving my skills and committed to building
                  meaningful digital solutions that solve real-world problems and
                  deliver great user experiences.
                </p>

                <blockquote className="relative border-l-2 border-purple-500/80 pl-4 sm:pl-5 py-3 text-gray-400 italic text-sm sm:text-base bg-gradient-to-r from-purple-500/8 to-transparent rounded-r-xl">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                  &ldquo;Every line of code is a chance to make someone&apos;s day a little easier.&rdquo;
                </blockquote>
              </div>
            </motion.div>

            {/* Highlight cards — bento grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="glass-card glass-card-hover rounded-2xl p-5 sm:p-6 relative overflow-hidden group cursor-default">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-400`}
                    />
                    <div className="relative z-10 flex gap-4 items-start">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 group-hover:text-purple-300 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                        <Icon size={22} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading font-semibold text-base sm:text-lg text-white mb-1.5 group-hover:text-purple-100 transition-colors">
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
