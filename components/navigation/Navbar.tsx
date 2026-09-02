'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAVIGATION, SITE_CONFIG, IMAGES } from '@/lib/constants'

type NavItemType = (typeof NAVIGATION)[number]

// Memoized navigation item component
const NavigationItem = React.memo<{ item: NavItemType }>(function NavigationItem({ item }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'px-4 py-2 text-base lg:text-lg font-semibold rounded-lg transition-all duration-200',
        'special' in item && item.special
          ? 'text-white bg-cardinal hover:shadow-md'
          : 'text-white hover:bg-white/10'
      )}
    >
      {item.name}
    </Link>
  )
})

const Navbar = React.memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const visibleNavigation = NAVIGATION.filter((item) => !item.hidden)

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-cardinal text-white backdrop-blur-sm shadow-sm border-b-2 border-gold/60">
      <div className="mx-auto px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 overflow-hidden rounded-full">
                <Image
                  src={IMAGES.logo}
                  alt={`${SITE_CONFIG.name} Logo`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gold tracking-wide">{SITE_CONFIG.name}</h1>
                <p className="text-sm font-semibold text-white">{SITE_CONFIG.affiliation}</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            {visibleNavigation.map((item) => (
              <NavigationItem key={item.name} item={item} />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gold"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {visibleNavigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-lg font-semibold transition-colors',
                    'special' in item && item.special
                        ? 'text-white bg-cardinal'
                        : 'text-charcoal hover:text-cardinal hover:bg-gold/10'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
})

export default Navbar
