"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react"

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface SuperAdminErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
}

export class SuperAdminErrorBoundary extends React.Component<
  SuperAdminErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: SuperAdminErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Super Admin Error Boundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const Fallback = this.props.fallback
        return <Fallback error={this.state.error!} reset={this.handleReset} />
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-red-900">
                Super Admin Panel Error
              </CardTitle>
              <CardDescription className="text-lg">
                Something went wrong in the super admin panel. This error has been logged for investigation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Error Type:</span>
                  <Badge variant="destructive">
                    {this.state.error?.name || 'Unknown Error'}
                  </Badge>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Error Message:</h4>
                  <p className="text-sm text-gray-700 font-mono">
                    {this.state.error?.message || 'No error message available'}
                  </p>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error?.stack && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Stack Trace:</h4>
                    <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={this.handleReset} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button onClick={this.handleReload} variant="outline" className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button 
                  onClick={() => window.location.href = '/dashboard'} 
                  variant="outline" 
                  className="flex-1"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </div>

              {/* Help Information */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Bug className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Need Help?</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      If this error persists, please contact the development team with the error details above.
                      Error ID: {Date.now().toString(36)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// React 18+ Error Boundary Hook Alternative
export function useSuperAdminErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error: Error) => {
    console.error('Super Admin Error Handler:', error)
    setError(error)
  }, [])

  // Reset error when component unmounts or dependencies change
  React.useEffect(() => {
    return () => setError(null)
  }, [])

  return {
    error,
    resetError,
    handleError,
    hasError: error !== null
  }
}
