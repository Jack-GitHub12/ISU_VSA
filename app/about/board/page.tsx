'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, Linkedin, Instagram, User, Users } from 'lucide-react'

interface BoardMember {
  name: string
  position: string
  image: string
  email: string
  major?: string
  year?: string
  bio?: string
  linkedin?: string
  instagram?: string
}

interface CommitteeMember {
  name: string
  position: string
  image: string
  major?: string
  email?: string
}

// Executive board members - to be updated each year after elections
const executiveBoard: BoardMember[] = [
  // Board member information will be updated after annual elections
  // Contact isuvsa@gmail.com for current board information
]

// Committee chairs - to be updated each year after elections
const committeeChairs: CommitteeMember[] = [
  // Committee chair information will be updated after annual elections
  // Contact isuvsa@gmail.com for current committee information
]

export default function ExecutiveBoardPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Group Photo */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 z-10" />
        <div className="absolute inset-0">
          <Image
            src="/images/eboard/eboardGroup_Smile.JPG"
            alt="ISU VSA Executive Board"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="relative z-20 h-full flex items-end pb-12">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Executive Board</h1>
              <p className="text-xl md:text-2xl text-white">
                Meet the dedicated leaders driving ISU VSA forward
              </p>
            </motion.div>
          </div>
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
            {executiveBoard.length > 0 ? executiveBoard.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card flex flex-col md:flex-row gap-6"
              >
                <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-cardinal mb-1">{member.name}</h3>
                  <p className="text-lg font-semibold text-gold mb-2">{member.position}</p>
                  {member.major && member.year && (
                    <p className="text-sm text-gray-600 mb-3">
                      {member.major} • {member.year}
                    </p>
                  )}
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-cardinal rounded-full flex items-center justify-center text-white hover:bg-cardinal-dark transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    <a
                      href={member.instagram}
                      className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )) : (
              <div className="col-span-2 text-center py-12 bg-white rounded-xl shadow-lg">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Board Information Coming Soon</h3>
                <p className="text-gray-500 mb-4">Executive board members will be updated after elections.</p>
                <a href="mailto:isuvsa@gmail.com" className="text-cardinal hover:underline">Contact us for current board information</a>
              </div>
            )}
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
            <h2 className="section-title">Committee Leaders & Advisors</h2>
            <p className="section-subtitle">
              Supporting our organization with expertise and guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {committeeChairs.length > 0 ? committeeChairs.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-center"
              >
                <div className="relative w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-4 border-gold">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <h4 className="font-bold text-sm">{member.name}</h4>
                <p className="text-xs text-gold font-semibold">{member.position}</p>
                {member.major && <p className="text-xs text-gray-600">{member.major}</p>}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-xs text-cardinal hover:underline mt-1 block"
                  >
                    Email
                  </a>
                )}
              </motion.div>
            )) : (
              <div className="col-span-6 text-center py-8">
                <p className="text-gray-600">Committee chair information will be updated after elections.</p>
              </div>
            )}
          </div>

          {/* Faculty Advisor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Faculty Advisor</h3>
            <div className="card inline-block">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">Amanda Chung</h4>
                  <p className="text-gold font-semibold">VSA Adviser</p>
                  <a
                    href="mailto:achung@iastate.edu"
                    className="text-sm text-cardinal hover:underline"
                  >
                    achung@iastate.edu
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
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
              Elections are held yearly at the end of spring semester. Get involved now to prepare
              for leadership positions!
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
