'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full mx-4"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className="inline-flex"
          >
            <AlertTriangle className="w-16 h-16 text-cardinal mb-4" />
          </motion.div>

          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Oops! Something went wrong
          </h2>

          <p className="text-gray-600 mb-6">
            We encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
          </p>

          {process.env.NODE_ENV === 'development' && (
            <details className="mb-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error details (development only)
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                {error.message}
              </pre>
            </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-6 py-3 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-charcoal rounded-lg hover:bg-gray-300 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          If this problem persists, please{' '}
          <Link href="/contact" className="text-cardinal hover:underline">
            contact us
          </Link>
        </p>
      </motion.div>
    </div>
  )
}