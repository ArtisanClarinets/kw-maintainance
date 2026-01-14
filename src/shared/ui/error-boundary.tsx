"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "./button"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error | undefined
  errorInfo?: React.ErrorInfo | undefined
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
    this.setState({ error, errorInfo })
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center gap-4 ${this.props.className || ''}`}
          role="alert"
          aria-live="assertive"
        >
          <div className="flex items-center justify-center w-12 h-12 bg-destructive/20 rounded-full">
            <AlertCircle className="w-6 h-6 text-destructive" />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h3>
            <p className="text-sm text-destructive/80 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            
            {this.state.errorInfo?.componentStack && process.env.NODE_ENV === "development" && (
              <details className="text-xs text-destructive/70 mt-2 p-2 bg-destructive/5 rounded">
                <summary>Error Details</summary>
                <pre className="overflow-auto max-h-40">{this.state.errorInfo.componentStack}</pre>
              </details>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={this.resetErrorBoundary}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </motion.div>
      )
    }

    return this.props.children
  }
}

export interface ErrorDisplayProps {
  error: Error
  errorInfo?: React.ErrorInfo
  onRetry?: () => void
  className?: string
}

export function ErrorDisplay({ error, errorInfo, onRetry, className }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 bg-destructive/10 border border-destructive/20 rounded-lg flex flex-col items-center justify-center gap-4 ${className || ''}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-destructive/20 rounded-full">
        <AlertCircle className="w-6 h-6 text-destructive" />
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h3>
        <p className="text-sm text-destructive/80 mb-4">
          {error.message || "An unexpected error occurred"}
        </p>
        
        {errorInfo?.componentStack && process.env.NODE_ENV === "development" && (
          <details className="text-xs text-destructive/70 mt-2 p-2 bg-destructive/5 rounded">
            <summary>Error Details</summary>
            <pre className="overflow-auto max-h-40">{errorInfo.componentStack}</pre>
          </details>
        )}
      </div>
      
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </motion.div>
  )
}