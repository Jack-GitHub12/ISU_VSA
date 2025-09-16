'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Linkedin, Instagram } from 'lucide-react'

const executiveBoard = [
  {
    name: 'Linh Nguyen',
    position: 'President',
    major: 'Software Engineering',
    year: 'Senior',
    bio: 'Passionate about bringing the Vietnamese community together at ISU through cultural events and fostering lifelong connections.',
    image: '/images/board/board-placeholder.svg',
    email: 'president@isuvsa.org',
    linkedin: 'https://linkedin.com/in/isuvsa',
    instagram: 'https://instagram.com/isuvsa'
  },
  {
    name: 'Kevin Tran',
    position: 'Vice President',
    major: 'Mechanical Engineering',
    year: 'Junior',
    bio: 'Dedicated to supporting our members and creating an inclusive environment where everyone can celebrate Vietnamese culture.',
    image: '/images/board/board-placeholder.svg',
    email: 'vicepresident@isuvsa.org',
    linkedin: 'https://linkedin.com/in/isuvsa',
    instagram: 'https://instagram.com/isuvsa'
  },
  {
    name: 'Anna Le',
    position: 'Treasurer',
    major: 'Accounting & Finance',
    year: 'Junior',
    bio: 'Ensuring fiscal responsibility while maximizing our ability to host amazing events and support our community.',
    image: '/images/board/board-placeholder.svg',
    email: 'treasurer@isuvsa.org',
    linkedin: 'https://linkedin.com/in/isuvsa',
    instagram: 'https://instagram.com/isuvsa'
  },
  {
    name: 'Brandon Pham',
    position: 'Secretary',
    major: 'Communications',
    year: 'Sophomore',
    bio: 'Committed to maintaining clear communication and preserving our organization\'s history and memories.',
    image: '/images/board/board-placeholder.svg',
    email: 'secretary@isuvsa.org',
    linkedin: 'https://linkedin.com/in/isuvsa',
    instagram: 'https://instagram.com/isuvsa'
  }
]

const committeeChairs = [
  {
    name: 'Jenny Vo',
    position: 'Cultural Chair',
    major: 'Global Resource Systems',
    year: 'Senior',
    image: '/images/board/board-placeholder.svg'
  },
  {
    name: 'Tony Nguyen',
    position: 'Social Chair',
    major: 'Psychology',
    year: 'Junior',
    image: '/images/board/board-placeholder.svg'
  },
  {
    name: 'Sophie Hoang',
    position: 'PR & Media Chair',
    major: 'Graphic Design',
    year: 'Sophomore',
    image: '/images/board/board-placeholder.svg'
  },
  {
    name: 'Ryan Duong',
    position: 'Fundraising Chair',
    major: 'Business Economics',
    year: 'Junior',
    image: '/images/board/board-placeholder.svg'
  },
  {
    name: 'Michelle Bui',
    position: 'Community Service Chair',
    major: 'Human Sciences',
    year: 'Senior',
    image: '/images/board/board-placeholder.svg'
  },
  {
    name: 'Jason Lam',
    position: 'Sports & Activities Chair',
    major: 'Kinesiology',
    year: 'Sophomore',
    image: '/images/board/board-placeholder.svg'
  }
]

export default function ExecutiveBoardPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-cardinal to-deepRed text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Executive Board</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Meet the dedicated leaders driving ISU VSA forward
            </p>
          </motion.div>
        </div>
      </section>

      {/* Executive Board Members */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">2024-2025 Officers</h2>
            <p className="section-subtitle">Leading with excellence and dedication</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {executiveBoard.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col md:flex-row gap-6"
              >
                <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-cardinal mb-1">{member.name}</h3>
                  <p className="text-lg font-semibold text-gold mb-2">{member.position}</p>
                  <p className="text-sm text-gray-600 mb-3">
                    {member.major} • {member.year}
                  </p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-cardinal rounded-full flex items-center justify-center text-white hover:bg-cardinal-dark transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={member.instagram}
                      className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Chairs */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Committee Chairs</h2>
            <p className="section-subtitle">Leading our specialized committees with expertise</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {committeeChairs.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-gold">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-sm">{member.name}</h4>
                <p className="text-xs text-gold font-semibold">{member.position}</p>
                <p className="text-xs text-gray-600">{member.major}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team */}
      <section className="py-16 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Want to Join Our Leadership Team?</h2>
            <p className="text-xl mb-8">
              Elections are held annually in April. Get involved now to prepare for leadership positions!
            </p>
            <a
              href="/get-involved/committees"
              className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors inline-block"
            >
              Learn About Committees
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}