'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Globe, Trophy, ChevronRight, Clock, MapPin, Sparkles, UsersRound, PlugZap, Flag } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

const InstagramEmbed = dynamic(() => import('@/components/layout/InstagramEmbed'), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />,
  ssr: false
})

// Temporarily hide the homepage events section until content is ready
const SHOW_EVENTS_SECTION = false

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const heroSlides = [
    {
      title: 'ISU VSA 2023',
      subtitle: 'Celebrating our 2023-2024 family',
      image: '/images/groupPhoto/vsa_2023.jpeg',
      priority: true,
    },
    {
      title: 'ISU VSA 2020',
      subtitle: 'Resilient and connected in 2020',
      image: '/images/groupPhoto/vsa_2020.jpg',
      priority: false,
    },
    {
      title: 'ISU VSA 2019',
      subtitle: 'Building friendships in 2019',
      image: '/images/groupPhoto/vsa_2019.jpg',
      priority: false,
    },
    {
      title: 'ISU VSA 2018',
      subtitle: 'Honoring traditions in 2018',
      image: '/images/groupPhoto/vsa_2018.jpg',
      priority: false,
    },
    {
      title: 'ISU VSA 2017',
      subtitle: 'Memories from our 2017 crew',
      image: '/images/groupPhoto/vsa_2017.jpg',
      priority: false,
    },
    {
      title: 'ISU VSA 2016',
      subtitle: 'Throwback to 2016 beginnings',
      image: '/images/groupPhoto/vsa_2016.jpg',
      priority: false,
    },
  ]

  const startAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    autoAdvanceRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
  }, [heroSlides.length])

  useEffect(() => {
    setIsMounted(true)
    startAutoAdvance()
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current)
    }
  }, [startAutoAdvance])

  const handleManualSlide = useCallback(
    (index: number) => {
      setCurrentSlide((prev) => {
        const nextIndex = (index + heroSlides.length) % heroSlides.length
        return nextIndex === prev ? prev : nextIndex
      })
      startAutoAdvance()
    },
    [heroSlides.length, startAutoAdvance]
  )

  const featureCards = [
    {
      icon: PlugZap,
      title: 'Connection',
      description:
        'We provides an inclusive communicity that allows everyone to build long lasting friendships',
      iconClass: 'bg-cardinal text-white',
    },
    {
      icon: UsersRound,
      title: 'Social Events',
      description:
        'Experience bi-weekly meetings every Thursday and take part in events such as the Maid Café and educational workshops throughout the year!',
      iconClass: 'bg-[#F1BE48] text-white',
    },
    {
      icon: Flag,
      title: 'Leadership Growth',
      description:
        'We provide opportunities to gain valuable leadership experience throughout the year.',
      iconClass: 'bg-cardinal text-white',
    },
  ] as const

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />

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
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 text-balance">
              Iowa State&apos;s Vietnamese Student Association
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/acce" className="btn-primary">Learn About ACCE</Link>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleManualSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? 'bg-gold w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-cardinal/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">What is ISU VSA?</h2>
            <p className="section-subtitle">The Iowa State University Vietnamese Student Association (ISU VSA) is a student-led organization dedicated to celebrating Vietnamese culture, building community, and fostering leadership.
                                            Our mission is to create a welcoming space where students of all backgrounds can connect, learn, and grow through shared cultural experiences, community involvement, and personal development.
</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => {
              const Icon = card.icon
              const CardContent = () => (
                <>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${card.iconClass}`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </>
              )

              if (!isMounted) {
                return (
                  <div key={card.title} className="card text-center">
                    <CardContent />
                  </div>
                )
              }

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="card text-center"
                >
                  <CardContent />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {SHOW_EVENTS_SECTION && (
        <section className="py-16 px-4 bg-cream">
          {/* Upcoming Events */}
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
                className="bg-cardinal p-8 rounded-xl text-white"
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
      )}

      {/* ACCE Program Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-cardinal p-8 rounded-2xl text-white shadow-2xl"
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Building bonds between our communicity</h3>
              <p className="text-lg mb-6 opacity-95">
                ISU VSA is proud to present the ACCE program, a place where members come together, form lasting friendships, and become part of a close-knit family within VSA. 
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
      <section className="py-16 px-4 bg-cardinal text-white">
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
                href="https://market.stuorg.iastate.edu/2762/product"
                className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors"
                target="_blank"
                rel="noopener noreferrer"
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
