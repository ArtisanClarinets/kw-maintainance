'use client';

import { useRef, useState, MouseEvent, ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

export function SpotlightCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative border border-border/10 bg-card overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }} // Slightly reduced lift for a "heavier" premium feel
      transition={{ type: "spring", stiffness: 200, damping: 25 }} // Adjusted physics for premium weight
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(100, 218, 250, 0.10),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </motion.div>
  );
}
