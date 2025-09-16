import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-gold font-bold text-lg mb-4">ISU VSA</h3>
            <p className="text-gray-300 text-sm">
              Connecting Cyclones to Vietnamese Culture. Building community, celebrating heritage, and creating lasting memories at Iowa State University.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/get-involved/membership" className="text-gray-300 hover:text-gold transition-colors text-sm">
                  Join VSA
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-gold transition-colors text-sm">
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
                <Mail className="w-4 h-4" />
                <span>isuvsa@iastate.edu</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Memorial Union, Ames, IA</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4" />
                <span>(515) 555-0100</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-gold font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/isuvsa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/isuvsa"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:isuvsa@iastate.edu"
                className="bg-gray-700 p-2 rounded-full hover:bg-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
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
            © {new Date().getFullYear()} Iowa State University Vietnamese Student Association. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Go Cyclones! 🌪️
          </p>
        </div>
      </div>
    </footer>
  )
}