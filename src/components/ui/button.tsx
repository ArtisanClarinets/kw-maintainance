import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-2xl active:scale-[0.97] transform-gpu transition",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-2xl active:scale-[0.97] transform-gpu transition",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md active:scale-[0.98] transform-gpu transition",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        loading: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-2xl active:scale-[0.97] transform-gpu transition cursor-wait",
        error: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-2xl active:scale-[0.97] transform-gpu transition",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  hasError?: boolean
  errorMessage?: string
  loadingText?: string
  successText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    isLoading = false, 
    hasError = false, 
    errorMessage, 
    loadingText = "Processing...", 
    successText, 
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : motion.button
    
    // Determine the effective variant based on state
    const effectiveVariant = hasError ? "error" : isLoading ? "loading" : variant
    
    // Determine the content to display
    let buttonContent = children
    if (isLoading) {
      buttonContent = (
        <span className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </span>
      )
    } else if (hasError) {
      buttonContent = (
        <span className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          {errorMessage || "Error"}
        </span>
      )
    } else if (successText) {
      buttonContent = successText
    }
    
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant: effectiveVariant, size, className }))}
          ref={ref as any}
          disabled={isLoading || hasError || props.disabled}
          aria-disabled={isLoading || hasError || props.disabled}
          aria-busy={isLoading}
          aria-invalid={hasError}
          aria-live={hasError ? "assertive" : undefined}
          {...props}
        >
          {buttonContent}
        </Slot>
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant: effectiveVariant, size, className }))}
        ref={ref}
        whileHover={!isLoading && !hasError ? { scale: 1.05 } : undefined}
        whileTap={!isLoading && !hasError ? { scale: 0.95 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        disabled={isLoading || hasError || props.disabled}
        aria-disabled={isLoading || hasError || props.disabled}
        aria-busy={isLoading}
        aria-invalid={hasError}
        aria-live={hasError ? "assertive" : undefined}
        {...(props as any)}
      >
        {buttonContent}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
