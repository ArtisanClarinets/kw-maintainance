"use client"

import * as React from "react"
import { Button as EnhancedButton, buttonVariants } from "./ui/button"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Maintain backward compatibility by wrapping the enhanced button
const Button = React.forwardRef<HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement> & 
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    hasError?: boolean
    errorMessage?: string
    loadingText?: string
    successText?: string
  }
>((
  { className, variant, size, asChild = false, isLoading, hasError, errorMessage, loadingText, successText, ...props }, 
  ref
) => {
  return (
    <EnhancedButton
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      variant={variant}
      size={size}
      asChild={asChild}
      isLoading={isLoading}
      hasError={hasError}
      errorMessage={errorMessage}
      loadingText={loadingText}
      successText={successText}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button, buttonVariants }
