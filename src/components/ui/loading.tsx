"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "spinner" | "dots" | "bar" | "skeleton"
  size?: "sm" | "md" | "lg"
  color?: string
  text?: string
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>((
  { className, variant = "spinner", size = "md", color = "text-primary", text, ...props }, 
  ref
) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }
  
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }
  
  return (
    <div 
      ref={ref} 
      className={cn("flex flex-col items-center justify-center gap-2", className)}
      role="status"
      aria-live="polite"
      {...props}
    >
      {variant === "spinner" && (
        <motion.div
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className={cn(sizeClasses[size], color, "animate-spin")} />
        </motion.div>
      )}
      
      {variant === "dots" && (
        <div className="flex space-x-1">
          <motion.span
            className={cn("block h-2 w-2 rounded-full", color)}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span
            className={cn("block h-2 w-2 rounded-full", color)}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span
            className={cn("block h-2 w-2 rounded-full", color)}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      )}
      
      {variant === "bar" && (
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", color)}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {text && (
        <span className={cn("text-muted-foreground", textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  )
})

Loading.displayName = "Loading"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  height?: string
  className?: string
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>((
  { className, width, height, ...props }, 
  ref
) => {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      style={{ width, height }}
      {...props}
    />
  )
})

Skeleton.displayName = "Skeleton"

export const LoadingOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, children, ...props }, 
  ref
) => {
  return (
    <div 
      ref={ref}
      className={cn("fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        <Loading variant="spinner" size="lg" color="text-primary" />
        {children && (
          <span className="text-primary font-medium">
            {children}
          </span>
        )}
      </div>
    </div>
  )
})

LoadingOverlay.displayName = "LoadingOverlay"