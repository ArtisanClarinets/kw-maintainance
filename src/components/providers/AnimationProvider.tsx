'use client';

import { ViewTransitions } from 'next-view-transitions';
import { LazyMotion, domAnimation } from 'framer-motion';

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <ViewTransitions>
        {children}
      </ViewTransitions>
    </LazyMotion>
  );
}
