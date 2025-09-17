'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  showDetails?: boolean
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  eventId?: string
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      eventId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you might want to send this to an error reporting service
    // Example: sendErrorReport(error, errorInfo, this.state.eventId)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4" role="alert">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              {/* Error Icon */}
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" aria-hidden="true" />
              </div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h1>
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error. Don&apos;t worry, our team has been notified.
              </p>

              {/* Error Details (Development Mode) */}
              {this.props.showDetails && this.state.error && (
                <details className="text-left mb-6 bg-gray-100 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Error Details
                  </summary>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div>
                      <strong>Event ID:</strong> {this.state.eventId}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap text-xs mt-1 bg-white p-2 rounded border overflow-auto max-h-32">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-cardinal text-white py-3 px-4 rounded-lg hover:bg-cardinal-dark transition-colors flex items-center justify-center"
                  aria-label="Try again"
                >
                  <RefreshCw className="w-5 h-5 mr-2" aria-hidden="true" />
                  Try Again
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={this.handleGoBack}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                    aria-label="Go back to previous page"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                    Go Back
                  </button>

                  <button
                    onClick={this.handleGoHome}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex items-center justify-center"
                    aria-label="Go to homepage"
                  >
                    <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                    Home
                  </button>
                </div>
              </div>

              {/* Support Information */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  If this problem persists, please contact us at{' '}
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-cardinal hover:underline"
                    aria-label="Contact VSA support via email"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </p>
                {this.state.eventId && (
                  <p className="text-xs text-gray-400 mt-2">Error ID: {this.state.eventId}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook version for functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Unhandled error:', error, errorInfo)
    // In production, send to error reporting service
  }
}

// Higher-order component wrapper
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Partial<Props>
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  )

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`

  return WithErrorBoundaryComponent
}

// Specific error boundary components for different use cases
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        // Log page-level errors
        console.error('Page Error:', error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}

export function ComponentErrorBoundary({
  children,
  componentName,
}: {
  children: ReactNode
  componentName: string
}) {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">
            Failed to load {componentName}. Please try refreshing the page.
          </p>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error(`${componentName} Error:`, error, errorInfo)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
