'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Users, Star, Filter, BookOpen, Utensils } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function UpcomingEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tết Festival 2025',
      date: '2025-02-08',
      time: '6:00 PM - 10:00 PM',
      location: 'Memorial Union Great Hall',
      category: 'cultural',
      featured: true,
      description:
        'Celebrate Vietnamese New Year with traditional lion dances, authentic cuisine, cultural performances, and family activities. Join us for our biggest event of the year!',
      attendees: 350,
      maxAttendees: 400,
      image: '/images/eboard/eboardGroup.JPG',
      price: '$10 Students, $15 General',
      highlights: [
        'Lion Dance Performance',
        'Traditional Music',
        'Vietnamese Cuisine',
        'Cultural Exhibits',
      ],
      rsvpDeadline: '2025-02-05',
    },
    {
      id: 2,
      title: 'Phở Night Cooking Class',
      date: '2025-01-22',
      time: '5:30 PM - 7:30 PM',
      location: 'Student Innovation Center Kitchen',
      category: 'culinary',
      featured: false,
      description:
        'Learn to make authentic Vietnamese phở from scratch with our experienced members. All ingredients and equipment provided.',
      attendees: 18,
      maxAttendees: 25,
      image: '/images/eboard/eboardGroup.JPG',
      price: 'Free for members, $5 non-members',
      highlights: ['Hands-on Cooking', 'Recipe Cards', 'Taste Testing', 'Cultural Stories'],
      rsvpDeadline: '2025-01-20',
    },
    {
      id: 3,
      title: 'VSA Royale Tournament',
      date: '2025-01-29',
      time: '7:00 PM - 9:00 PM',
      location: 'Parks Library 198',
      category: 'gaming',
      featured: false,
      description:
        'Compete in our exclusive tower defense game tournament with cash prizes and bragging rights!',
      attendees: 32,
      maxAttendees: 50,
      image: '/images/eboard/eboardGroup.JPG',
      price: 'Free',
      highlights: ['Cash Prizes', 'Tournament Brackets', 'Snacks Provided', 'Gaming Setup'],
      rsvpDeadline: '2025-01-27',
    },
    {
      id: 4,
      title: 'Mid-Autumn Festival Celebration',
      date: '2025-02-12',
      time: '4:00 PM - 8:00 PM',
      location: 'Memorial Union Oak Room',
      category: 'cultural',
      featured: false,
      description:
        'Celebrate the Mid-Autumn Festival with mooncakes, lantern making, and traditional stories.',
      attendees: 65,
      maxAttendees: 80,
      image: '/images/eboard/eboardGroup.JPG',
      price: '$8 Students, $12 General',
      highlights: ['Mooncake Tasting', 'Lantern Making', 'Cultural Stories', 'Photo Booth'],
      rsvpDeadline: '2025-02-10',
    },
    {
      id: 5,
      title: 'Vietnamese Language Exchange',
      date: '2025-01-25',
      time: '3:00 PM - 5:00 PM',
      location: 'Memorial Union Pioneer Room',
      category: 'educational',
      featured: false,
      description:
        'Practice Vietnamese with native speakers and help others learn. All skill levels welcome!',
      attendees: 22,
      maxAttendees: 30,
      image: '/images/eboard/eboardGroup.JPG',
      price: 'Free',
      highlights: ['Native Speakers', 'All Levels', 'Language Games', 'Cultural Exchange'],
      rsvpDeadline: '2025-01-23',
    },
    {
      id: 6,
      title: 'Study Night with Vietnamese Snacks',
      date: '2025-02-02',
      time: '6:00 PM - 10:00 PM',
      location: 'Parks Library',
      category: 'academic',
      featured: false,
      description:
        'Join us for a productive study session with traditional Vietnamese snacks and good company.',
      attendees: 28,
      maxAttendees: 40,
      image: '/images/eboard/eboardGroup.JPG',
      price: 'Free',
      highlights: [
        'Vietnamese Snacks',
        'Quiet Study Areas',
        'Group Study Rooms',
        'Motivational Support',
      ],
      rsvpDeadline: '2025-01-31',
    },
  ]

  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'cultural', name: 'Cultural', icon: Star },
    { id: 'culinary', name: 'Culinary', icon: Utensils },
    { id: 'educational', name: 'Educational', icon: BookOpen },
    { id: 'gaming', name: 'Gaming', icon: Users },
    { id: 'academic', name: 'Academic', icon: Clock },
  ]

  const filteredEvents =
    selectedCategory === 'all'
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.category === selectedCategory)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'cultural':
        return 'from-purple-500 to-purple-700'
      case 'culinary':
        return 'from-orange-500 to-red-600'
      case 'educational':
        return 'from-blue-500 to-blue-700'
      case 'gaming':
        return 'from-green-500 to-green-700'
      case 'academic':
        return 'from-indigo-500 to-indigo-700'
      default:
        return 'from-gray-500 to-gray-700'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Upcoming Events</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Join us for exciting cultural celebrations, educational workshops, and community
              gatherings
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Event */}
      {(() => {
        const featuredEvent = upcomingEvents.find((e) => e.featured)
        if (!featuredEvent) return null

        return (
          <section className="py-12 px-4 bg-gradient-to-b from-gold/10 to-transparent">
            <div className="max-w-7xl mx-auto">
              <AnimatedSection direction="up">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-full">
                      <Image
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-charcoal px-4 py-2 rounded-full font-bold text-sm">
                          FEATURED EVENT
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {featuredEvent.attendees}/{featuredEvent.maxAttendees} Registered
                        </span>
                      </div>
                    </div>
                    <div className="p-8 lg:p-12">
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-cardinal">
                        {featuredEvent.title}
                      </h2>
                      <p className="text-gray-700 mb-6 text-lg">{featuredEvent.description}</p>

                      {/* Event Details */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-5 h-5 mr-3 text-cardinal" />
                          <span>
                            {new Date(featuredEvent.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-5 h-5 mr-3 text-cardinal" />
                          <span>{featuredEvent.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-5 h-5 mr-3 text-cardinal" />
                          <span>{featuredEvent.location}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Event Highlights:</h4>
                        <div className="flex flex-wrap gap-2">
                          {featuredEvent.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="bg-cardinal/10 text-cardinal px-3 py-1 rounded-full text-sm"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary"
                        >
                          RSVP Now
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-outline"
                        >
                          Add to Calendar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>
        )
      })()}

      {/* Filter Bar */}
      <section className="py-8 px-4 sticky top-20 bg-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center space-x-2 overflow-x-auto">
            <Filter className="w-5 h-5 text-gray-600 flex-shrink-0 mr-4" />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-cardinal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4 inline mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <AnimatedSection key={event.id} direction="up" delay={index * 0.1}>
                <div className="card h-full flex flex-col">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(event.category)}`}
                      >
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {event.attendees}/{event.maxAttendees}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-cardinal" />
                      {new Date(event.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-cardinal" />
                      {event.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-cardinal" />
                      {event.location}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.slice(0, 2).map((highlight) => (
                        <span
                          key={highlight}
                          className="bg-gold/20 text-charcoal px-2 py-1 rounded text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {event.highlights.length > 2 && (
                        <span className="text-xs text-gray-500">
                          +{event.highlights.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex justify-between items-center mt-auto">
                    <div>
                      <span className="text-gold font-semibold">{event.price}</span>
                      <p className="text-xs text-gray-500">
                        RSVP by {new Date(event.rsvpDeadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-cardinal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-cardinal-dark transition-colors"
                      >
                        RSVP
                      </motion.button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Don&apos;t See What You&apos;re Looking For?</h2>
            <p className="section-subtitle mb-8">
              Have an idea for an event? We&apos;d love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Suggest an Event
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Join Planning Committee
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
