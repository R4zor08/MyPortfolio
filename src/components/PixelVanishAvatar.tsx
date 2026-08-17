import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const GRID = 16;
const BRUSH_RADIUS = 1.35;
const BREAK_MS = 900;
const RESTORE_MS = 650;
/** Cover zoom / vertical offset for framing Spidey inside the circle */
const COVER_SCALE = 1.1;
const COVER_SHIFT_Y = 0;
/** coverSrc is a transparent cutout, so each tile carries its own opaque
 *  backdrop — it breaks away with the tile and exposes the photo beneath. */
const COVER_BACKDROP = '#0a0518';

type PixelVanishAvatarProps = {
  baseSrc: string;
  coverSrc: string;
  alt: string;
  className?: string;
};

export function PixelVanishAvatar({
  baseSrc,
  coverSrc,
  alt,
  className = '',
}: PixelVanishAvatarProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState<{ col: number; row: number } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const tiles = useMemo(
    () =>
      Array.from({ length: GRID * GRID }, (_, i) => ({
        i,
        row: Math.floor(i / GRID),
        col: i % GRID,
      })),
    []
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const pointToCell = useCallback((clientX: number, clientY: number) => {
    const el = rootRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    const dx = x - 0.5;
    const dy = y - 0.5;
    if (dx * dx + dy * dy > 0.25) return null;

    // Map circle coords onto the zoomed cover grid
    const inv = 1 / COVER_SCALE;
    const pad = (1 - inv) / 2;
    const gx = pad + x * inv;
    const gy = pad + COVER_SHIFT_Y + y * inv;
    return {
      col: Math.min(GRID - 1, Math.max(0, gx * GRID - 0.5)),
      row: Math.min(GRID - 1, Math.max(0, gy * GRID - 0.5)),
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    setCursor(pointToCell(e.clientX, e.clientY));
  };

  const handlePointerLeave = () => setCursor(null);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={alt}
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerMove}
      className={`relative w-full h-full cursor-crosshair select-none touch-manipulation overflow-hidden rounded-full ${className}`}
      style={{ clipPath: 'circle(50%)' }}>
      <span className="sr-only">{alt}</span>

      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-full"
        style={{ clipPath: 'circle(50%)' }}>
        <img
          src={baseSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div
        className="absolute inset-0 z-10 overflow-hidden rounded-full"
        style={{ clipPath: 'circle(50%)' }}
        aria-hidden="true">
        {/* Zoomed cover grid — fills circle like object-cover */}
        <div
          className="absolute left-1/2 top-1/2 overflow-hidden"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID}, 1fr)`,
            gridTemplateRows: `repeat(${GRID}, 1fr)`,
            width: `${COVER_SCALE * 100}%`,
            height: `${COVER_SCALE * 100}%`,
            transform: `translate(-50%, calc(-50% - ${COVER_SHIFT_Y * 100}%))`,
          }}>
          {tiles.map(({ i, row, col }) => {
            const dist = cursor
              ? Math.hypot(col - cursor.col, row - cursor.row)
              : Infinity;
            const broken = dist <= BRUSH_RADIUS;
            const falloff = broken ? 1 - dist / BRUSH_RADIUS : 0;

            return (
              <motion.div
                key={i}
                className="relative"
                style={{
                  backgroundColor: COVER_BACKDROP,
                  backgroundImage: `url(${coverSrc})`,
                  backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
                  backgroundPosition: `${(col / (GRID - 1)) * 100}% ${(row / (GRID - 1)) * 100}%`,
                  backgroundRepeat: 'no-repeat',
                }}
                initial={false}
                animate={
                  reducedMotion
                    ? { opacity: broken ? 0 : 1, scale: 1.02 }
                    : {
                        opacity: broken ? 0 : 1,
                        scale: broken ? 0.55 + (1 - falloff) * 0.25 : 1.02,
                      }
                }
                transition={{
                  duration: reducedMotion
                    ? 0.12
                    : broken
                      ? BREAK_MS / 1000
                      : RESTORE_MS / 1000,
                  ease: broken ? [0.22, 1, 0.36, 1] : [0.25, 1, 0.5, 1],
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
