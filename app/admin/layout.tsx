'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Calendar, Users, Settings, FileText, Home, LogOut, Menu, X, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Initialize with token check to avoid flash of login screen
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('vsa-admin-token')
    }
    return false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem('vsa-admin-token')

      if (token) {
        // Optimistically stay authenticated while verifying
        setIsAuthenticated(true)

        try {
          const response = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-session-token': token
            },
            body: JSON.stringify({ action: 'verify' })
          })

          const data = await response.json()

          if (!data.success || !data.authenticated) {
            // Only clear auth if verification actually failed
            localStorage.removeItem('vsa-admin-auth')
            localStorage.removeItem('vsa-admin-token')
            setIsAuthenticated(false)
          }
        } catch (error) {
          console.error('Session verification failed:', error)
          // On network error, keep authenticated but verify next time
          // Only clear on explicit auth failure
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    }

    verifySession()
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, action: 'login' })
      })

      const data = await response.json()

      if (data.success) {
        setIsAuthenticated(true)
        localStorage.setItem('vsa-admin-auth', 'authenticated')
        localStorage.setItem('vsa-admin-token', data.sessionToken)
      } else {
        alert(data.message || 'Incorrect password')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Authentication failed. Please try again.')
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('vsa-admin-token')

    if (token) {
      await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-token': token
        },
        body: JSON.stringify({ action: 'logout' })
      })
    }

    setIsAuthenticated(false)
    localStorage.removeItem('vsa-admin-auth')
    localStorage.removeItem('vsa-admin-token')
    router.push('/')
  }

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/board', label: 'Board', icon: Users },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    { href: '/admin/members', label: 'Members', icon: Users },
    { href: '/admin/content', label: 'Content', icon: FileText },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cardinal mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cardinal flex items-center justify-center p-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-cardinal mr-3" />
            <h1 className="text-3xl font-bold text-charcoal">Admin Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal text-gray-900"
                placeholder="Enter admin email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal text-gray-900"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-cardinal text-white py-3 rounded-lg font-semibold hover:bg-cardinal-dark transition-colors"
            >
              Login to Admin Panel
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-cardinal hover:underline">
              ← Back to Main Site
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="ml-2 text-xl font-bold text-cardinal">VSA Admin Panel</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Admin</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-cardinal transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            <div className="flex-1 flex flex-col bg-white border-r border-gray-200">
              <nav className="flex-1 px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive ? 'bg-cardinal text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg pt-16"
            >
              <nav className="px-4 py-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setShowMobileMenu(false)}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive ? 'bg-cardinal text-white' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden">
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
