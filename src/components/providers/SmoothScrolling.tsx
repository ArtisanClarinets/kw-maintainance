'use client';

import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for premium feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // 1. Force ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Inject Lenis into GSAP's Ticker
    // GSAP Ticker runs at the display's native refresh rate
    // This ensures Lenis updates exactly when GSAP updates.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert seconds to MS
    });

    // 3. Disable GSAP's internal lag smoothing
    // Lag smoothing compensates for CPU spikes by "jumping" the animation.
    // In scroll-driven 3D (or high-end 2D), this looks like a glitch.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsap.ticker.lagSmoothing);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
