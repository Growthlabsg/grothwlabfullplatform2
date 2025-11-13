"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class FeedErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Feed Error Boundary caught an error:", error, errorInfo)
    
    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log error to analytics/monitoring service
    this.logError(error, errorInfo)
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, this would send to your error tracking service
    // Example: Sentry, LogRocket, etc.
    try {
      // Simulate error logging
      console.group("Feed Error Report")
      console.error("Error:", error)
      console.error("Component Stack:", errorInfo.componentStack)
      console.error("Timestamp:", new Date().toISOString())
      console.groupEnd()
    } catch (loggingError) {
      console.error("Failed to log error:", loggingError)
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  private handleGoHome = () => {
    window.location.href = "/"
  }

  private handleRefresh = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI
      return (
        <Card className="max-w-md mx-auto mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Feed Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                We encountered an issue loading your feed. This might be due to a temporary network problem or server issue.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Button 
                onClick={this.handleRetry} 
                className="w-full"
                variant="default"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button 
                onClick={this.handleGoHome} 
                className="w-full"
                variant="outline"
              >
                <Home className="h-4 w-4 mr-2" />
                Go to Home
              </Button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 p-3 bg-muted rounded-md text-sm">
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Development)
                </summary>
                <div className="space-y-2">
                  <div>
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Component Stack:</strong>
                      <pre className="mt-1 text-xs overflow-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// Hook for functional components to handle errors
export function useFeedErrorHandler() {
  const handleError = React.useCallback((error: Error, errorInfo: ErrorInfo) => {
    // Custom error handling logic
    console.error("Feed error:", error, errorInfo)
    
    // You could dispatch to a global error state
    // dispatch({ type: 'SET_ERROR', payload: { error, errorInfo } })
  }, [])

  return { handleError }
} 