'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    subItems: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Executive Board', href: '/about/board' },
      { name: 'History', href: '/about/history' },
      { name: 'Constitution', href: '/about/constitution' },
    ],
  },
  {
    name: 'Events',
    href: '/events',
    subItems: [
      { name: 'Upcoming Events', href: '/events/upcoming' },
      { name: 'Past Events', href: '/events/past' },
      { name: 'Tết Celebration', href: '/events/tet' },
      { name: 'Cultural Shows', href: '/events/cultural-shows' },
    ],
  },
  {
    name: 'Get Involved',
    href: '/get-involved',
    subItems: [
      { name: 'Membership', href: '/get-involved/membership' },
      { name: 'Committees', href: '/get-involved/committees' },
      { name: 'Volunteer', href: '/get-involved/volunteer' },
      { name: 'Newsletter', href: '/get-involved/newsletter' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    subItems: [
      { name: 'Cultural Library', href: '/resources/cultural-library' },
      { name: 'Language Learning', href: '/resources/language' },
      { name: 'Recipes', href: '/resources/recipes' },
      { name: 'Study Resources', href: '/resources/study' },
    ],
  },
  { name: 'Gallery', href: '/gallery' },
  { name: 'VSA Royale', href: '/vsa-royale', special: true },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-cardinal-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">VSA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-cardinal">ISU VSA</h1>
                <p className="text-xs text-gray-600">Iowa State University</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.subItems && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors',
                    item.special
                      ? 'text-white bg-gradient-cardinal-gold rounded-lg hover:scale-105 transform transition-transform'
                      : 'text-charcoal hover:text-cardinal'
                  )}
                >
                  <span>{item.name}</span>
                  {item.subItems && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.subItems && openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gold/20 hover:text-cardinal transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-charcoal hover:text-cardinal hover:bg-gold/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cardinal"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 rounded-md text-base font-medium',
                      item.special
                        ? 'text-white bg-gradient-cardinal-gold'
                        : 'text-charcoal hover:text-cardinal hover:bg-gold/20'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="pl-4">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-cardinal hover:bg-gold/10 rounded-md"
                          onClick={() => setIsOpen(false)}
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
}