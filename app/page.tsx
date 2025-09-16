'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Globe, Trophy, ChevronRight, Clock, MapPin, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import InstagramFeed from '@/components/InstagramFeed'

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeToNextEvent, setTimeToNextEvent] = useState('')

  const heroSlides = [
    {
      title: "Welcome to ISU VSA",
      subtitle: "Connecting Cyclones to Vietnamese Culture",
      image: "/images/hero-1.jpg",
    },
    {
      title: "Tết Celebration 2025",
      subtitle: "Join us for the biggest Vietnamese New Year celebration in Iowa",
      image: "/images/hero-2.jpg",
    },
    {
      title: "Build Lifelong Friendships",
      subtitle: "Connect with a vibrant community of students",
      image: "/images/hero-3.jpg",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  useEffect(() => {
    const nextEventDate = new Date('2025-02-08T18:00:00')
    const updateTimer = () => {
      const now = new Date()
      const difference = nextEventDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeToNextEvent(`${days}d ${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeToNextEvent('Event has started!')
      }
    }
    
    updateTimer()
    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        
        {/* Background Image Slideshow */}
        <div className="absolute inset-0">
          <div 
            className="h-full w-full bg-gradient-cardinal-gold"
            style={{
              backgroundImage: `url('/images/hero-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
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
              Connecting Cyclones to Vietnamese Culture
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
      <section className="py-16 px-4 bg-cream">
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
              <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Community</h3>
              <p className="text-gray-600">
                Connect with fellow students who share your heritage and interests. Create lasting friendships and professional networks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Cultural Events</h3>
              <p className="text-gray-600">
                Experience Vietnamese traditions through Tết celebrations, cultural shows, food festivals, and educational workshops.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card text-center"
            >
              <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Leadership Growth</h3>
              <p className="text-gray-600">
                Develop leadership skills through committee positions, event planning, and community service opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
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
              <h3 className="text-2xl font-bold mb-4">Tết Festival 2025</h3>
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2" />
                <span>February 8, 2025</span>
              </div>
              <div className="flex items-center mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Memorial Union Great Hall</span>
              </div>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <p className="text-sm mb-2">Event starts in:</p>
                <p className="text-3xl font-bold font-mono">{timeToNextEvent}</p>
              </div>
              <Link href="/events/tet" className="bg-white text-cardinal px-6 py-2 rounded-lg inline-flex items-center hover:bg-cream transition-colors">
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
                  <h4 className="font-semibold mb-1">Welcome Week Social</h4>
                  <p className="text-sm text-gray-600 mb-1">Meet new members and enjoy Vietnamese snacks</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>January 15, 2025 | 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Phở Night</h4>
                  <p className="text-sm text-gray-600 mb-1">Learn to make authentic Vietnamese phở</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>January 22, 2025 | 5:30 PM</span>
                  </div>
                </div>
              </div>

              <div className="card flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">VSA Royale Tournament</h4>
                  <p className="text-sm text-gray-600 mb-1">Compete in our exclusive tower defense game</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>January 29, 2025 | 7:00 PM</span>
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

      {/* Instagram Feed */}
      <InstagramFeed />

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
              <Link href="/get-involved/membership" className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors">
                Become a Member
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}