import * as React from "react"
import { Loader2, AlertCircle, CheckCircle } from "lucide-react"

import { cn } from "@/shared/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  isLoading?: boolean
  hasError?: boolean
  success?: boolean
  icon?: React.ReactNode
  loadingText?: string
  errorText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { 
    className, 
    type, 
    isLoading = false, 
    hasError = false, 
    success = false, 
    icon, 
    loadingText = "Loading...", 
    errorText, 
    ...props 
  }, 
  ref
) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 ease-in-out",
          {
            "border-destructive focus-visible:ring-destructive": hasError,
            "border-success focus-visible:ring-success": success,
            "pr-10": isLoading || hasError || success || icon,
          },
          className
        )}
        ref={ref}
        disabled={isLoading || props.disabled}
        aria-busy={isLoading}
        aria-invalid={hasError}
        aria-describedby={hasError && errorText ? "input-error" : undefined}
        {...props}
      />
      
      {/* Icon/Status indicator */}
      {(isLoading || hasError || success || icon) && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          {hasError && !isLoading && <AlertCircle className="h-4 w-4 text-destructive" />}
          {success && !isLoading && !hasError && <CheckCircle className="h-4 w-4 text-success" />}
          {icon && !isLoading && !hasError && !success && icon}
        </div>
      )}
      
      {/* Error message */}
      {hasError && errorText && (
        <p id="input-error" className="mt-1 text-xs text-destructive">
          {errorText}
        </p>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input }
