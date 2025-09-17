'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Theater, Heart } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function CulturalShowsPage() {
  const upcomingShows = [
    {
      id: 1,
      title: 'Spring Cultural Showcase 2025',
      date: '2025-04-12',
      time: '7:00 PM - 9:30 PM',
      location: 'Stephens Auditorium',
      description:
        'A spectacular evening featuring traditional Vietnamese dances, modern fusion performances, and cultural storytelling.',
      image: '/images/eboard/eboardGroup.JPG',
      acts: [
        'Traditional Fan Dance',
        'Vietnamese Folk Songs',
        'Modern Fusion Dance',
        'Cultural Fashion Show',
      ],
      ticketPrice: '$12 Students, $18 General',
    },
  ]

  const pastShows = [
    {
      id: 1,
      title: 'Fall Cultural Show 2024',
      date: '2024-11-15',
      description:
        'Featured 12 performances celebrating Vietnamese heritage with over 280 attendees.',
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Traditional Dances',
        'Fashion Show',
        'Musical Performances',
        'Cultural Stories',
      ],
    },
    {
      id: 2,
      title: 'Heritage Night 2024',
      date: '2024-04-20',
      description: 'An intimate evening showcasing the diversity of Vietnamese culture.',
      image: '/images/eboard/eboardGroup.JPG',
      highlights: ['Poetry Reading', 'Traditional Music', 'Dance Workshop', 'Cultural Exhibits'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cultural Shows</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Experience the beauty and richness of Vietnamese culture through captivating
              performances
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Show */}
      {upcomingShows.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection direction="up" className="text-center mb-12">
              <h2 className="section-title">Upcoming Show</h2>
            </AnimatedSection>

            {upcomingShows.map((show) => (
              <AnimatedSection key={show.id} direction="up">
                <div className="card">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="relative h-64 lg:h-full rounded-lg overflow-hidden">
                      <Image src={show.image} alt={show.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-cardinal">{show.title}</h3>
                      <p className="text-gray-700 mb-6">{show.description}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3 text-cardinal" />
                          {new Date(show.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-3 text-cardinal" />
                          {show.time}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-3 text-cardinal" />
                          {show.location}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Featured Acts:</h4>
                        <div className="flex flex-wrap gap-2">
                          {show.acts.map((act) => (
                            <span
                              key={act}
                              className="bg-cardinal/10 text-cardinal px-3 py-1 rounded-full text-sm"
                            >
                              {act}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="btn-primary">Get Tickets</button>
                        <button className="btn-outline">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      {/* Past Shows */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Past Performances</h2>
            <p className="section-subtitle">Celebrating our cultural heritage through the years</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastShows.map((show, index) => (
              <AnimatedSection
                key={show.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className="card h-full">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={show.image}
                      alt={show.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{show.title}</h3>
                  <p className="text-gray-600 mb-4">{show.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {show.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-gold/20 text-charcoal px-2 py-1 rounded text-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Get Involved</h2>
            <p className="section-subtitle mb-8">
              Join our cultural shows as a performer, volunteer, or audience member
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Theater className="w-5 h-5 mr-2" />
                Audition for Shows
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Volunteer Backstage
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
