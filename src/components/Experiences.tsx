import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  ArrowUpRight,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

type StoryItem = {
  id: string;
  image: string;
  title: string;
  date: string;
  week: number;
  category: string;
  overview: string;
  tasks: string[];
  skills: string[];
  badge?: string;
};

const weekLabels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

const internshipStories: StoryItem[] = [
  {
    id: 'week-1',
    image: '/images/experience/aquila-softwares/week-1.jpg',
    title: 'Orientation, Assessment & Training Builds',
    date: 'June 15 – 19, 2026',
    week: 1,
    category: 'Training',
    overview:
      'Week 1 was my first week at Aquila Softwares. I completed company orientation and technical assessment, then started backend training on LibraryMS bug fixing and Inventory System APIs. We also worked remotely to finish remaining Inventory features and prepare the project demonstration.',
    tasks: [
      'Completed company orientation and technical assessment',
      'Fixed assigned bugs in the LibraryMS backend',
      'Built Inventory System backend APIs for frontend teammates',
      'Finished remaining features remotely and prepared the demo',
    ],
    skills: ['Communication', 'Backend Development', 'Debugging', 'API Development'],
  },
  {
    id: 'week-2',
    image: '/images/experience/aquila-softwares/week-2.jpg',
    title: 'First Company Project – Peplo HRIS',
    date: 'June 23 – 26, 2026',
    week: 2,
    category: 'Backend Development',
    overview:
      'Week 2 was my first week on a real company project. I was assigned to Peplo HRIS as a backend developer, implemented Regular and Flexible attendance policy logic, submitted a Pull Request, then helped with frontend/backend integration testing and Git workflow support for a teammate.',
    tasks: [
      'Studied the Peplo HRIS architecture and codebase',
      'Implemented Regular and Flexible attendance policy logic',
      'Tested, committed, and opened a Pull Request',
      'Validated integration and guided a teammate on Git workflow',
    ],
    skills: ['Backend Development', 'Git', 'Testing', 'Integration'],
  },
  {
    id: 'week-3',
    image: '/images/experience/aquila-softwares/week-3.jpg',
    title: 'Payroll Net Pay & Payslip API Fixes',
    date: 'July 2 – 3, 2026',
    week: 3,
    category: 'Payroll Development',
    overview:
      'Week 3 focused on payroll accuracy. I fixed a Net Pay bug where Absence, Tardiness, and Undertime were deducted twice, then updated the Payslip API so payroll and employee data displayed correctly. Both fixes were tested and merged through Pull Requests.',
    tasks: [
      'Found and removed duplicate payroll deductions',
      'Corrected Net Pay calculation logic',
      'Updated Payslip API payloads for missing fields',
      'Tested, submitted, and merged both Pull Requests',
    ],
    skills: ['Backend Development', 'API', 'Debugging', 'Testing'],
  },
  {
    id: 'week-4',
    image: '/images/experience/aquila-softwares/week-4.jpg',
    title: 'Payroll Tax Settings & Field Testing',
    date: 'July 7 – 9, 2026',
    week: 4,
    category: 'Payroll & QA',
    overview:
      'Week 4 mixed payroll feature work with on-site QA. I made Payroll Tax Settings scalable with a default GSIS field, joined ACS Dental System field testing at Mintal Hospital where we found a print-performance issue, and built Government Dues Override in Payroll Deductions.',
    tasks: [
      'Made payroll tax fields scalable and added a default GSIS field',
      'Joined ACS Dental field testing at Mintal Hospital',
      'Documented a print-button slowdown issue',
      'Implemented Government Dues Override for payroll deductions',
    ],
    skills: ['Payroll Development', 'QA', 'Backend Development'],
  },
  {
    id: 'week-5',
    image: '/images/experience/aquila-softwares/week-5.jpg',
    title: 'Peplo UI/UX Enhancement',
    date: 'July 17, 2026',
    week: 5,
    category: 'UI/UX',
    overview:
      'Week 5 shifted to product design. I worked with the team to improve Peplo’s visual consistency, responsive layout, navigation, and overall user experience so the interface felt clearer and easier to use.',
    tasks: [
      'Improved layout and design consistency',
      'Enhanced responsive behavior across screens',
      'Refined navigation and interface organization',
      'Contributed to overall UX polish',
    ],
    skills: ['UI/UX', 'Responsive Design', 'Frontend Development'],
  },
  {
    id: 'week-6',
    image: '/images/experience/aquila-softwares/week-6.jpg',
    title: 'Attendance Management Development',
    date: 'July 23, 2026',
    week: 6,
    category: 'System Development',
    overview:
      'Week 6 was focused on Attendance Management. I reviewed five assigned subtasks, completed three on the first day, and prepared the remaining work for implementation and testing so attendance features could move forward.',
    tasks: [
      'Reviewed five Attendance Management subtasks',
      'Implemented three subtasks on day one',
      'Prepared remaining tasks for completion and testing',
    ],
    skills: ['System Development', 'Requirement Analysis'],
  },
  {
    id: 'week-7',
    image: '/images/experience/aquila-softwares/week-7.jpg',
    title: 'API Validation & QA Automation Training',
    date: 'July 28 – 31, 2026',
    week: 7,
    category: 'QA',
    overview:
      'Week 7 mixed testing and learning. I validated API responses after team review to confirm stable outputs, then attended QA automation training on how automated tests improve consistency and quality after software updates.',
    tasks: [
      'Reviewed API functions and response behavior',
      'Checked for unexpected errors and confirmed API stability',
      'Attended QA automation training',
      'Learned how automation speeds repeated testing',
    ],
    skills: ['API Testing', 'QA', 'Automation Testing'],
  },
  {
    id: 'week-8',
    image: '/images/experience/aquila-softwares/week-8.jpg',
    title: 'Bulk Entry Fixes & OJT Wrap-Up',
    date: 'August 5 – 7, 2026',
    week: 8,
    category: 'QA & Completion',
    overview:
      'Week 8 closed the internship. I fixed a Bulk Entry bug where employee lists disappeared after refresh, rebased and resolved a follow-up QA issue before staging, then completed my last day with reflection on development, QA, Git workflow, and teamwork.',
    tasks: [
      'Reproduced and fixed the Bulk Entry refresh bug',
      'Retested, pushed changes, and opened a Pull Request',
      'Rebased, resolved a second QA issue, and helped move it to staging',
      'Wrapped up OJT with final reflection and deliverables',
    ],
    skills: ['Debugging', 'QA', 'Git', 'Professional Growth'],
  },
];

const featuredExperience = {
  role: 'Software Developer Intern',
  company: 'Aquila Softwares',
  period: 'June 15, 2026 – August 7, 2026',
  description:
    'Worked in a real software development environment where I handled backend development, frontend enhancements, system debugging, API testing, payroll and attendance-related features, quality assurance, UI/UX improvements, Git workflows, pull requests, version control, testing, and other development responsibilities.',
  badges: [
    'Backend Development',
    'API Testing',
    'Debugging',
    'Quality Assurance',
    'Git',
    'UI/UX',
    'Version Control',
  ],
};

function FocusableImage({
  src,
  alt,
  loaded,
  onLoad,
}: {
  src: string;
  alt: string;
  loaded: boolean;
  onLoad: () => void;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#0e0a18]">
      {!loaded && !broken && <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />}
      {!broken ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoad}
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
          Documentation Photo
        </div>
      )}
    </div>
  );
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  const nodes = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(nodes).filter((el) => !el.hasAttribute('disabled'));
}

export function Experiences() {
  const reducedMotion = useReducedMotion();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});
  const openTriggerRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const storyScrollRef = useRef<HTMLDivElement>(null);
  const galleryScrollPosRef = useRef(0);
  const swipeStartRef = useRef<number | null>(null);

  const filteredStories = useMemo(
    () =>
      selectedWeek === 0
        ? internshipStories
        : internshipStories.filter((item) => item.week === selectedWeek),
    [selectedWeek]
  );

  const activeIndex = activeStoryId
    ? filteredStories.findIndex((item) => item.id === activeStoryId)
    : -1;
  const activeStory = activeIndex >= 0 ? filteredStories[activeIndex] : null;

  const openGallery = () => {
    lastFocusRef.current = document.activeElement as HTMLElement;
    setSelectedWeek(0);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setActiveStoryId(null);
    setGalleryOpen(false);
    requestAnimationFrame(() => {
      (openTriggerRef.current || lastFocusRef.current)?.focus();
    });
  };

  const openStory = (id: string) => {
    if (galleryScrollRef.current) {
      galleryScrollPosRef.current = galleryScrollRef.current.scrollTop;
    }
    setActiveStoryId(id);
  };

  const closeStory = () => {
    setActiveStoryId(null);
    requestAnimationFrame(() => {
      if (galleryScrollRef.current) {
        galleryScrollRef.current.scrollTop = galleryScrollPosRef.current;
      }
    });
  };

  const goTo = (offset: number) => {
    if (!filteredStories.length || activeIndex < 0) return;
    const next = (activeIndex + offset + filteredStories.length) % filteredStories.length;
    setActiveStoryId(filteredStories[next].id);
  };

  useEffect(() => {
    if (!galleryOpen) return;

    const previousBody = document.body.style.overflow;
    const previousHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.dispatchEvent(new Event('portfolio:overlay-open'));

    return () => {
      document.body.style.overflow = previousBody;
      document.documentElement.style.overflow = previousHtml;
      window.dispatchEvent(new Event('portfolio:overlay-close'));
    };
  }, [galleryOpen]);

  useEffect(() => {
    if (!galleryOpen) return;

    const isolateScroll = (event: Event) => {
      event.stopPropagation();
    };

    const scrollTargets = [galleryScrollRef.current, storyScrollRef.current].filter(
      Boolean
    ) as HTMLElement[];

    scrollTargets.forEach((target) => {
      target.addEventListener('wheel', isolateScroll, { passive: true });
      target.addEventListener('touchmove', isolateScroll, { passive: true });
    });

    return () => {
      scrollTargets.forEach((target) => {
        target.removeEventListener('wheel', isolateScroll);
        target.removeEventListener('touchmove', isolateScroll);
      });
    };
  }, [galleryOpen, activeStory]);

  useEffect(() => {
    if (!activeStory) return;
    const idx = filteredStories.findIndex((i) => i.id === activeStory.id);
    const preload = [filteredStories[idx - 1], filteredStories[idx + 1]].filter(Boolean);
    preload.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, [activeStory, filteredStories]);

  useEffect(() => {
    if (!galleryOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const activeContainer = activeStory ? storyRef.current : galleryRef.current;
      const focusables = getFocusableElements(activeContainer);

      if (e.key === 'Escape') {
        e.preventDefault();
        if (activeStory) closeStory();
        else closeGallery();
      }
      if (activeStory && e.key === 'ArrowRight') goTo(1);
      if (activeStory && e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'Tab' && focusables.length > 1) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [galleryOpen, activeStory, activeIndex, filteredStories]);

  useEffect(() => {
    if (activeStoryId && !filteredStories.some((item) => item.id === activeStoryId)) {
      setActiveStoryId(null);
    }
  }, [selectedWeek]);

  return (
    <section id="experience" className="section-padding relative overflow-x-clip bg-[#080812]">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 -right-24 w-72 h-72 bg-purple-600/12 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/8 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.45) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={reducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="mb-10 sm:mb-14 text-center">
          <h2
            className="font-heading font-bold text-white tracking-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
            My <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mx-auto shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-purple-400/70 via-purple-500/25 to-transparent"
            aria-hidden="true"
          />

          <motion.div
            initial={reducedMotion ? false : { opacity: 0, x: -14 }}
            whileInView={reducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="relative pl-12 sm:pl-16 group">
            <div className="absolute left-0 sm:left-2 top-6 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-purple-500/45 bg-[#0e0a18] text-purple-300 shadow-[0_0_18px_rgba(139,92,246,0.28)] transition-all duration-300 group-hover:border-fuchsia-400/60 group-hover:text-fuchsia-200">
              <Briefcase size={15} />
            </div>
            <button
              ref={openTriggerRef}
              type="button"
              onClick={openGallery}
              className="w-full text-left glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-purple-500/25 bg-gradient-to-br from-white/[0.03] via-transparent to-purple-500/[0.03] relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-400/55 hover:shadow-[0_14px_34px_rgba(76,29,149,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/[0.08] to-transparent" />
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 mb-3">
                <div className="min-w-0">
                  <p className="inline-flex mb-2 text-[10px] px-2 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 tracking-wider uppercase">
                    Featured Experience
                  </p>
                  <h3 className="font-heading font-semibold text-base sm:text-lg text-white">
                    {featuredExperience.role}
                  </h3>
                  <p className="text-purple-300/95 text-sm font-medium">
                    {featuredExperience.company}
                  </p>
                </div>
                <span className="self-start text-[10px] sm:text-xs font-medium tracking-wide text-purple-300/85 bg-purple-500/10 border border-purple-500/25 rounded-full px-2.5 sm:px-3 py-1">
                  {featuredExperience.period}
                </span>
              </div>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed mb-4">
                {featuredExperience.description}
              </p>
              <div className="relative z-10 flex flex-wrap gap-1.5 mb-4">
                {featuredExperience.badges.map((badge) => (
                  <span
                    key={badge}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-300 border border-white/10">
                    {badge}
                  </span>
                ))}
              </div>
              <div className="relative z-10 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition-colors group-hover:text-fuchsia-200">
                View Experience
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.26 }}
            className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-md p-1.5 sm:p-4"
            data-lenis-prevent
            aria-modal="true"
            role="dialog"
            aria-label="OJT Experience Gallery"
            onClick={closeGallery}>
            <motion.div
              ref={galleryRef}
              initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? {} : { opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.32 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto w-[min(100%,1320px)] h-[min(92dvh,900px)] max-h-[calc(100dvh-1rem)] rounded-2xl sm:rounded-3xl border border-purple-500/25 bg-[#0b0815] shadow-[0_24px_90px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative"
              data-lenis-prevent>
              <div className="relative shrink-0 px-3 sm:px-6 py-3.5 sm:py-5 border-b border-white/10 bg-[#120f1f]/95 backdrop-blur-xl">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
                <div className="absolute -top-10 right-10 h-28 w-28 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] sm:text-xs tracking-[0.22em] uppercase text-purple-300 mb-1">
                      Internship Gallery
                    </p>
                    <h3 className="font-heading text-xl sm:text-3xl font-bold text-white leading-tight">
                      Building. Testing. Learning.
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">
                      Aquila Softwares • Software Developer Intern
                    </p>
                    <p className="text-[11px] sm:text-sm text-gray-400">June 15 – August 7, 2026</p>
                    <p className="mt-2 max-w-3xl text-xs sm:text-sm text-gray-400 leading-relaxed hidden sm:block">
                      A visual walkthrough of the projects, challenges, development tasks, and
                      lessons I experienced throughout my software development internship.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeGallery}
                    aria-label="Close gallery"
                    className="w-10 h-10 min-w-[40px] rounded-full border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors flex items-center justify-center shrink-0">
                    <X size={18} />
                  </button>
                </div>
              </div>


              <div
                ref={galleryScrollRef}
                data-lenis-prevent
                className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain px-4 sm:px-6 py-4 scrollbar-hide [-webkit-overflow-scrolling:touch]">
                <motion.div
                  initial={reducedMotion ? false : 'hidden'}
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filteredStories.map((item) => (
                    <motion.button
                      key={item.id}
                      type="button"
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      onClick={() => openStory(item.id)}
                      className="group rounded-2xl overflow-hidden border border-white/10 bg-[#120d1f] shadow-[0_10px_28px_rgba(0,0,0,0.35)] text-left hover:border-purple-400/45 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60">
                      <div className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent z-10" />
                        <FocusableImage
                          src={item.image}
                          alt={`${item.title} documentation photo`}
                          loaded={Boolean(loadedMap[item.id])}
                          onLoad={() => setLoadedMap((prev) => ({ ...prev, [item.id]: true }))}
                        />
                        <div className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[10px] text-purple-100">
                          <Eye size={12} />
                          View Week
                        </div>
                      </div>
                      <div className="p-3.5 sm:p-4">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300">
                          Week {item.week}
                        </p>
                        <h4 className="font-heading font-semibold text-white text-sm sm:text-base mt-1 group-hover:text-purple-100 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="inline-flex text-[10px] px-2 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="inline-flex text-[10px] px-2 py-1 rounded-full border border-emerald-500/35 bg-emerald-500/12 text-emerald-300">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              <AnimatePresence mode="wait">
                {activeStory && (
                  <motion.div
                    key={activeStory.id}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reducedMotion ? {} : { opacity: 0 }}
                    transition={{ duration: 0.24 }}
                    className="absolute inset-0 z-30 bg-black/75 p-2 sm:p-4"
                    onClick={closeStory}>
                    <motion.div
                      ref={storyRef}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reducedMotion ? {} : { opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.28 }}
                      className="h-full rounded-2xl border border-purple-500/25 bg-[#0c0916] overflow-hidden flex flex-col"
                      data-lenis-prevent
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => {
                        swipeStartRef.current = e.clientX;
                      }}
                      onPointerUp={(e) => {
                        if (swipeStartRef.current === null) return;
                        const dx = e.clientX - swipeStartRef.current;
                        swipeStartRef.current = null;
                        if (Math.abs(dx) < 40) return;
                        if (dx > 0) goTo(-1);
                        else goTo(1);
                      }}>
                      <div className="px-4 sm:px-5 py-3 border-b border-white/10 bg-[#131024]/95 flex items-center justify-between">
                        <p className="text-xs sm:text-sm text-gray-300">Week {activeStory.week} Story</p>
                        <button
                          type="button"
                          onClick={closeStory}
                          className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors flex items-center justify-center">
                          <X size={17} />
                        </button>
                      </div>

                      <div
                        ref={storyScrollRef}
                        data-lenis-prevent
                        className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain p-3 sm:p-5 scrollbar-hide [-webkit-overflow-scrolling:touch]">
                        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4 sm:gap-6">
                          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-purple-500/20 bg-[#06050b] aspect-square sm:rounded-2xl lg:mx-0 lg:max-w-none">
                            <img
                              src={activeStory.image}
                              alt={activeStory.title}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const sibling = target.nextElementSibling as HTMLElement | null;
                                if (sibling) sibling.style.display = 'flex';
                              }}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="hidden absolute inset-0 items-center justify-center text-xs text-gray-500">
                              Documentation Photo
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-purple-300">
                              Week {activeStory.week} • {activeStory.category}
                            </p>
                            <h4 className="font-heading text-xl sm:text-2xl font-bold text-white mt-1">
                              {activeStory.title}
                            </h4>
                            <p className="text-sm text-gray-400 mt-1">{activeStory.date}</p>
                            {activeStory.badge && (
                              <span className="mt-2 inline-flex text-[10px] px-2 py-1 rounded-full border border-emerald-500/35 bg-emerald-500/12 text-emerald-300">
                                {activeStory.badge}
                              </span>
                            )}

                            <div className="mt-5">
                              <h5 className="text-xs tracking-[0.22em] uppercase text-gray-500 mb-2">
                                Overview
                              </h5>
                              <p className="text-sm text-gray-300 leading-relaxed">
                                {activeStory.overview}
                              </p>
                            </div>

                            <div className="mt-5">
                              <h5 className="text-xs tracking-[0.22em] uppercase text-gray-500 mb-2">
                                What I Did
                              </h5>
                              <ul className="space-y-2">
                                {activeStory.tasks.map((task) => (
                                  <li key={task} className="text-sm text-gray-300 flex items-start gap-2">
                                    <Check size={14} className="mt-0.5 text-purple-300 shrink-0" />
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="mt-5">
                              <h5 className="text-xs tracking-[0.22em] uppercase text-gray-500 mb-2">
                                Skills
                              </h5>
                              <div className="flex flex-wrap gap-1.5">
                                {activeStory.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] text-gray-300">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 sm:px-6 py-3 border-t border-white/10 bg-[#131024]/95">
                        <div className="hidden sm:flex items-center justify-center gap-2 mb-2 text-[11px] text-gray-500">
                          {weekLabels.map((label, idx) => (
                            <div key={label} className="flex items-center gap-2">
                              <span
                                className={`${
                                  idx + 1 === activeStory.week
                                    ? 'text-purple-200'
                                    : 'text-gray-600'
                                }`}>
                                {label}
                              </span>
                              {idx < weekLabels.length - 1 && (
                                <span className="w-4 h-px bg-white/15" />
                              )}
                            </div>
                          ))}
                        </div>
                        <p className="sm:hidden text-xs text-gray-400 text-center mb-2">
                          Week {activeStory.week} of 8
                        </p>
                        <div className="flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => goTo(-1)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                            <ChevronLeft size={15} />
                            <span className="hidden sm:inline">Previous Week</span>
                            <span className="sm:hidden">Previous</span>
                          </button>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {activeIndex + 1} / {filteredStories.length}
                          </p>
                          <button
                            type="button"
                            onClick={() => goTo(1)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                            <span className="hidden sm:inline">Next Week</span>
                            <span className="sm:hidden">Next</span>
                            <ChevronRight size={15} />
                          </button>
                        </div>
                        <div className="mt-2 hidden sm:flex items-center justify-between text-[11px] text-gray-500">
                          <span className="truncate pr-3">
                            {filteredStories[(activeIndex - 1 + filteredStories.length) % filteredStories.length].title}
                          </span>
                          <span className="truncate text-right pl-3">
                            {filteredStories[(activeIndex + 1) % filteredStories.length].title}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
