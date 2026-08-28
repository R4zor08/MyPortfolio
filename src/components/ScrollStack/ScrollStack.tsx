import {
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

type TransformState = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

export type ScrollStackItemProps = {
  children: ReactNode;
  itemClassName?: string;
};

export const ScrollStackItem = ({ children, itemClassName = '' }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  enableSmoothScroll?: boolean;
  endReleaseOffset?: number;
  fitLastCardToEnd?: boolean;
  onStackComplete?: () => void;
};

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  enableSmoothScroll = true,
  endReleaseOffset = 0,
  fitLastCardToEnd = false,
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardLayoutTopsRef = useRef<number[]>([]);
  const endLayoutTopRef = useRef(0);
  const lastCardHeightRef = useRef(0);
  const lastTransformsRef = useRef<Map<number, TransformState>>(new Map());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(String(value));
  }, []);

  const getScrollTop = useCallback(() => {
    if (lenisRef.current) {
      return lenisRef.current.scroll;
    }
    if (useWindowScroll) {
      return window.scrollY;
    }
    return scrollerRef.current?.scrollTop ?? 0;
  }, [useWindowScroll]);

  const getContainerHeight = useCallback(() => {
    if (useWindowScroll) {
      return window.innerHeight;
    }
    return scrollerRef.current?.clientHeight ?? 0;
  }, [useWindowScroll]);

  const measureLayoutPositions = useCallback(() => {
    const scroller = scrollerRef.current;
    const cards = cardsRef.current;
    if (!scroller || !cards.length) return;

    const savedStyles = cards.map((card) => ({
      transform: card.style.transform,
      filter: card.style.filter,
    }));

    cards.forEach((card) => {
      card.style.transform = 'none';
      card.style.filter = 'none';
    });

    if (useWindowScroll) {
      const scrollY = window.scrollY;
      cardLayoutTopsRef.current = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + scrollY;
      });

      const endElement = scroller.querySelector('.scroll-stack-end');
      if (endElement) {
        const rect = endElement.getBoundingClientRect();
        endLayoutTopRef.current = rect.top + scrollY;
      }
    } else {
      cardLayoutTopsRef.current = cards.map((card) => card.offsetTop);
      const endElement = scroller.querySelector('.scroll-stack-end');
      endLayoutTopRef.current = endElement
        ? (endElement as HTMLElement).offsetTop
        : 0;
    }

    lastCardHeightRef.current = cards[cards.length - 1]?.offsetHeight ?? 0;

    cards.forEach((card, i) => {
      card.style.transform = savedStyles[i].transform;
      card.style.filter = savedStyles[i].filter;
    });
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    if (!cardLayoutTopsRef.current.length) return;

    isUpdatingRef.current = true;

    const scrollTop = getScrollTop();
    const containerHeight = getContainerHeight();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElementTop = endLayoutTopRef.current;
    const cardCount = cardsRef.current.length;
    const lastStackOffset = itemStackDistance * Math.max(0, cardCount - 1);
    const pinEnd = fitLastCardToEnd
      ? endElementTop -
        stackPositionPx -
        lastStackOffset -
        lastCardHeightRef.current -
        endReleaseOffset
      : endElementTop - containerHeight / 2 - endReleaseOffset;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = cardLayoutTopsRef.current[i] ?? 0;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jCardTop = cardLayoutTopsRef.current[j] ?? 0;
          const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const transform = `translate3d(0, ${translateY}px, 0) scale(${scale}) rotate(${rotation}deg)`;
      const filter = blur > 0 ? `blur(${blur}px)` : '';

      card.style.transform = transform;
      card.style.filter = filter;
      card.style.transition = 'none';

      lastTransformsRef.current.set(i, {
        translateY,
        scale,
        rotation,
        blur,
      });

      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    endReleaseOffset,
    fitLastCardToEnd,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollTop,
    getContainerHeight,
  ]);

  const startAnimationLoop = useCallback(() => {
    const tick = (time: number) => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      updateCardTransforms();
      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [updateCardTransforms]);

  const setupScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const shouldUseLenis = enableSmoothScroll;

    if (shouldUseLenis && useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.085,
        syncTouch: false,
      });

      lenisRef.current = lenis;
      startAnimationLoop();
      return undefined;
    }

    if (shouldUseLenis) {
      const content = scroller.querySelector('.scroll-stack-inner');
      if (!content) return undefined;

      const lenis = new Lenis({
        wrapper: scroller,
        content: content as HTMLElement,
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
        infinite: false,
        wheelMultiplier: 0.9,
        lerp: 0.085,
        syncTouch: false,
      });

      lenisRef.current = lenis;
      startAnimationLoop();
      return undefined;
    }

    startAnimationLoop();
    return undefined;
  }, [enableSmoothScroll, useWindowScroll, startAnimationLoop, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll<HTMLElement>('.scroll-stack-card'));
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translate3d(0, 0, 0)';
      card.style.transition = 'none';
      card.style.contain = 'layout style paint';
    });

    measureLayoutPositions();
    const nativeCleanup = setupScroll();
    updateCardTransforms();

    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            card.style.marginBottom = `${itemDistance}px`;
          }
        });
        measureLayoutPositions();
        updateCardTransforms();
      }, 120);
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    return () => {
      nativeCleanup?.();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.clearTimeout(resizeTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardLayoutTopsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    scaleDuration,
    rotationAmount,
    blurAmount,
    useWindowScroll,
    enableSmoothScroll,
    endReleaseOffset,
    fitLastCardToEnd,
    onStackComplete,
    setupScroll,
    measureLayoutPositions,
    updateCardTransforms,
  ]);

  useEffect(() => {
    const stopLenis = () => {
      lenisRef.current?.stop();
    };
    const startLenis = () => {
      lenisRef.current?.start();
    };

    window.addEventListener('portfolio:overlay-open', stopLenis);
    window.addEventListener('portfolio:overlay-close', startLenis);

    return () => {
      window.removeEventListener('portfolio:overlay-open', stopLenis);
      window.removeEventListener('portfolio:overlay-close', startLenis);
    };
  }, []);

  const scrollerClass = [
    'scroll-stack-scroller',
    useWindowScroll ? 'scroll-stack-scroller--window' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={scrollerClass} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
