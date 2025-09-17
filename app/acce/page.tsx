'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Heart, Globe, Award, Calendar, MapPin, Clock, ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function ACCEPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-cardinal via-cardinal-dark to-gold text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-gold mr-3" />
              <h1 className="text-5xl md:text-6xl font-bold">ACCE Program</h1>
              <Sparkles className="w-8 h-8 text-gold ml-3" />
            </div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4">
              Asian Cultural Center for Everyone
            </p>
            <p className="text-lg max-w-4xl mx-auto opacity-90">
              Building bridges between Asian communities and fostering cultural understanding at Iowa State University
            </p>
          </motion.div>
        </div>
      </section>

      {/* About ACCE Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cream via-white to-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-cardinal mb-4">What is ACCE?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A collaborative initiative bringing together Asian student organizations to celebrate diversity and promote cultural awareness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cardinal">
                  <h3 className="text-2xl font-bold text-cardinal mb-3">Our Mission</h3>
                  <p className="text-gray-700">
                    ACCE aims to unite Asian communities at ISU, creating a supportive environment where
                    students can celebrate their heritage while building lasting connections across cultures.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-gold">
                  <h3 className="text-2xl font-bold text-gold-dark mb-3">Our Vision</h3>
                  <p className="text-gray-700">
                    To be the premier platform for Asian cultural exchange at Iowa State, fostering
                    understanding, collaboration, and celebration of our diverse Asian heritage.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cardinal">
                  <h3 className="text-2xl font-bold text-cardinal mb-3">VSA&apos;s Role</h3>
                  <p className="text-gray-700">
                    As a founding member of ACCE, ISU VSA actively participates in collaborative events,
                    cultural showcases, and community outreach programs that highlight Vietnamese culture
                    alongside other Asian traditions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/eboard/eboardGroup.JPG"
                alt="ACCE Program participants"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cardinal/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-lg font-semibold">Together We Are Stronger</p>
                <p className="text-sm opacity-90">Uniting Asian communities at ISU</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Programs */}
      <section className="py-16 px-4 bg-gradient-to-br from-cardinal/5 via-white to-gold/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-charcoal mb-4">Key Programs & Events</h2>
            <p className="text-xl text-gray-600">Collaborative initiatives that bring our communities together</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Cultural Festival",
                description: "Annual celebration featuring performances, food, and exhibitions from various Asian cultures",
                color: "from-cardinal to-cardinal-dark",
              },
              {
                icon: Users,
                title: "Leadership Summit",
                description: "Developing future leaders through workshops, mentorship, and networking opportunities",
                color: "from-gold to-gold-dark",
              },
              {
                icon: Heart,
                title: "Community Outreach",
                description: "Service projects benefiting both the ISU and greater Ames communities",
                color: "from-cardinal to-gold",
              },
              {
                icon: BookOpen,
                title: "Educational Workshops",
                description: "Interactive sessions on Asian history, languages, and contemporary issues",
                color: "from-gold to-cardinal",
              },
              {
                icon: Award,
                title: "Excellence Awards",
                description: "Recognizing outstanding contributions to cultural diversity and academic achievement",
                color: "from-cardinal-dark to-cardinal",
              },
              {
                icon: Calendar,
                title: "Monthly Mixers",
                description: "Regular social gatherings to build friendships across different organizations",
                color: "from-gold-dark to-gold",
              },
            ].map((program, index) => {
              const Icon = program.icon
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all hover:scale-105 border-2 border-transparent hover:border-cardinal"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${program.color} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">{program.title}</h3>
                  <p className="text-gray-600">{program.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-16 px-4 bg-gradient-to-r from-white via-cream to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-cardinal mb-4">Partner Organizations</h2>
            <p className="text-xl text-gray-600">United in diversity, stronger together</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Vietnamese Student Association",
              "Chinese Students & Scholars Association",
              "Korean Student Association",
              "Japanese Association",
              "Filipino Student Association",
              "Thai Student Association",
              "Indian Students' Association",
              "Asian Pacific American Awareness Coalition",
            ].map((org, index) => (
              <motion.div
                key={org}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-gradient-to-br from-cardinal/10 to-gold/10 rounded-lg p-4 text-center hover:from-cardinal/20 hover:to-gold/20 transition-all"
              >
                <p className="font-semibold text-charcoal">{org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-cardinal via-cardinal-dark to-gold">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join ACCE Through VSA</h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of something bigger. Connect with diverse Asian communities while celebrating Vietnamese culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved/membership"
                className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-all hover:scale-105 inline-flex items-center justify-center"
              >
                Become a VSA Member
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center"
              >
                Learn More About ACCE
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming ACCE Events */}
      <section className="py-16 px-4 bg-gradient-to-r from-cream via-white to-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-cardinal mb-4">Upcoming ACCE Events</h2>
            <p className="text-xl text-gray-600">Don&apos;t miss these collaborative opportunities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cardinal"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cardinal/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-cardinal" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">ACCE Spring Festival</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-1" /> April 2025</p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Memorial Union</p>
                  </div>
                  <p className="text-sm mt-2">Celebrating Asian cultures with performances, food, and activities</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gold"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gold-dark" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Leadership Workshop Series</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Monthly</p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> Various Locations</p>
                  </div>
                  <p className="text-sm mt-2">Develop leadership skills with other Asian student leaders</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}