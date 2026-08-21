import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  Sparkles,
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
    id: 'w1-june-15-assessment',
    image: '/images/experience/aquila-softwares/week-1/june-15-01.jpg',
    title: 'Company Orientation & Technical Assessment',
    date: 'June 15, 2026',
    week: 1,
    category: 'Orientation',
    overview:
      "This was my first day at Aquila Softwares. I learned the company background, services, work environment, software projects, expectations, and development process. I also completed written and hands-on programming examinations for technical assessment.",
    tasks: [
      'Introduced ourselves to the company',
      'Learned the company background and workflow',
      'Took a written examination',
      'Completed a hands-on programming examination',
      'Underwent technical assessment',
    ],
    skills: ['Communication', 'Technical Assessment'],
  },
  {
    id: 'w1-june-17-libraryms',
    image: '/images/experience/aquila-softwares/week-1/june-17.jpg',
    title: 'LibraryMS Backend Bug Fixing',
    date: 'June 17, 2026',
    week: 1,
    category: 'Backend Development',
    overview:
      'I identified and fixed assigned bugs in the LibraryMS backend training project by reviewing existing code, testing features, and resolving issues.',
    tasks: [
      'Reviewed existing backend code',
      'Identified and fixed assigned issues',
      'Tested core system features',
      'Completed the LibraryMS backend training task',
    ],
    skills: ['Debugging', 'Backend Development', 'Testing'],
  },
  {
    id: 'w1-june-18-inventory',
    image: '/images/experience/aquila-softwares/week-1/june-18.jpg',
    title: 'Inventory System Backend Development',
    date: 'June 18, 2026',
    week: 1,
    category: 'Backend Development',
    overview:
      'I started my backend role on the Inventory System, implementing functionality, handling database communication, and exposing APIs needed by frontend teammates.',
    tasks: [
      'Implemented backend functionality',
      'Worked with database communication',
      'Provided API endpoints for frontend',
      'Collaborated with teammates on integration',
    ],
    skills: ['Backend Development', 'API Development', 'Team Collaboration'],
  },
  {
    id: 'w1-june-19-wfh',
    image: '/images/experience/aquila-softwares/week-1/june-19.jpg',
    title: 'Inventory Completion & Presentation Preparation',
    date: 'June 19, 2026',
    week: 1,
    category: 'Training',
    badge: 'WFH',
    overview:
      'Because the office was crowded, we worked remotely while finalizing Inventory System features, fixing issues, and preparing our demonstration.',
    tasks: [
      'Continued development remotely',
      'Completed remaining features',
      'Fixed system issues',
      'Prepared project demonstration and roles',
    ],
    skills: ['Remote Work', 'Testing', 'Presentation'],
  },
  {
    id: 'w2-june-23-peplo',
    image: '/images/experience/aquila-softwares/week-2/june-23.jpg',
    title: 'First Company Project – Peplo HRIS',
    date: 'June 23, 2026',
    week: 2,
    category: 'Backend Development',
    overview:
      'After training, I was assigned to Peplo HRIS as a backend developer. I familiarized myself with the project structure and codebase before implementation.',
    tasks: [
      'Reviewed existing project architecture',
      'Understood backend code flow',
      'Prepared development environment for tasks',
    ],
    skills: ['Backend Development', 'Codebase Familiarization'],
  },
  {
    id: 'w2-june-24-attendance-policy',
    image: '/images/experience/aquila-softwares/week-2/june-24.jpg',
    title: 'Regular & Flexible Attendance Policy Development',
    date: 'June 24, 2026',
    week: 2,
    category: 'Backend Development',
    overview:
      'I implemented Shift Management logic for Regular and Flexible attendance policies, tested my work, and submitted it through a Pull Request.',
    tasks: [
      'Developed attendance policy logic',
      'Supported Regular and Flexible schedules',
      'Tested completed functionality',
      'Committed and pushed code',
      'Created Pull Request for review',
    ],
    skills: ['Backend Development', 'Git', 'Testing', 'Pull Request'],
  },
  {
    id: 'w2-june-26-integration',
    image: '/images/experience/aquila-softwares/week-2/june-26.jpg',
    title: 'Frontend & Backend Integration Testing',
    date: 'June 26, 2026',
    week: 2,
    category: 'Integration',
    overview:
      'After merge approval, I helped with backend/frontend integration testing and guided a teammate on commit, push, and Pull Request workflows.',
    tasks: [
      'Validated backend/frontend integration',
      'Reviewed integration behavior',
      'Mentored teammate on Git workflow',
    ],
    skills: ['Integration', 'Git', 'Team Support'],
  },
  {
    id: 'w3-july-02-netpay',
    image: '/images/experience/aquila-softwares/week-3/july-02.jpg',
    title: 'Payroll Net Pay Calculation Fix',
    date: 'July 2, 2026',
    week: 3,
    category: 'Backend Development',
    overview:
      'I fixed a payroll backend issue where Absence, Tardiness, and Undertime were deducted twice, causing incorrect Net Pay. I corrected logic, tested, and submitted via Pull Request.',
    tasks: [
      'Analyzed payroll calculation logic',
      'Identified duplicate deductions',
      'Corrected Net Pay computation',
      'Tested the solution',
      'Committed and pushed changes',
      'Created Pull Request',
      'Completed review and merge',
    ],
    skills: ['Backend Development', 'Debugging', 'Testing', 'Git'],
  },
  {
    id: 'w3-july-03-payslip-api',
    image: '/images/experience/aquila-softwares/week-3/july-03.jpg',
    title: 'Payslip API & Display Fix',
    date: 'July 3, 2026',
    week: 3,
    category: 'API Development',
    overview:
      'I fixed a payslip display issue by updating API responses to include required payroll and employee data, then validated results and submitted the fix.',
    tasks: [
      'Reviewed missing payload fields',
      'Updated API response structure',
      'Tested returned data and display behavior',
      'Submitted and merged Pull Request',
    ],
    skills: ['API', 'Backend Development', 'Debugging', 'Testing'],
  },
  {
    id: 'w4-july-07-tax-settings',
    image: '/images/experience/aquila-softwares/week-4/july-07.jpg',
    title: 'Scalable Payroll Tax Settings',
    date: 'July 7, 2026',
    week: 4,
    category: 'Payroll Development',
    overview:
      'I enhanced Payroll Tax Settings to support scalable tax fields and added a default GSIS field while keeping the module extensible.',
    tasks: [
      'Made payroll tax fields scalable',
      'Added default GSIS field',
      'Kept feature flexible for future tax entries',
    ],
    skills: ['Payroll Development', 'Backend Logic'],
  },
  {
    id: 'w4-july-08-acs-testing',
    image: '/images/experience/aquila-softwares/week-4/july-08.jpg',
    title: 'ACS Dental System Field Testing',
    date: 'July 8, 2026',
    week: 4,
    category: 'System Testing',
    overview:
      'I joined field testing at Mintal Hospital and helped identify a print-related performance issue. After returning, I continued Payroll Tax Settings enhancements.',
    tasks: [
      'Participated in field testing',
      'Identified print-button slowdown issue',
      'Documented observed behavior',
      'Continued payroll enhancement implementation',
    ],
    skills: ['QA', 'Testing', 'Debugging'],
  },
  {
    id: 'w4-july-09-dues-override',
    image: '/images/experience/aquila-softwares/week-4/july-09.jpg',
    title: 'Government Dues Override Development',
    date: 'July 9, 2026',
    week: 4,
    category: 'Payroll Development',
    overview:
      'I developed Government Dues Override functionality in Payroll Deductions so administrators can adjust dues when needed.',
    tasks: [
      'Implemented override feature logic',
      'Connected override behavior to deductions',
      'Prepared feature for payroll processing',
    ],
    skills: ['Payroll Development', 'Backend Development'],
  },
  {
    id: 'w5-july-17-uiux',
    image: '/images/experience/aquila-softwares/week-5/july-17.jpg',
    title: 'Peplo UI/UX Enhancement',
    date: 'July 17, 2026',
    week: 5,
    category: 'UI/UX',
    overview:
      'I collaborated with the team to improve Peplo design consistency, responsive behavior, layout organization, navigation, and overall user experience.',
    tasks: [
      'Improved layout consistency',
      'Enhanced responsive behavior',
      'Refined interface organization and navigation',
      'Contributed to overall UX improvements',
    ],
    skills: ['UI/UX', 'Responsive Design', 'Frontend Development'],
  },
  {
    id: 'w6-july-23-attendance',
    image: '/images/experience/aquila-softwares/week-6/july-23.jpg',
    title: 'Attendance Management Development',
    date: 'July 23, 2026',
    week: 6,
    category: 'System Development',
    overview:
      'I worked on Attendance Management subtasks, reviewed requirements, and completed three subtasks on day one before finishing remaining tasks the next day.',
    tasks: [
      'Reviewed five assigned subtasks',
      'Implemented three subtasks initially',
      'Prepared final tasks for completion and testing',
    ],
    skills: ['System Development', 'Requirement Analysis'],
  },
  {
    id: 'w7-july-28-api-validation',
    image: '/images/experience/aquila-softwares/week-7/july-28.jpg',
    title: 'API Testing & System Validation',
    date: 'July 28, 2026',
    week: 7,
    category: 'API Testing',
    overview:
      'I tested API responses and validated system behavior after team review to confirm stable API functionality and expected outputs.',
    tasks: [
      'Reviewed API functions and responses',
      'Validated expected behavior',
      'Checked for unexpected errors',
      'Confirmed API stability',
    ],
    skills: ['API Testing', 'QA', 'System Validation'],
  },
  {
    id: 'w7-july-31-qa-automation',
    image: '/images/experience/aquila-softwares/week-7/july-31.jpg',
    title: 'Quality Assurance Automation Training',
    date: 'July 31, 2026',
    week: 7,
    category: 'Quality Assurance',
    overview:
      'I attended QA automation training and learned how automated testing improves efficiency, consistency, and software quality after updates.',
    tasks: [
      'Attended QA automation workshop',
      'Learned repeated-test optimization through automation',
      'Strengthened QA process understanding',
    ],
    skills: ['QA', 'Automation Testing', 'Software Testing'],
  },
  {
    id: 'w8-aug5-bulk-entry',
    image: '/images/experience/aquila-softwares/week-8/august-05.jpg',
    title: 'Bulk Entry Bug Investigation',
    date: 'August 5, 2026',
    week: 8,
    category: 'Bug Fixing',
    overview:
      'I handled a QA ticket where employee lists disappeared after page refresh in Bulk Entry. I reproduced, diagnosed, fixed, retested, and submitted changes.',
    tasks: [
      'Investigated QA ticket',
      'Reproduced the issue',
      'Reviewed employee-list behavior',
      'Applied the fix',
      'Retested feature',
      'Pushed changes and created Pull Request',
    ],
    skills: ['Debugging', 'QA', 'Testing', 'Git'],
  },
  {
    id: 'w8-aug6-qa-staging',
    image: '/images/experience/aquila-softwares/week-8/august-06.jpg',
    title: 'QA Verification & Staging',
    date: 'August 6, 2026',
    week: 8,
    category: 'QA & Deployment Workflow',
    overview:
      'I rebased my branch, resolved another QA-reported Bulk Entry issue, retested the fix, and coordinated final QA confirmation before staging deployment.',
    tasks: [
      'Rebased with latest system changes',
      'Reproduced and fixed QA-reported issue',
      'Retested and returned to QA',
      'Assisted in moving fix to staging',
    ],
    skills: ['Git', 'Rebase', 'QA', 'Debugging', 'Staging'],
  },
  {
    id: 'w8-aug7-reflection',
    image: '/images/experience/aquila-softwares/week-8/august-07.jpg',
    title: 'OJT Completion & Final Reflection',
    date: 'August 7, 2026',
    week: 8,
    category: 'OJT Completion',
    overview:
      'I completed my final OJT day at Aquila Softwares and wrapped up with gratitude, reflection, and documented learning across development, QA, workflow, and teamwork.',
    tasks: [
      'Prepared final internship wrap-up',
      'Reviewed growth in software development and QA',
      'Reflected on teamwork, deadlines, and communication',
      'Completed internship deliverables',
    ],
    skills: ['Software Development', 'Teamwork', 'Professional Growth', 'Problem Solving'],
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
    <div className="relative">
      {!loaded && !broken && <div className="absolute inset-0 animate-pulse bg-white/[0.04]" />}
      {!broken ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoad}
          onError={() => setBroken(true)}
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="aspect-[4/3] w-full bg-[#0e0a18] flex items-center justify-center text-xs text-gray-500 border-t border-white/10">
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
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [galleryOpen]);

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
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-purple-400/25 bg-purple-500/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300">
            <Sparkles size={11} />
            OJT Journey
          </div>
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
                Explore OJT Journey
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
              className="mx-auto w-[min(100%,1320px)] h-[min(92dvh,900px)] max-h-[calc(100dvh-1rem)] rounded-2xl sm:rounded-3xl border border-purple-500/25 bg-[#0b0815] shadow-[0_24px_90px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col relative">
              <div className="relative px-3 sm:px-6 py-3.5 sm:py-5 border-b border-white/10 bg-[#120f1f]/95 backdrop-blur-xl">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
                <div className="absolute -top-10 right-10 h-28 w-28 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className="min-w-0 pr-2">
                    <p className="text-[10px] sm:text-xs tracking-[0.22em] uppercase text-purple-300 mb-1">
                      OJT Journey
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

              <div className="px-4 sm:px-6 pt-4 overflow-x-auto">
                <div className="inline-flex gap-2 min-w-max pb-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWeek(0)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      selectedWeek === 0
                        ? 'border-purple-400/60 bg-purple-500/20 text-purple-100 shadow-[0_0_14px_rgba(139,92,246,0.35)]'
                        : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
                    }`}>
                    All
                  </button>
                  {weekLabels.map((label, idx) => {
                    const week = idx + 1;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedWeek(week)}
                        className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                          selectedWeek === week
                            ? 'border-purple-400/60 bg-purple-500/20 text-purple-100 shadow-[0_0_14px_rgba(139,92,246,0.35)]'
                            : 'border-white/10 bg-white/[0.02] text-gray-400 hover:text-white'
                        }`}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div ref={galleryScrollRef} className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                <motion.div
                  initial={reducedMotion ? false : 'hidden'}
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.05 } },
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
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
                          View Story
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
                        <p className="text-xs sm:text-sm text-gray-300">Experience Story Viewer</p>
                        <button
                          type="button"
                          onClick={closeStory}
                          className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-purple-500/50 transition-colors flex items-center justify-center">
                          <X size={17} />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-3 sm:p-5">
                        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-4 sm:gap-6">
                          <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/20 bg-[#06050b] relative">
                            <img
                              src={activeStory.image}
                              alt={activeStory.title}
                              onError={(e) => {
                                const target = e.currentTarget;
                                target.style.display = 'none';
                                const sibling = target.nextElementSibling as HTMLElement | null;
                                if (sibling) sibling.style.display = 'flex';
                              }}
                              className="w-full h-auto max-h-[42dvh] lg:max-h-[74dvh] object-contain"
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
                            <span className="hidden sm:inline">Previous Story</span>
                            <span className="sm:hidden">Previous</span>
                          </button>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {activeIndex + 1} / {filteredStories.length}
                          </p>
                          <button
                            type="button"
                            onClick={() => goTo(1)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors">
                            <span className="hidden sm:inline">Next Story</span>
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
