'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Clock, MapPin, Users, Filter, ChevronRight, Sparkles, Star } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Tết Festival 2025',
    date: '2025-02-08',
    time: '6:00 PM - 10:00 PM',
    location: 'Memorial Union Great Hall',
    category: 'cultural',
    featured: true,
    description:
      'Celebrate Vietnamese New Year with traditional performances, authentic food, and cultural activities.',
    attendees: 350,
    image: '/images/eboard/eboardGroup.JPG',
    price: '$10 Students, $15 General',
  },
  {
    id: 2,
    title: 'Phở Night Cooking Class',
    date: '2025-01-22',
    time: '5:30 PM - 7:30 PM',
    location: 'Student Innovation Center Kitchen',
    category: 'social',
    featured: false,
    description:
      'Learn to make authentic Vietnamese phở from scratch with our experienced members.',
    attendees: 30,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free for members',
  },
  {
    id: 3,
    title: 'VSA Royale Tournament',
    date: '2025-01-29',
    time: '7:00 PM - 9:00 PM',
    location: 'Parks Library 198',
    category: 'social',
    featured: false,
    description: 'Compete in our exclusive tower defense game tournament with prizes!',
    attendees: 50,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: 4,
    title: 'Community Service: Food Bank',
    date: '2025-02-01',
    time: '9:00 AM - 12:00 PM',
    location: 'Food Bank of Iowa',
    category: 'service',
    featured: false,
    description: 'Give back to the community by volunteering at the local food bank.',
    attendees: 25,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: 5,
    title: 'Study Night with VSA',
    date: '2025-02-05',
    time: '6:00 PM - 10:00 PM',
    location: 'Parks Library',
    category: 'academic',
    featured: false,
    description: 'Join us for a productive study session with snacks and good company.',
    attendees: 40,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: 6,
    title: 'Spring Roll Workshop',
    date: '2025-02-15',
    time: '3:00 PM - 5:00 PM',
    location: 'Memorial Union Kitchen',
    category: 'cultural',
    featured: false,
    description: 'Learn to make traditional Vietnamese spring rolls (gỏi cuốn).',
    attendees: 20,
    image: '/images/eboard/eboardGroup.JPG',
    price: '$5 for ingredients',
  },
]

const categories = [
  { id: 'all', name: 'All Events', icon: Calendar },
  { id: 'cultural', name: 'Cultural', icon: Sparkles },
  { id: 'social', name: 'Social', icon: Users },
  { id: 'service', name: 'Community Service', icon: Star },
  { id: 'academic', name: 'Academic', icon: Clock },
]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredEvents =
    selectedCategory === 'all'
      ? events
      : events.filter((event) => event.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-cardinal via-deepRed to-cardinal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Upcoming Events</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Join us for cultural celebrations, social gatherings, and community service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      {(() => {
        const featuredEvent = events.find((e) => e.featured)
        if (!featuredEvent) return null

        return (
          <section className="py-12 px-4 bg-gradient-to-b from-gold/10 to-transparent">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
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
                  </div>
                  <div className="p-8 lg:p-12">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-cardinal">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-gray-700 mb-6 text-lg">{featuredEvent.description}</p>
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
                      <div className="flex items-center text-gray-600">
                        <Users className="w-5 h-5 mr-3 text-cardinal" />
                        <span>{featuredEvent.attendees} expected attendees</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="btn-primary">RSVP Now</button>
                      <button className="btn-outline">Learn More</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })()}

      {/* Filter Bar */}
      <section className="py-8 px-4 sticky top-20 bg-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
              <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
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
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-cardinal text-white' : 'bg-gray-100'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-cardinal text-white' : 'bg-gray-100'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid/List */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }
          >
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={viewMode === 'grid' ? '' : ''}
              >
                {viewMode === 'grid' ? (
                  <div className="card h-full flex flex-col">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            event.category === 'cultural'
                              ? 'bg-purple-600'
                              : event.category === 'social'
                                ? 'bg-blue-600'
                                : event.category === 'service'
                                  ? 'bg-green-600'
                                  : 'bg-gray-600'
                          }`}
                        >
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{event.description}</p>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gold font-semibold">{event.price}</span>
                      <button className="text-cardinal hover:text-cardinal-dark flex items-center">
                        Details <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="card flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={event.image} alt={event.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-2xl font-bold">{event.title}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                            event.category === 'cultural'
                              ? 'bg-purple-600'
                              : event.category === 'social'
                                ? 'bg-blue-600'
                                : event.category === 'service'
                                  ? 'bg-green-600'
                                  : 'bg-gray-600'
                          }`}
                        >
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {event.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {event.attendees} attending
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gold font-semibold text-lg">{event.price}</span>
                        <button className="btn-primary">RSVP Now</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
