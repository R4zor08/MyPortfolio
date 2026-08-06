import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GRID = 10;
const RESTORE_MS = 1800;

type PixelVanishAvatarProps = {
  baseSrc: string;
  coverSrc: string;
  alt: string;
  className?: string;
};

function seededOffset(i: number, salt: number) {
  const n = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

export function PixelVanishAvatar({
  baseSrc,
  coverSrc,
  alt,
  className = '',
}: PixelVanishAvatarProps) {
  const [vanishing, setVanishing] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const restoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    return () => {
      if (restoreTimer.current) clearTimeout(restoreTimer.current);
    };
  }, []);

  const clearRestore = () => {
    if (restoreTimer.current) {
      clearTimeout(restoreTimer.current);
      restoreTimer.current = null;
    }
  };

  const startVanish = useCallback(() => setVanishing(true), []);
  const restore = useCallback(() => setVanishing(false), []);

  const handleMouseEnter = () => {
    isHovering.current = true;
    clearRestore();
    startVanish();
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    clearRestore();
    restore();
  };

  const handleClick = () => {
    clearRestore();
    if (vanishing && !isHovering.current) {
      restore();
      return;
    }
    startVanish();
    restoreTimer.current = setTimeout(() => {
      if (!isHovering.current) restore();
    }, RESTORE_MS);
  };

  const tiles = useMemo(
    () =>
      Array.from({ length: GRID * GRID }, (_, i) => {
        const row = Math.floor(i / GRID);
        const col = i % GRID;
        const rx = seededOffset(i, 1);
        const ry = seededOffset(i, 2);
        const rr = seededOffset(i, 3);
        // Strong scatter so blocks fly clearly outside the circle
        const angle = (i / (GRID * GRID)) * Math.PI * 2 + rx * 1.2;
        // Smaller scatter on narrow screens so blocks don't blow the layout
        const isNarrow =
          typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
        const dist = isNarrow ? 28 + ry * 48 : 60 + ry * 120;
        return {
          i,
          row,
          col,
          x: Math.cos(angle) * dist + (rx - 0.5) * (isNarrow ? 16 : 40),
          y: Math.sin(angle) * dist + ry * (isNarrow ? 24 : 50),
          rotate: (rr - 0.5) * 140,
          delay: seededOffset(i, 4) * 0.28,
        };
      }),
    []
  );

  return (
    <div
      role="img"
      aria-label={alt}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`relative w-full h-full cursor-pointer select-none touch-manipulation overflow-visible ${className}`}>
      <span className="sr-only">{alt}</span>

      {/* Layer 1 — real profile, always clipped to circle */}
      <div className="absolute inset-0 rounded-full overflow-hidden z-0 pointer-events-none">
        <img
          src={baseSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Layer 2 — Spidey cover. Clipped at rest; unclipped when vanishing so blocks fly out */}
      <div
        className={`absolute inset-0 z-10 ${
          vanishing ? 'overflow-visible' : 'overflow-hidden rounded-full'
        }`}
        aria-hidden="true">
        <motion.div
          className="absolute inset-0 rounded-full bg-black"
          initial={false}
          animate={{ opacity: vanishing ? 0 : 1 }}
          transition={{ duration: vanishing ? 0.2 : 0.25 }}
        />

        <div
          className="absolute left-1/2 top-1/2"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gridTemplateRows: `repeat(${GRID}, 1fr)`,
            // Zoom so full Spidey bust (head + chest) fills the circle
            width: '158%',
            height: '158%',
            transform: 'translate(-50%, -50%)',
          }}>
          {tiles.map(({ i, row, col, x, y, rotate, delay }) => (
            <motion.div
              key={i}
              className="relative"
              style={{
                backgroundImage: `url(${coverSrc})`,
                backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                backgroundPosition: `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`,
                backgroundRepeat: 'no-repeat',
                willChange: vanishing ? 'transform, opacity' : 'auto',
              }}
              initial={false}
              animate={
                vanishing
                  ? reducedMotion
                    ? { opacity: 0 }
                    : {
                        x,
                        y,
                        rotate,
                        opacity: 0,
                        scale: 0.4,
                      }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      scale: 1,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.25 : vanishing ? 0.65 : 0.4,
                delay: reducedMotion ? 0 : vanishing ? delay : delay * 0.35,
                ease: vanishing ? [0.16, 1, 0.3, 1] : [0.25, 1, 0.5, 1],
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
