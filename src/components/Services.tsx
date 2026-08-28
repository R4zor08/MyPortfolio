import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Layers,
  PenTool,
  Network,
  Database,
  type LucideIcon,
} from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  accent: string;
  iconGlow: string;
  ring: string;
  glow: string;
};

const services: Service[] = [
  {
    icon: Globe,
    title: 'Web Development',
    description:
      'Building responsive, modern, and user-friendly websites using frontend and backend technologies.',
    tags: ['React', 'Node.js', 'REST APIs'],
    accent: 'from-violet-500/20 via-transparent to-purple-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(139,92,246,0.35)]',
    ring: 'from-violet-400/50',
    glow: 'bg-violet-500/20',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description:
      'Creating mobile applications with clean interfaces and smooth user experiences.',
    tags: ['Flutter', 'Dart', 'Cross-platform'],
    accent: 'from-purple-500/20 via-transparent to-fuchsia-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(168,85,247,0.35)]',
    ring: 'from-fuchsia-400/50',
    glow: 'bg-fuchsia-500/20',
  },
  {
    icon: Layers,
    title: 'Full-Stack Development',
    description:
      'Developing complete digital solutions from frontend design to backend logic and database management.',
    tags: ['Frontend', 'Backend', 'Databases'],
    accent: 'from-indigo-500/20 via-transparent to-violet-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(99,102,241,0.3)]',
    ring: 'from-indigo-400/50',
    glow: 'bg-indigo-500/20',
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    description:
      'Designing clean, intuitive, and visually appealing interfaces focused on usability.',
    tags: ['Figma', 'Wireframes', 'Prototypes'],
    accent: 'from-fuchsia-500/20 via-transparent to-purple-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(217,70,239,0.28)]',
    ring: 'from-pink-400/50',
    glow: 'bg-pink-500/20',
  },
  {
    icon: Network,
    title: 'API Integration',
    description:
      'Connecting applications with APIs to enable powerful features and seamless data flow.',
    tags: ['REST', 'JSON', 'Third-party'],
    accent: 'from-cyan-500/15 via-transparent to-violet-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(6,182,212,0.25)]',
    ring: 'from-cyan-400/50',
    glow: 'bg-cyan-500/20',
  },
  {
    icon: Database,
    title: 'Database Management',
    description:
      'Organizing, managing, and connecting databases for reliable application performance.',
    tags: ['MySQL', 'MongoDB', 'SQLite'],
    accent: 'from-emerald-500/15 via-transparent to-purple-600/5',
    iconGlow: 'shadow-[0_0_28px_rgba(16,185,129,0.25)]',
    ring: 'from-emerald-400/50',
    glow: 'bg-emerald-500/20',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const num = String(index + 1).padStart(2, '0');

  return (
    <article className="service-stack-card group relative h-full w-full">
      <div
        className={`pointer-events-none absolute -inset-px rounded-[1.5rem] sm:rounded-[1.75rem] lg:rounded-[2rem] bg-gradient-to-br ${service.ring} via-purple-500/10 to-transparent opacity-70`}
        aria-hidden="true"
      />
      <div className="relative h-full overflow-hidden rounded-[1.45rem] sm:rounded-[1.7rem] lg:rounded-[1.95rem] border border-white/[0.1] bg-[#0c0916]/95 backdrop-blur-2xl shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-80`}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent" />
        <div
          className={`absolute -top-20 -right-16 h-44 w-44 rounded-full blur-3xl ${service.glow} opacity-60`}
          aria-hidden="true"
        />

        <span
          className="pointer-events-none absolute right-4 top-2 sm:right-5 sm:top-3 font-heading text-6xl sm:text-7xl lg:text-8xl font-bold text-white/[0.04] select-none"
          aria-hidden="true">
          {num}
        </span>

        <div className="relative z-10 flex min-h-[24rem] sm:min-h-[26rem] lg:min-h-[28rem] flex-col p-5 sm:p-7 md:p-9 lg:p-10">
          <div className="mb-5 sm:mb-7 flex items-start justify-between gap-4 sm:gap-5">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-purple-300/80">
                Service {num}
              </p>
              <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug break-words">
                {service.title}
              </h3>
            </div>
            <div
              className={`flex h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 shrink-0 items-center justify-center rounded-2xl border border-purple-400/25 bg-purple-500/10 text-purple-200 ${service.iconGlow}`}
              aria-hidden="true">
              <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" strokeWidth={1.75} />
            </div>
          </div>

          <p className="mb-5 sm:mb-7 flex-grow text-sm sm:text-base lg:text-lg leading-relaxed text-gray-300/90">
            {service.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 sm:gap-2.5 border-t border-white/[0.08] pt-5 sm:pt-6">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-3 sm:px-3.5 py-1 text-[10px] sm:text-xs lg:text-sm font-medium text-purple-100/90">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Services() {
  const reducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const stackConfig = useMemo(() => {
    if (isMobile) {
      return {
        itemDistance: 72,
        itemStackDistance: 18,
        stackPosition: '16%',
        endReleaseOffset: 32,
        blurAmount: 0,
        enableSmoothScroll: false,
      };
    }

    if (isDesktop) {
      return {
        itemDistance: 96,
        itemStackDistance: 28,
        stackPosition: '20%',
        endReleaseOffset: 48,
        blurAmount: reducedMotion ? 0 : 1.5,
        enableSmoothScroll: !reducedMotion,
      };
    }

    return {
      itemDistance: 84,
      itemStackDistance: 24,
      stackPosition: '18%',
      endReleaseOffset: 40,
      blurAmount: reducedMotion ? 0 : 1.25,
      enableSmoothScroll: !reducedMotion,
    };
  }, [isMobile, isDesktop, reducedMotion]);

  return (
    <section
      id="services"
      className="relative overflow-x-clip bg-[#0b0614] pt-14 sm:pt-20 md:pt-24 pb-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 h-full w-full opacity-15 mix-blend-screen">
          <img
            src="/2.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 -right-12 sm:-right-24 h-48 w-48 sm:h-80 sm:w-80 rounded-full bg-violet-600/12 blur-[90px] sm:blur-[130px]" />
        <div className="absolute bottom-1/4 -left-12 sm:-left-24 h-44 w-44 sm:h-72 sm:w-72 rounded-full bg-purple-600/12 blur-[80px] sm:blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0614]/70 via-transparent to-[#0b0614]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-5 sm:mb-8 md:mb-10 max-w-2xl text-center px-1">
          <h2
            className="font-heading font-bold tracking-tight text-white"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3rem)' }}>
            What I <span className="text-gradient">Do</span>
          </h2>
          <div className="mx-auto mt-3 sm:mt-4 h-1 w-20 sm:w-24 rounded-full bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="services-stack-stage relative">
          <div
            className="pointer-events-none absolute left-1/2 top-[12%] sm:top-[16%] h-[min(60vw,360px)] sm:h-[min(70vw,460px)] w-[min(95vw,560px)] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[70px] sm:blur-[100px]"
            aria-hidden="true"
          />

          <ScrollStack
            key={`${isMobile}-${isDesktop}-${reducedMotion}`}
            useWindowScroll
            enableSmoothScroll={stackConfig.enableSmoothScroll}
            className="services-scroll-stack"
            itemDistance={stackConfig.itemDistance}
            itemStackDistance={stackConfig.itemStackDistance}
            stackPosition={stackConfig.stackPosition}
            scaleEndPosition="10%"
            baseScale={0.9}
            itemScale={0.02}
            blurAmount={stackConfig.blurAmount}
            rotationAmount={0}
            fitLastCardToEnd
            endReleaseOffset={stackConfig.endReleaseOffset}>
            {services.map((service, index) => (
              <ScrollStackItem key={service.title} itemClassName="services-scroll-stack-item">
                <ServiceCard service={service} index={index} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}
