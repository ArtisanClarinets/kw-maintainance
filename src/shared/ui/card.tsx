import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/shared/lib/utils"
import { Loading } from "./loading"
import { AlertCircle } from "lucide-react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  loadingText?: string
  interactive?: boolean
  onClick?: () => void
}

const Card = React.forwardRef<
  HTMLDivElement,
  CardProps
>(({ 
  className, 
  isLoading = false, 
  hasError = false, 
  errorMessage = "Failed to load content",
  loadingText = "Loading...",
  interactive = false,
  onClick,
  ...props 
}, ref) => {
  if (interactive) {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm transition-all",
          {
            "cursor-pointer hover:shadow-md": interactive && !isLoading && !hasError,
            "cursor-wait": isLoading,
            "cursor-not-allowed": hasError,
            "border-destructive/30": hasError,
            "opacity-70": isLoading || hasError
          },
          className
        )}
        whileHover={interactive && !isLoading && !hasError ? { y: -4, scale: 1.02 } : undefined}
        whileTap={interactive && !isLoading && !hasError ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={onClick}
        aria-busy={isLoading}
        aria-invalid={hasError}
        aria-disabled={isLoading || hasError}
        role={"button"}
        tabIndex={0}
        {...(props as any)}
      >
        {isLoading ? (
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[150px]">
            <Loading variant="spinner" size="md" color="text-primary" />
            <span className="text-sm text-muted-foreground">{loadingText}</span>
          </div>
        ) : hasError ? (
          <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[150px] text-center">
            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h4 className="font-semibold text-destructive mb-1">Error</h4>
              <p className="text-sm text-destructive/80">{errorMessage}</p>
            </div>
          </div>
        ) : (
          props.children
        )}
      </motion.div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-all",
        {
          "cursor-pointer hover:shadow-md": interactive && !isLoading && !hasError,
          "cursor-wait": isLoading,
          "cursor-not-allowed": hasError,
          "border-destructive/30": hasError,
          "opacity-70": isLoading || hasError
        },
        className
      )}
      onClick={onClick}
      aria-busy={isLoading}
      aria-invalid={hasError}
      aria-disabled={isLoading || hasError}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {isLoading ? (
        <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[150px]">
          <Loading variant="spinner" size="md" color="text-primary" />
          <span className="text-sm text-muted-foreground">{loadingText}</span>
        </div>
      ) : hasError ? (
        <div className="p-6 flex flex-col items-center justify-center gap-4 min-h-[150px] text-center">
          <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h4 className="font-semibold text-destructive mb-1">Error</h4>
            <p className="text-sm text-destructive/80">{errorMessage}</p>
          </div>
        </div>
      ) : (
        props.children
      )}
    </div>
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
