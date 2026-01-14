'use client';

import { useId } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();

  return (
    <div className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} {...props}>
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full fill-neutral-400/30 stroke-neutral-400/30"
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
        <svg x={x} y={y} className="overflow-visible">
          {Array.from({ length: numSquares }).map((_, index) => (
            <motion.rect
              key={`${index}-${id}`}
              width={width - 1}
              height={height - 1}
              x={(index % 10) * width + 1} // Simplified placement
              y={Math.floor(index / 10) * height + 1}
              fill="currentColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, maxOpacity, 0] }}
              transition={{
                duration,
                repeat: Infinity,
                delay: index * 0.1,
                repeatType: "reverse",
              }}
              onAnimationComplete={() => {
                 // Randomize position on complete if we wanted really advanced logic,
                 // but simple loop is fine for performance.
              }}
            />
          ))}
        </svg>
      </svg>
    </div>
  );
}
