import {
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
  onStackComplete?: () => void;
};

function readElementTop(element: HTMLElement, useWindowScroll: boolean) {
  if (useWindowScroll) {
    return element.getBoundingClientRect().top + window.scrollY;
  }
  return element.offsetTop;
}

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
  onStackComplete,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const cardLayoutTopsRef = useRef<number[]>([]);
  const endLayoutTopRef = useRef(0);
  const lastTransformsRef = useRef<Map<number, TransformState>>(new Map());
  const isUpdatingRef = useRef(false);
  const isActiveRef = useRef(false);

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

    void scroller.offsetHeight;

    cardLayoutTopsRef.current = cards.map((card) => readElementTop(card, useWindowScroll));

    const endElement = scroller.querySelector('.scroll-stack-end');
    endLayoutTopRef.current = endElement
      ? readElementTop(endElement as HTMLElement, useWindowScroll)
      : 0;

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
    const pinEnd = endElementTop - containerHeight / 2 - endReleaseOffset;

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
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollTop,
    getContainerHeight,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupScroll = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const shouldUseLenis = enableSmoothScroll && !useWindowScroll;

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

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      return undefined;
    }

    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => scroller.removeEventListener('scroll', handleScroll);
  }, [enableSmoothScroll, useWindowScroll, handleScroll]);

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
    });

    let remeasureTimer: number | undefined;
    let resizeTimer: number | undefined;

    const remeasure = () => {
      measureLayoutPositions();
      updateCardTransforms();
    };

    const scheduleRemeasure = () => {
      window.clearTimeout(remeasureTimer);
      remeasureTimer = window.setTimeout(remeasure, 80);
    };

    remeasure();
    const nativeCleanup = setupScroll();

    const rafRemeasure = requestAnimationFrame(scheduleRemeasure);
    const delayedRemeasures = [250, 750, 1500, 3000].map((delay) =>
      window.setTimeout(scheduleRemeasure, delay)
    );

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            card.style.marginBottom = `${itemDistance}px`;
          }
        });
        scheduleRemeasure();
      }, 120);
    };

    const onLoad = () => scheduleRemeasure();
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) scheduleRemeasure();
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            scheduleRemeasure();
          })
        : null;

    resizeObserver?.observe(scroller);
    cards.forEach((card) => resizeObserver?.observe(card));

    const intersectionObserver =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            ([entry]) => {
              isActiveRef.current = entry.isIntersecting;
              if (entry.isIntersecting) {
                scheduleRemeasure();
              }
            },
            { root: null, rootMargin: '50% 0px', threshold: 0 }
          )
        : null;

    intersectionObserver?.observe(scroller);

    const tick = () => {
      if (isActiveRef.current || useWindowScroll) {
        updateCardTransforms();
      }
      animationFrameRef.current = requestAnimationFrame(tick);
    };
    animationFrameRef.current = requestAnimationFrame(tick);

    window.addEventListener('load', onLoad);
    window.addEventListener('pageshow', onPageShow);
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    window.visualViewport?.addEventListener('resize', onResize, { passive: true });

    const fontsReady = document.fonts?.ready;
    if (fontsReady) {
      fontsReady.then(scheduleRemeasure).catch(() => undefined);
    }

    return () => {
      cancelAnimationFrame(rafRemeasure);
      delayedRemeasures.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(remeasureTimer);
      nativeCleanup?.();
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener('load', onLoad);
      window.removeEventListener('pageshow', onPageShow);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      stackCompletedRef.current = false;
      isActiveRef.current = false;
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
    onStackComplete,
    setupScroll,
    measureLayoutPositions,
    updateCardTransforms,
  ]);

  return (
    <div
      className={[
        'scroll-stack-scroller',
        useWindowScroll ? 'scroll-stack-scroller--window' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
