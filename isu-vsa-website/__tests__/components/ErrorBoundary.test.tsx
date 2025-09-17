import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary, {
  ComponentErrorBoundary,
  PageErrorBoundary,
} from '../../components/common/ErrorBoundary'

// Component that throws an error for testing
const ThrowError = ({ shouldError = false }) => {
  if (shouldError) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

// Mock console.error to avoid noise in test output
const originalConsoleError = console.error
beforeEach(() => {
  console.error = jest.fn()
})

afterEach(() => {
  console.error = originalConsoleError
})

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldError={false} />
      </ErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldError={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(
      screen.getByText(
        "We encountered an unexpected error. Don't worry, our team has been notified."
      )
    ).toBeInTheDocument()
  })

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldError={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('calls onError callback when error occurs', () => {
    const onErrorMock = jest.fn()

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowError shouldError={true} />
      </ErrorBoundary>
    )

    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    )
  })

  it('shows error details when showDetails is true', () => {
    render(
      <ErrorBoundary showDetails={true}>
        <ThrowError shouldError={true} />
      </ErrorBoundary>
    )

    expect(screen.getByText('Error Details')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldError={true} />
      </ErrorBoundary>
    )

    const errorContainer = screen.getByRole('alert')
    expect(errorContainer).toBeInTheDocument()

    // Check for ARIA labels
    expect(screen.getByLabelText('Try again')).toBeInTheDocument()
    expect(screen.getByLabelText('Go back to previous page')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to homepage')).toBeInTheDocument()
    expect(screen.getByLabelText('Contact VSA support via email')).toBeInTheDocument()
  })

  describe('Error Recovery', () => {
    it('allows retry functionality', () => {
      const { rerender } = render(
        <ErrorBoundary>
          <ThrowError shouldError={true} />
        </ErrorBoundary>
      )

      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()

      // Click retry button
      fireEvent.click(screen.getByText('Try Again'))

      // Re-render with no error
      rerender(
        <ErrorBoundary>
          <ThrowError shouldError={false} />
        </ErrorBoundary>
      )

      expect(screen.getByText('No error')).toBeInTheDocument()
    })

    it('handles go back button click', () => {
      // Mock window.history
      const mockBack = jest.fn()
      Object.defineProperty(window, 'history', {
        writable: true,
        value: {
          length: 2,
          back: mockBack,
        },
      })

      render(
        <ErrorBoundary>
          <ThrowError shouldError={true} />
        </ErrorBoundary>
      )

      fireEvent.click(screen.getByText('Go Back'))
      expect(mockBack).toHaveBeenCalled()
    })

    it('handles go home button click', () => {
      // Mock window.location
      delete window.location
      window.location = { href: '' } as Location

      render(
        <ErrorBoundary>
          <ThrowError shouldError={true} />
        </ErrorBoundary>
      )

      fireEvent.click(screen.getByText('Home'))
      expect(window.location.href).toBe('/')
    })
  })
})

describe('ComponentErrorBoundary', () => {
  it('renders custom fallback for component errors', () => {
    render(
      <ComponentErrorBoundary componentName="TestComponent">
        <ThrowError shouldError={true} />
      </ComponentErrorBoundary>
    )

    expect(
      screen.getByText('Failed to load TestComponent. Please try refreshing the page.')
    ).toBeInTheDocument()
  })
})

describe('PageErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <PageErrorBoundary>
        <ThrowError shouldError={false} />
      </PageErrorBoundary>
    )

    expect(screen.getByText('No error')).toBeInTheDocument()
  })

  it('handles page-level errors', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    render(
      <PageErrorBoundary>
        <ThrowError shouldError={true} />
      </PageErrorBoundary>
    )

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Page Error:',
      expect.any(Error),
      expect.any(Object)
    )

    consoleErrorSpy.mockRestore()
  })
})
