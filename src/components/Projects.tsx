import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Project = {
  title: string;
  description: string;
  category: string;
  image: string;
  logo?: string;
  link?: string;
  github?: string;
};

const projects: Project[] = [
  {
    title: 'CITEzen',
    description:
      'A Student Concern Management System designed to simplify the submission, tracking, and management of student concerns through a centralized digital platform.',
    category: 'WEB APP / STUDENT SYSTEM',
    image: '/1.png',
  },
  {
    title: 'NEMSUTalks',
    description:
      'A Student Sentiment Analysis System that leverages AI to collect, analyze, and manage student feedback for better communication and decision-making.',
    category: 'AI / SENTIMENT ANALYSIS',
    image: '/2.png',
  },
  {
    title: 'FIREGUARD3',
    description:
      'An IoT-based Fire Alarm Monitoring System that provides real-time alerts and monitoring to improve safety and emergency response.',
    category: 'IOT / FIRE SAFETY',
    image: '/3.png',
  },
  {
    title: 'WheelGo',
    description:
      'A Car Rental Management System that streamlines vehicle reservations and fleet management through a modern web application.',
    category: 'WEB APP / CAR RENTAL',
    image: '/1.png',
  },
  {
    title: 'WashGO',
    description:
      'A Car Wash Booking Mobile App designed to simplify car wash appointments, service booking, customer management, and booking status tracking through a convenient mobile platform.',
    category: 'MOBILE APP / BOOKING',
    image: '/2.png',
    github: 'https://github.com/R4zor08/WashGO',
  },
];

const AUTO_ADVANCE_MS = 5000;
const ANGLE_STEP = 360 / projects.length;
const RADIUS = 430;

function getInitials(title: string) {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ProjectBranding({ project }: { project: Project }) {
  const subtitle = project.category.split('/')[0]?.trim() ?? 'PROJECT';

  return (
    <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20 flex items-center gap-2 md:gap-3">
      {project.logo ? (
        <img
          src={project.logo}
          alt=""
          className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-[0_0_12px_rgba(139,92,246,0.6)]"
        />
      ) : (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 font-heading font-bold text-sm md:text-base shadow-[0_0_20px_rgba(139,92,246,0.3)]">
          {getInitials(project.title)}
        </div>
      )}
      <div className="flex flex-col leading-tight">
        <span className="font-heading font-bold text-white text-xs md:text-base tracking-wide uppercase">
          {project.title.replace(/\s/g, '')}
        </span>
        <span className="text-[10px] md:text-xs text-purple-400/80 tracking-[0.2em] uppercase">
          {subtitle}
        </span>
      </div>
    </div>
  );
}

function DeviceMockups({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center md:justify-end md:pr-4 pt-10 sm:pt-8 md:pt-0">
      {/* Laptop */}
      <div className="relative z-10 w-[85%] max-w-[260px] sm:max-w-[320px] md:max-w-[380px] -rotate-2 translate-x-2 md:translate-x-0">
        <div className="rounded-xl border border-white/15 bg-[#0a0a12] shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(139,92,246,0.2)] overflow-hidden">
          <div className="h-6 md:h-7 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
          <div className="relative aspect-[16/10] bg-gradient-to-br from-[#13082a] to-[#050505]">
            <img
              src={image}
              alt={`${title} desktop preview`}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
          </div>
        </div>
        <div className="mx-auto w-[90%] h-2 bg-gradient-to-b from-gray-700/80 to-gray-900 rounded-b-lg" />
      </div>

      {/* Phone */}
      <div className="absolute right-0 md:right-2 bottom-0 md:bottom-4 z-20 w-[28%] max-w-[70px] sm:max-w-[90px] md:max-w-[100px] rotate-6">
        <div className="rounded-[1.25rem] border-2 border-white/15 bg-[#0a0a12] p-1 shadow-[0_10px_40px_rgba(0,0,0,0.5),0_0_25px_rgba(139,92,246,0.25)]">
          <div className="rounded-[1rem] overflow-hidden aspect-[9/19] bg-gradient-to-br from-[#13082a] to-[#050505]">
            <img
              src={image}
              alt={`${title} mobile preview`}
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  isActive,
}: {
  project: Project;
  isActive: boolean;
}) {
  return (
    <div
      className={`w-full md:h-full min-h-0 md:min-h-[480px] rounded-3xl overflow-hidden flex flex-col transition-all duration-700 border bg-gradient-to-b from-[#0d0618] via-[#080812] to-[#050505] ${
        isActive
          ? 'border-purple-500/50 shadow-[0_0_60px_rgba(139,92,246,0.25)] opacity-100'
          : 'border-white/5 opacity-50 brightness-50'
      }`}
      aria-hidden={!isActive}>
      {/* Top: branding + device mockups */}
      <div className="relative flex-1 min-h-[200px] md:min-h-[240px] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-purple-600/25 rounded-full blur-[80px] pointer-events-none" />
        <ProjectBranding project={project} />
        <DeviceMockups image={project.image} title={project.title} />
      </div>

      {/* Bottom: meta + description + actions */}
      <div className="p-5 md:p-8 flex flex-col gap-3 md:gap-4 border-t border-white/5 bg-[#0b0614]/90 backdrop-blur-sm">
        <span className="inline-block w-fit max-w-full px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 break-words">
          {project.category}
        </span>

        <h3 className="text-2xl md:text-4xl font-heading font-bold text-white tracking-tight">
          {project.title}
        </h3>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        {(project.link || project.github) && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-glow hover:-translate-y-0.5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
                View Project <ExternalLink size={16} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-full text-sm font-medium text-gray-300 glass-card border border-white/10 hover:border-purple-500/50 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                aria-label={`View ${project.title} on GitHub`}>
                <Github size={18} />
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CarouselControls({
  activeIndex,
  onPrev,
  onNext,
  onGoTo,
  count,
}: {
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
  count: number;
}) {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 mt-8 md:mt-10 relative z-10">
      <button
        type="button"
        onClick={onPrev}
        className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-white/10 text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        aria-label="Previous project">
        <ChevronLeft size={20} />
      </button>
      <div className="flex items-center gap-3">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onGoTo(index)}
            aria-label={`Go to project ${index + 1}`}
            className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
              index === activeIndex
                ? 'w-8 h-2 bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]'
                : 'w-2 h-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        className="w-10 h-10 rounded-full flex items-center justify-center glass-card hover:bg-white/10 text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        aria-label="Next project">
        <ChevronRight size={20} />
      </button>
    </div>
  );
}

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const next = () => setCurrentIndex((prev) => prev + 1);
  const prev = () => setCurrentIndex((prev) => prev - 1);

  const goToProject = (index: number) => {
    setCurrentIndex((prev) => {
      const base = ((prev % projects.length) + projects.length) % projects.length;
      let diff = index - base;
      if (diff > projects.length / 2) diff -= projects.length;
      if (diff < -projects.length / 2) diff += projects.length;
      return prev + diff;
    });
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => setCurrentIndex((prev) => prev + 1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex]);

  const activeIndex =
    ((currentIndex % projects.length) + projects.length) % projects.length;

  return (
    <section id="projects" className="pt-10 pb-16 sm:pb-20 relative bg-[#080812] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[50%] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20 text-center relative z-20">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div
          className="relative w-full mt-6 md:mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          <div className="absolute w-2/3 h-2/3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

          {isDesktop ? (
            <div className="relative w-full h-[500px] flex items-center justify-center [perspective:1800px]">
              <motion.div
                className="relative w-[82vw] max-w-[640px] h-full [transform-style:preserve-3d]"
                animate={{ rotateY: -currentIndex * ANGLE_STEP }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}>
                {projects.map((project, index) => {
                  let dist = index - activeIndex;
                  if (dist > projects.length / 2) dist -= projects.length;
                  if (dist < -projects.length / 2) dist += projects.length;
                  const isActive = dist === 0;

                  return (
                    <div
                      key={project.title}
                      className="absolute inset-0 [backface-visibility:hidden]"
                      style={{
                        transform: `rotateY(${index * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                      }}>
                      <ProjectCard project={project} isActive={isActive} />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ) : (
            <div className="relative w-full max-w-[640px] mx-auto">
              <ProjectCard project={projects[activeIndex]} isActive={true} />
            </div>
          )}
        </div>

        <CarouselControls
          activeIndex={activeIndex}
          onPrev={prev}
          onNext={next}
          onGoTo={goToProject}
          count={projects.length}
        />
      </div>
    </section>
  );
}
