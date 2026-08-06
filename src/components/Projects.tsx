import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  image: string;
  logo?: string;
  link?: string;
  github?: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 'citezen',
    title: 'CITEzen',
    subtitle: 'Student Concern System',
    description:
      'A Student Concern Management System designed to simplify the submission, tracking, and management of student concerns through a centralized digital platform.',
    category: 'WEB APP / STUDENT SYSTEM',
    image: '/citezen-screenshot.png',
    logo: '/citezen-logo.png',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL'],
    github: 'https://github.com/R4zor08/CITEzen',
    link: 'https://citezen-demo.vercel.app',
  },
  {
    id: 'nemsutalks',
    title: 'NEMSUTalks',
    subtitle: 'AI Sentiment Analysis',
    description:
      'A Student Sentiment Analysis System that leverages AI to collect, analyze, and manage student feedback for better communication and decision-making.',
    category: 'AI / SENTIMENT ANALYSIS',
    image: '/2.png',
    technologies: ['Python', 'Django', 'React.js', 'Tailwind CSS', 'NLP / AI'],
    github: 'https://github.com/R4zor08/NEMSUTalks',
    link: 'https://nemsutalks.vercel.app',
  },
  {
    id: 'fireguard3',
    title: 'FIREGUARD3',
    subtitle: 'IoT Fire Safety',
    description:
      'An IoT-based Fire Alarm Monitoring System that provides real-time alerts and monitoring to improve safety and emergency response.',
    category: 'IOT / FIRE SAFETY',
    image: '/fireguard3-screenshot.png',
    logo: '/fireguard3-logo.png',
    technologies: ['Flutter', 'Dart', 'IoT Sensors', 'Node.js', 'MongoDB'],
    github: 'https://github.com/R4zor08/FIREGUARD3',
    link: 'https://fireguard3.vercel.app',
  },
  {
    id: 'wheelgo',
    title: 'WheelGo',
    subtitle: 'Car Rental Platform',
    description:
      'A Car Rental Management System that streamlines vehicle reservations and fleet management through a modern web application.',
    category: 'WEB APP / CAR RENTAL',
    image: '/wheelgo-screenshot.png',
    logo: '/wheelgo-logo.png',
    technologies: ['React.js', 'Tailwind CSS', 'Node.js', 'SQLite', 'REST API'],
    github: 'https://github.com/R4zor08/WheelGo',
    link: 'https://wheelgo.vercel.app',
  },
  {
    id: 'washgo',
    title: 'WashGO',
    subtitle: 'Car Wash Booking App',
    description:
      'A Car Wash Booking Mobile App designed to simplify car wash appointments, service booking, customer management, and booking status tracking through a convenient mobile platform.',
    category: 'MOBILE APP / BOOKING',
    image: '/2.png',
    technologies: ['Flutter', 'Dart', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/R4zor08/WashGO',
    link: 'https://washgo.vercel.app',
  },
];

const AUTOPLAY_INTERVAL_MS = 4500;

function getInitials(title: string) {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ProjectCard({
  project,
  isActive,
  onSelect,
}: {
  project: Project;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      tabIndex={isActive ? 0 : -1}
      role="group"
      aria-roledescription="slide"
      aria-label={project.title}
      className={`relative w-full h-full rounded-[2.25rem] overflow-hidden flex flex-col justify-end transition-all duration-500 border select-none cursor-pointer group ${
        isActive
          ? 'border-purple-500/60 shadow-[0_0_60px_rgba(139,92,246,0.35),0_20px_50px_rgba(0,0,0,0.9)] ring-1 ring-purple-500/40'
          : 'border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-purple-500/40'
      }`}>
      {/* Full-bleed Cover Image Background (Voyager2 Style) */}
      <div className="absolute inset-0 z-0 bg-[#0a0518] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isActive ? 'scale-105 group-hover:scale-110' : 'scale-100 opacity-75'
          }`}
          loading="lazy"
        />
        {/* Subtle dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />
      </div>

      {/* Top Header inside Card */}
      <div className="relative z-20 p-5 sm:p-6 flex items-center justify-between gap-2 mb-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {project.logo ? (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/20 bg-black/60 shadow-md backdrop-blur-md shrink-0 flex items-center justify-center">
              <img
                src={project.logo}
                alt=""
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-purple-500/40 flex items-center justify-center text-purple-300 font-heading font-bold text-xs sm:text-sm shadow-md backdrop-blur-md shrink-0">
              {getInitials(project.title)}
            </div>
          )}
          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2.5 sm:px-3 py-1 rounded-full backdrop-blur-md truncate">
            {project.category}
          </span>
        </div>

        <span className="shrink-0 text-[10px] sm:text-xs font-mono font-bold text-gray-300 bg-black/50 border border-white/10 px-2.5 py-1 rounded-full backdrop-blur-md max-w-[40%] truncate">
          {project.subtitle}
        </span>
      </div>

      {/* Overlaid Bottom Content */}
      <div className="relative z-20 p-5 sm:p-7 flex flex-col gap-3 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pt-10">
        <h3
          className="font-heading font-bold text-white tracking-tight leading-snug drop-shadow-md"
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2.1rem)' }}>
          {project.title}
        </h3>

        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3 font-normal opacity-90 drop-shadow">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="text-[10px] sm:text-xs px-2.5 py-1 rounded-lg bg-black/50 border border-white/15 text-purple-200 font-medium tracking-wide backdrop-blur-md">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-glow hover:-translate-y-0.5 transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500">
              Live Demo <ExternalLink size={14} />
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-gray-200 bg-black/50 backdrop-blur-md border border-white/20 hover:border-purple-500/60 hover:text-white hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label={`View ${project.title} source code on GitHub`}>
              <Github size={15} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const isSwipingHorizontal = useRef<boolean | null>(null);
  const isMouseDown = useRef<boolean>(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const projectCount = projects.length;

  const next = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const goToProject = useCallback(
    (index: number) => {
      setCurrentIndex((prev) => {
        const active = ((prev % projectCount) + projectCount) % projectCount;
        let diff = index - active;
        if (diff > projectCount / 2) diff -= projectCount;
        if (diff < -projectCount / 2) diff += projectCount;
        return prev + diff;
      });
    },
    [projectCount]
  );

  // Restart autoplay timer from current project
  const restartAutoplayTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (isPaused || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      next();
    }, AUTOPLAY_INTERVAL_MS);
  }, [isPaused, prefersReducedMotion, next]);

  // Handle autoplay interval & tab visibility
  useEffect(() => {
    restartAutoplayTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [restartAutoplayTimer, currentIndex]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!carouselRef.current) return;
      const rect = carouselRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
        restartAutoplayTimer();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
        restartAutoplayTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev, restartAutoplayTimer]);

  // Touch Swipe Gesture Handler (Preventing vertical scroll interferences)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    isSwipingHorizontal.current = null;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragStartPos.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartPos.current.x;
    const deltaY = touch.clientY - dragStartPos.current.y;

    if (isSwipingHorizontal.current === null) {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
        isSwipingHorizontal.current = true;
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 8) {
        isSwipingHorizontal.current = false;
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragStartPos.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - dragStartPos.current.x;

    if (isSwipingHorizontal.current === true && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }
    dragStartPos.current = null;
    isSwipingHorizontal.current = null;
    setIsPaused(false);
    restartAutoplayTimer();
  };

  // Mouse Drag Handler
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    isMouseDown.current = true;
    setIsPaused(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !dragStartPos.current) return;
    const deltaX = e.clientX - dragStartPos.current.x;
    if (Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }
    isMouseDown.current = false;
    dragStartPos.current = null;
    setIsPaused(false);
    restartAutoplayTimer();
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    dragStartPos.current = null;
    setIsPaused(false);
    restartAutoplayTimer();
  };

  // Mouse Wheel / Trackpad Gesture Handler
  const handleWheel = (e: React.WheelEvent) => {
    const deltaX = e.deltaX;
    const deltaY = e.deltaY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 18) {
      setIsPaused(true);
      if (deltaX > 0) {
        next();
      } else {
        prev();
      }
      setTimeout(() => {
        setIsPaused(false);
        restartAutoplayTimer();
      }, 500);
    }
  };

  const activeIndex = ((currentIndex % projectCount) + projectCount) % projectCount;

  // 3D Cover Flow (mobile + desktop share the same transforms)
  const getCardStyle = (index: number) => {
    let dist = index - activeIndex;
    if (dist > projectCount / 2) dist -= projectCount;
    if (dist < -projectCount / 2) dist += projectCount;

    if (dist === 0) {
      return {
        transform: 'translateX(0%) scale(1) rotateY(0deg)',
        opacity: 1,
        zIndex: 30,
        filter: 'brightness(1) blur(0px)',
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
      };
    } else if (dist === -1) {
      return {
        transform: 'translateX(-75%) scale(0.82) rotateY(35deg)',
        opacity: 0.58,
        zIndex: 20,
        filter: 'brightness(0.7) blur(0px)',
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
      };
    } else if (dist === 1) {
      return {
        transform: 'translateX(75%) scale(0.82) rotateY(-35deg)',
        opacity: 0.58,
        zIndex: 20,
        filter: 'brightness(0.7) blur(0px)',
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
      };
    } else if (dist === -2) {
      return {
        transform: 'translateX(-135%) scale(0.66) rotateY(50deg)',
        opacity: 0.22,
        zIndex: 10,
        filter: 'brightness(0.4) blur(1px)',
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
      };
    } else if (dist === 2) {
      return {
        transform: 'translateX(135%) scale(0.66) rotateY(-50deg)',
        opacity: 0.22,
        zIndex: 10,
        filter: 'brightness(0.4) blur(1px)',
        pointerEvents: 'auto' as React.CSSProperties['pointerEvents'],
      };
    } else {
      return {
        transform: `translateX(${dist > 0 ? 170 : -170}%) scale(0.5) rotateY(${dist > 0 ? -60 : 60}deg)`,
        opacity: 0,
        zIndex: 0,
        filter: 'brightness(0.2) blur(5px)',
        pointerEvents: 'none' as React.CSSProperties['pointerEvents'],
      };
    }
  };

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 relative bg-[#080812] overflow-hidden select-none"
      ref={carouselRef}>
      {/* Background Lighting & Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[65vh] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header Title Only (No visible controls, progress bars, or counters) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 text-center relative z-20 flex flex-col items-center">
          <h2
            className="font-heading font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* 3D Cover Flow Carousel Container */}
        <div
          className="relative w-full mt-4 sm:mt-6 pb-4 overflow-hidden touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}>
          {/* Main 3D Perspective Wrapper */}
          <div className="relative w-full h-[520px] sm:h-[560px] md:h-[580px] flex items-center justify-center [perspective:1400px]">
            {projects.map((project, index) => {
              const cardStyle = getCardStyle(index);
              let dist = index - activeIndex;
              if (dist > projectCount / 2) dist -= projectCount;
              if (dist < -projectCount / 2) dist += projectCount;
              const isActive = dist === 0;

              return (
                <div
                  key={project.id}
                  className="absolute w-[min(88vw,340px)] sm:w-full sm:max-w-[400px] md:max-w-[420px] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] [transform-style:preserve-3d] will-change-transform"
                  style={{
                    transform: cardStyle.transform,
                    opacity: cardStyle.opacity,
                    zIndex: cardStyle.zIndex,
                    filter: cardStyle.filter,
                    pointerEvents: cardStyle.pointerEvents,
                  }}>
                  <ProjectCard
                    project={project}
                    isActive={isActive}
                    onSelect={() => {
                      goToProject(index);
                      restartAutoplayTimer();
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
