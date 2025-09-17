'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Globe, Trophy, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

const InstagramEmbed = dynamic(() => import('@/components/layout/InstagramEmbed'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
})

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: 'Welcome to ISU VSA',
      subtitle: 'Uniting Iowa State with Vietnamese Culture',
      image: '/images/eboard/eboardGroup.JPG',
      priority: true,
    },
    {
      title: 'Join Our Community',
      subtitle: 'Open to all students, faculty, alumni, and community members',
      image: '/images/eboard/eboardGroup_Smile.JPG',
      priority: false,
    },
    {
      title: 'Cultural Awareness',
      subtitle: 'Learn about Vietnamese history, culture, and current events',
      image: '/images/eboard/theBoys.JPG',
      priority: false,
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />

        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="h-full w-full"
            style={{
              backgroundImage: `url('${heroSlides[currentSlide].image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="gradient-text">Welcome to</span> ISU VSA
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Uniting the Iowa State Community with Vietnamese Culture
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-involved/membership" className="btn-primary">
                Join VSA Today
              </Link>
              <Link href="/vsa-royale" className="btn-secondary">
                <Trophy className="w-5 h-5 inline mr-2" />
                Play VSA Royale
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-gold w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-cardinal/10 via-gold/20 to-cardinal/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Why Join ISU VSA?</h2>
            <p className="section-subtitle">Discover the benefits of being part of our community</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cardinal to-cardinal-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p className="text-gray-600">
                Connect with fellow students who share your heritage and interests. Create lasting
                friendships and professional networks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-gold-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cultural Events</h3>
              <p className="text-gray-600">
                Experience Vietnamese traditions through Tet festivals, BBQ cookouts, volleyball
                tournaments, and study nights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cardinal to-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Leadership Growth</h3>
              <p className="text-gray-600">
                Develop leadership skills through committee positions, event planning, and community
                service opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 bg-gradient-to-r from-cream via-white to-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Don&apos;t miss out on our exciting activities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Event Countdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-cardinal-gold p-8 rounded-xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">University of Iowa Tet Festival</h3>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span>February 2025</span>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>University of Iowa</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="text-sm mb-2">Annual collaborative event</p>
                <p className="text-lg">
                  Join us for the largest Vietnamese New Year celebration in Iowa!
                </p>
              </div>
              <Link
                href="/events"
                className="bg-white text-cardinal px-6 py-2 rounded-lg inline-flex items-center hover:bg-cream transition-colors"
              >
                Learn More <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </motion.div>

            {/* Recent Events List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="card flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">BBQ Cookout</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Social gathering with delicious Vietnamese BBQ
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Check Instagram for dates</span>
                  </div>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Study Nights</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Study together and support each other academically
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Throughout the semester</span>
                  </div>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Volleyball Tournament</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    Friendly competition and team building
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Spring semester</span>
                  </div>
                </div>
              </div>

              <Link href="/events" className="btn-outline w-full text-center block">
                View All Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ACCE Program Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-gold/20 via-white to-cardinal/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">ACCE Program</h2>
            <p className="section-subtitle">Asian Cultural Center for Everyone</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-cardinal to-gold p-8 rounded-2xl text-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Building Bridges Between Communities</h3>
              <p className="text-lg mb-6 opacity-95">
                ISU VSA is a proud member of ACCE, a collaborative initiative uniting Asian student organizations
                to celebrate diversity and promote cultural understanding at Iowa State University.
              </p>
              <Link
                href="/acce"
                className="inline-flex items-center bg-white text-cardinal px-6 py-3 rounded-lg font-semibold hover:bg-cream transition-all hover:scale-105"
              >
                Learn About ACCE
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramEmbed />

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-cardinal-gold">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Become a part of ISU VSA and experience the best of Vietnamese culture at Iowa State
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/get-involved/membership"
                className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors"
              >
                Become a Member
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
