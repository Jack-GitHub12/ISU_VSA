import React from 'react'
import Link from 'next/link'
import { Instagram, Mail, MapPin, MessageSquare } from 'lucide-react'
import { SITE_CONFIG, UNIVERSITY } from '@/lib/constants'

const Footer = React.memo(function Footer() {
  return (
    <footer className="bg-gradient-to-br from-cardinal via-cardinal-dark to-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-cardinal to-gold" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-gold font-bold text-xl mb-4 flex items-center">
              <span className="text-2xl mr-2">🇻🇳</span>
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-100 text-sm leading-relaxed">{SITE_CONFIG.description}</p>
            <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-xs text-gold font-semibold">Part of the ACCE Program</p>
              <p className="text-xs text-gray-200 mt-1">Asian Cultural Center for Everyone</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-gold transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-gold transition-colors text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved/membership"
                  className="text-gray-300 hover:text-gold transition-colors text-sm"
                >
                  Join VSA
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-300 hover:text-gold transition-colors text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{SITE_CONFIG.email}</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{SITE_CONFIG.location}</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4" role="list" aria-label="Social media links">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
                aria-label="Follow us on Instagram (opens in new tab)"
                role="listitem"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={SITE_CONFIG.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
                aria-label="Join our Discord server (opens in new tab)"
                role="listitem"
              >
                <MessageSquare className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.social.email}`}
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
                aria-label={`Send email to ${SITE_CONFIG.social.email}`}
                role="listitem"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
            <div className="mt-4">
              <Link href="/get-involved/newsletter" className="btn-secondary inline-block text-sm">
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">{UNIVERSITY.motto}</p>
        </div>
      </div>
    </footer>
  )
})

export default Footer
