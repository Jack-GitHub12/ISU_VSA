'use client'

import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAVIGATION, SITE_CONFIG, IMAGES, UNIVERSITY } from '@/lib/constants'

type NavItemType = (typeof NAVIGATION)[number]

// Memoized navigation item component
const NavigationItem = React.memo<{
  item: NavItemType
  openDropdown: string | null
  setOpenDropdown: (name: string | null) => void
}>(function NavigationItem({ item, openDropdown, setOpenDropdown }) {
  const handleMouseEnter = useCallback(() => {
    if ('subItems' in item && item.subItems) {
      setOpenDropdown(item.name)
    }
  }, [item, setOpenDropdown])

  const handleMouseLeave = useCallback(() => {
    setOpenDropdown(null)
  }, [setOpenDropdown])

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={item.href}
        className={cn(
          'flex items-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
          'special' in item && item.special
            ? 'text-white bg-gradient-to-r from-cardinal to-gold hover:shadow-md'
            : 'text-charcoal hover:text-cardinal hover:bg-gold/10'
        )}
        aria-expanded={'subItems' in item && item.subItems ? openDropdown === item.name : undefined}
        aria-haspopup={'subItems' in item && item.subItems ? 'menu' : undefined}
      >
        <span>{item.name}</span>
        {'subItems' in item && item.subItems && (
          <ChevronDown className="w-4 h-4" aria-hidden="true" />
        )}
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {'subItems' in item && item.subItems && openDropdown === item.name && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-white border border-gray-100 overflow-hidden z-50"
            role="menu"
            aria-labelledby={`menu-${item.name}`}
          >
            <div className="py-1">
              {item.subItems.map((subItem: { name: string; href: string }) => (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className="block px-4 py-2 text-sm text-charcoal hover:bg-gold/10 hover:text-cardinal transition-colors duration-150"
                  role="menuitem"
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

const Navbar = React.memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleMobileMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b-2 border-cardinal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12">
                <Image
                  src={IMAGES.logo}
                  alt={`${SITE_CONFIG.name} Logo`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-cardinal">{SITE_CONFIG.name}</h1>
                <p className="text-xs text-gray-600">{UNIVERSITY.name}</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center space-x-4"
            role="navigation"
            aria-label="Main navigation"
          >
            {NAVIGATION.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-charcoal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-cardinal"
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
              {NAVIGATION.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-base font-medium transition-colors',
                      'special' in item && item.special
                        ? 'text-white bg-gradient-to-r from-cardinal to-gold'
                        : 'text-charcoal hover:text-cardinal hover:bg-gold/10'
                    )}
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                  {'subItems' in item && item.subItems && (
                    <div className="pl-4 mt-1" role="group" aria-labelledby={`mobile-${item.name}`}>
                      {item.subItems.map((subItem: { name: string; href: string }) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-cardinal hover:bg-gold/10 rounded-lg transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
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