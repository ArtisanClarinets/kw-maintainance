"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing for premium feel
      smoothWheel: true,
      syncTouch: true,
    });

    // 1. Force ScrollTrigger to update whenever Lenis scrolls
    lenis.on('scroll', ScrollTrigger.update);

    // 2. Inject Lenis into GSAP's Ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 3. Disable GSAP's internal lag smoothing
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(gsap.ticker.lagSmoothing);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
