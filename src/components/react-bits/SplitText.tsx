'use client';

import { motion, useInView, useAnimation, Variant, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
};

export function SplitText({ text, className = '', delay = 0, duration = 0.05 }: SplitTextProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      controls.start("visible");
    } else if (shouldReduceMotion) {
        controls.set("visible"); // Skip animation if reduced motion is on
    }
  }, [isInView, controls, shouldReduceMotion]);

  const words = text.split(' ');

  const container: { hidden: Variant; visible: Variant } = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const child: { hidden: Variant; visible: Variant } = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Accessibility: Screen readers should read the whole text, not fragmented spans.
  return (
    <motion.h1
      ref={ref}
      style={{ display: 'flex', flexWrap: 'wrap', overflow: 'hidden' }}
      variants={container}
      initial={shouldReduceMotion ? "visible" : "hidden"}
      animate={controls}
      className={className}
      aria-label={text} // Provide full text for screen readers
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block', marginRight: '0.25em', whiteSpace: 'nowrap' }} aria-hidden="true">
          {Array.from(word).map((char, index) => (
            <motion.span
              style={{ display: 'inline-block' }}
              variants={child}
              key={index}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
