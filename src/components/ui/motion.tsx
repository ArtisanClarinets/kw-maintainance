"use client"

import { motion, type HTMLMotionProps, type MotionProps } from "framer-motion"
import { forwardRef } from "react"

export const MotionDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ children, ...props }, ref) => (
    <motion.div ref={ref} {...props}>
      {children}
    </motion.div>
  )
)

MotionDiv.displayName = "MotionDiv"

export const MotionSpan = forwardRef<HTMLSpanElement, HTMLMotionProps<"span">>(
  ({ children, ...props }, ref) => (
    <motion.span ref={ref} {...props}>
      {children}
    </motion.span>
  )
)

MotionSpan.displayName = "MotionSpan"

export const MotionButton = forwardRef<HTMLButtonElement, HTMLMotionProps<"button">>(
  ({ children, ...props }, ref) => (
    <motion.button ref={ref} {...props}>
      {children}
    </motion.button>
  )
)

MotionButton.displayName = "MotionButton"

export const MotionSection = forwardRef<HTMLElement, HTMLMotionProps<"section">>(
  ({ children, ...props }, ref) => (
    <motion.section ref={ref} {...props}>
      {children}
    </motion.section>
  )
)

MotionSection.displayName = "MotionSection"

export const MotionHeader = forwardRef<HTMLElement, HTMLMotionProps<"header">>(
  ({ children, ...props }, ref) => (
    <motion.header ref={ref} {...props}>
      {children}
    </motion.header>
  )
)

MotionHeader.displayName = "MotionHeader"

export const MotionFooter = forwardRef<HTMLElement, HTMLMotionProps<"footer">>(
  ({ children, ...props }, ref) => (
    <motion.footer ref={ref} {...props}>
      {children}
    </motion.footer>
  )
)

MotionFooter.displayName = "MotionFooter"

// Common animation presets
// ========================

// Entrance Animations
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0 }
}

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  exit: { opacity: 0, y: 10 }
}

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  exit: { opacity: 0, y: -10 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  exit: { opacity: 0, x: -10 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
  exit: { opacity: 0, x: 10 }
}

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, type: "spring", stiffness: 400, damping: 17 },
  exit: { scale: 0.95, opacity: 0 }
}

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
  exit: { y: 10, opacity: 0 }
}

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
  exit: { y: -10, opacity: 0 }
}

export const slideLeft = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 },
  exit: { x: 10, opacity: 0 }
}

export const slideRight = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.5 },
  exit: { x: -10, opacity: 0 }
}

// Hover & Interaction Animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 17 }
}

export const hoverScaleSubtle = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

export const hoverLift = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

export const tapScale = {
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 }
}

export const tapScaleSubtle = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 }
}

// Button-specific animations
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
}

export const buttonHoverSubtle = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: "easeInOut" }
}

// Card-specific animations
export const cardHover = {
  whileHover: { y: -4, scale: 1.02 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

export const cardHoverSubtle = {
  whileHover: { y: -2, scale: 1.01 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: "easeInOut" }
}

export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" }
}

// Micro-interaction animations
export const microBounce = {
  whileHover: { y: -2 },
  whileTap: { y: 0 },
  transition: { duration: 0.1, type: "spring", stiffness: 500, damping: 10 }
}

export const microPulse = {
  animate: { scale: [1, 1.05, 1] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
}

export const microShake = {
  whileHover: { x: [0, -2, 2, -2, 2, 0] },
  transition: { duration: 0.3 }
}

// Form element animations
export const formInputFocus = {
  initial: { borderColor: "#E2E8F0", boxShadow: "0 0 0 0 rgba(0,0,0,0)" },
  whileFocus: { borderColor: "#3B82F6", boxShadow: "0 0 0 2px rgba(59,130,246,0.2)" },
  transition: { duration: 0.2 }
}

// Loading animations
export const loadingPulse = {
  animate: { opacity: [0.5, 1, 0.5] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
}

export const loadingRotate = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: "linear" }
}

// Animation configuration presets
export const animationConfig = {
  subtle: { duration: 0.3, ease: "easeInOut" },
  moderate: { duration: 0.5, ease: "easeInOut" },
  pronounced: { duration: 0.8, ease: "easeInOut" },
  spring: { type: "spring", stiffness: 400, damping: 17 },
  springSoft: { type: "spring", stiffness: 300, damping: 20 },
  springHard: { type: "spring", stiffness: 500, damping: 15 }
}

// Animation strategy constants
// Use these for consistent animation timing across the application
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  MODERATE: 0.3,
  STANDARD: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1.2
}

export const ANIMATION_EASING = {
  STANDARD: "easeInOut",
  ENTRANCE: "easeOut",
  EXIT: "easeIn",
  SPRING: "spring"
}

export const ANIMATION_SPRING = {
  STANDARD: { stiffness: 400, damping: 17 },
  SOFT: { stiffness: 300, damping: 20 },
  HARD: { stiffness: 500, damping: 15 }
}