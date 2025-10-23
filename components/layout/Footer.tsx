import React from 'react'
import Link from 'next/link'
import { Calendar, Clock, Instagram, MapPin } from 'lucide-react'
import { SITE_CONFIG, UNIVERSITY } from '@/lib/constants'

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M20.317 4.369a18.933 18.933 0 0 0-4.885-1.515.07.07 0 0 0-.073.035 13.226 13.226 0 0 0-.58 1.19 18.61 18.61 0 0 0-5.585 0 12.63 12.63 0 0 0-.593-1.19.077.077 0 0 0-.073-.035 18.87 18.87 0 0 0-4.885 1.515.064.064 0 0 0-.03.025C2.178 9.283 1.292 14.047 1.712 18.739a.082.082 0 0 0 .031.057 18.992 18.992 0 0 0 5.625 2.861.08.08 0 0 0 .086-.027 13.35 13.35 0 0 0 1.156-1.875.077.077 0 0 0-.041-.105 12.356 12.356 0 0 1-1.793-.863.077.077 0 0 1-.008-.129c.12-.09.238-.183.351-.277a.074.074 0 0 1 .077-.01c3.747 1.71 7.807 1.71 11.5 0a.074.074 0 0 1 .078.009 8.1 8.1 0 0 0 .352.278.077.077 0 0 1-.006.129 11.67 11.67 0 0 1-1.794.862.077.077 0 0 0-.041.106c.34.65.73 1.285 1.155 1.874a.078.078 0 0 0 .086.028 18.97 18.97 0 0 0 5.637-2.861.078.078 0 0 0 .031-.056c.47-4.884-.788-9.613-3.447-13.214a.063.063 0 0 0-.03-.025ZM8.12 15.348c-1.137 0-2.067-1.009-2.067-2.249 0-1.24.915-2.262 2.068-2.262 1.152 0 2.082 1.01 2.068 2.262 0 1.24-.916 2.249-2.069 2.249Zm7.816 0c-1.137 0-2.067-1.009-2.067-2.249 0-1.24.915-2.262 2.067-2.262 1.153 0 2.082 1.01 2.068 2.262 0 1.24-.915 2.249-2.068 2.249Z" />
  </svg>
)

const Footer = React.memo(function Footer() {
  return (
    <footer className="bg-cardinal text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gold" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about/board" className="hover:text-gold transition-colors">
                  Executive Board
                </Link>
              </li>
              <li>
                <Link href="/acce" className="hover:text-gold transition-colors">
                  ACCE Program
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Meeting Info */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wide">Meeting</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{SITE_CONFIG.location}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <span>Bi-weekly GBMs on Thursdays</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>6:00–7:30 PM</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gold font-semibold mb-4 uppercase tracking-wide">Connect</h4>
            <div className="flex flex-wrap gap-3" role="list" aria-label="Connect with ISU VSA">
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
                <DiscordIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-300">
              <p>DM us on Instagram @isuvsa for the quickest response.</p>
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
