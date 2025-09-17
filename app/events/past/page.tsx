'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  Users,
  Star,
  Filter,
  Heart,
  Image as ImageIcon,
  Video,
  Download,
} from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function PastEventsPage() {
  const [selectedYear, setSelectedYear] = useState('2024')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const pastEvents = [
    {
      id: 1,
      title: 'Tết Festival 2024',
      date: '2024-02-10',
      time: '6:00 PM - 10:00 PM',
      location: 'Memorial Union Great Hall',
      category: 'cultural',
      year: '2024',
      description:
        'Our biggest celebration of the year with over 400 attendees, featuring traditional lion dances, authentic Vietnamese cuisine, and cultural performances.',
      attendees: 420,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Lion Dance Performance',
        'Traditional Music',
        'Vietnamese Cuisine',
        'Cultural Exhibits',
      ],
      photos: 45,
      videos: 3,
      testimonials: [
        { name: 'Sarah Chen', text: 'Amazing celebration! Felt like home.' },
        {
          name: 'Michael Nguyen',
          text: 'The food was incredible and the performances were beautiful.',
        },
      ],
    },
    {
      id: 2,
      title: 'Fall Cultural Show',
      date: '2024-11-15',
      time: '7:00 PM - 9:30 PM',
      location: 'Stephens Auditorium',
      category: 'cultural',
      year: '2024',
      description:
        'A spectacular showcase of Vietnamese and Asian culture with dance performances, musical acts, and traditional fashion show.',
      attendees: 280,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Traditional Dances',
        'Fashion Show',
        'Musical Performances',
        'Cultural Stories',
      ],
      photos: 62,
      videos: 5,
      testimonials: [
        { name: 'Emma Liu', text: 'The traditional dances were breathtaking!' },
        { name: 'David Tran', text: 'Proud to see our culture represented so beautifully.' },
      ],
    },
    {
      id: 3,
      title: 'Mid-Autumn Festival',
      date: '2024-09-21',
      time: '4:00 PM - 8:00 PM',
      location: 'Memorial Union Oak Room',
      category: 'cultural',
      year: '2024',
      description:
        'Celebrated the harvest moon with mooncake making, lantern crafting, and storytelling for families and students.',
      attendees: 95,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Mooncake Making',
        'Lantern Crafting',
        'Traditional Stories',
        'Family Activities',
      ],
      photos: 28,
      videos: 2,
      testimonials: [
        { name: 'Jennifer Park', text: 'Making mooncakes was so much fun!' },
        { name: 'Kevin Do', text: 'Great way to learn about traditions.' },
      ],
    },
    {
      id: 4,
      title: 'Phở Cook-off Competition',
      date: '2024-03-16',
      time: '2:00 PM - 6:00 PM',
      location: 'Student Innovation Center',
      category: 'culinary',
      year: '2024',
      description:
        'Teams competed to create the best phở while sharing cooking techniques and family recipes.',
      attendees: 60,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: ['Cooking Competition', 'Recipe Sharing', 'Taste Testing', 'Prizes'],
      photos: 35,
      videos: 4,
      testimonials: [
        { name: 'Lisa Vo', text: 'Learned so many new cooking techniques!' },
        { name: 'James Kim', text: 'The competition was intense but fun!' },
      ],
    },
    {
      id: 5,
      title: 'VSA Royale Championship',
      date: '2024-10-05',
      time: '7:00 PM - 11:00 PM',
      location: 'Parks Library',
      category: 'gaming',
      year: '2024',
      description:
        'Our inaugural tournament for VSA Royale attracted gamers from across the Midwest with $500 in prizes.',
      attendees: 75,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: ['Tournament Brackets', '$500 Prize Pool', 'Live Streaming', 'Gaming Community'],
      photos: 22,
      videos: 6,
      testimonials: [
        { name: 'Alex Chen', text: 'The gaming setup was professional quality!' },
        { name: 'Maria Santos', text: 'Great atmosphere, even for non-gamers.' },
      ],
    },
    {
      id: 6,
      title: 'Spring Break Community Service',
      date: '2024-03-09',
      time: '9:00 AM - 4:00 PM',
      location: 'Food Bank of Iowa',
      category: 'service',
      year: '2024',
      description:
        'Members volunteered during spring break to help pack and distribute food to families in need.',
      attendees: 35,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: ['Community Service', 'Food Distribution', 'Team Building', 'Social Impact'],
      photos: 18,
      videos: 1,
      testimonials: [
        { name: 'Rachel Nguyen', text: 'Meaningful way to spend spring break.' },
        { name: 'Tommy Le', text: 'Felt good giving back to the community.' },
      ],
    },
    // 2023 Events
    {
      id: 7,
      title: 'Tết Festival 2023',
      date: '2023-01-28',
      time: '6:00 PM - 10:00 PM',
      location: 'Memorial Union Great Hall',
      category: 'cultural',
      year: '2023',
      description:
        'Welcomed the Year of the Rabbit with traditional celebrations and over 380 community members.',
      attendees: 380,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Dragon Dance',
        'Traditional Games',
        'Vietnamese Cuisine',
        'Red Envelope Ceremony',
      ],
      photos: 53,
      videos: 4,
      testimonials: [
        { name: 'Diana Wong', text: 'Felt the warmth of Vietnamese community.' },
        { name: 'Steven Pham', text: 'The dragon dance was incredible!' },
      ],
    },
    {
      id: 8,
      title: 'Vietnamese Heritage Month',
      date: '2023-04-22',
      time: '1:00 PM - 5:00 PM',
      location: 'Memorial Union South Ballroom',
      category: 'educational',
      year: '2023',
      description:
        'Educational exhibits, guest speakers, and cultural workshops celebrating Vietnamese heritage and history.',
      attendees: 150,
      image: '/images/eboard/eboardGroup.JPG',
      highlights: [
        'Educational Exhibits',
        'Guest Speakers',
        'Cultural Workshops',
        'Historical Displays',
      ],
      photos: 31,
      videos: 3,
      testimonials: [
        { name: 'Grace Tran', text: 'Learned so much about our history.' },
        { name: 'Ben Hoang', text: 'Important cultural education for everyone.' },
      ],
    },
  ]

  const years = ['2024', '2023', '2022', '2021']
  const categories = [
    { id: 'all', name: 'All Events', icon: Calendar },
    { id: 'cultural', name: 'Cultural', icon: Star },
    { id: 'culinary', name: 'Culinary', icon: Heart },
    { id: 'educational', name: 'Educational', icon: Users },
    { id: 'gaming', name: 'Gaming', icon: Users },
    { id: 'service', name: 'Service', icon: Heart },
  ]

  const filteredEvents = pastEvents.filter((event) => {
    const yearMatch = selectedYear === 'all' || event.year === selectedYear
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory
    return yearMatch && categoryMatch
  })

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
      case 'service':
        return 'from-pink-500 to-pink-700'
      default:
        return 'from-gray-500 to-gray-700'
    }
  }

  const totalAttendees = pastEvents.reduce((sum, event) => sum + event.attendees, 0)
  const totalPhotos = pastEvents.reduce((sum, event) => sum + event.photos, 0)
  const totalVideos = pastEvents.reduce((sum, event) => sum + event.videos, 0)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Past Events</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Celebrating our community&apos;s memories and achievements through the years
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gold/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-cardinal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-cardinal">{pastEvents.length}</h3>
                <p className="text-gray-600">Total Events</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-charcoal" />
                </div>
                <h3 className="text-3xl font-bold text-gold">{totalAttendees.toLocaleString()}</h3>
                <p className="text-gray-600">Total Attendees</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-purple-600">{totalPhotos}</h3>
                <p className="text-gray-600">Photos Captured</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600">{totalVideos}</h3>
                <p className="text-gray-600">Videos Created</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 sticky top-20 bg-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* Year Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Year:</span>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-cardinal text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-600 flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-gold text-charcoal'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="w-4 h-4 inline mr-2" />
                  {category.name}
                </button>
              ))}
            </div>
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
                        {event.year}
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex space-x-1">
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <ImageIcon className="w-3 h-3 mr-1" />
                        {event.photos}
                      </span>
                      <span className="bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Video className="w-3 h-3 mr-1" />
                        {event.videos}
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
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-cardinal" />
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-cardinal" />
                      {event.attendees} attendees
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

                  {/* Testimonial */}
                  {event.testimonials.length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg mb-4">
                      <p className="text-sm italic text-gray-600">
                        &quot;{event.testimonials[0].text}&quot;
                      </p>
                      <p className="text-xs text-gray-500 mt-1">- {event.testimonials[0].name}</p>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <ImageIcon className="w-3 h-3 mr-1" />
                        Photos
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 transition-colors flex items-center"
                      >
                        <Video className="w-3 h-3 mr-1" />
                        Videos
                      </motion.button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Event Archive</h2>
            <p className="section-subtitle mb-8">
              Access photos, videos, and memories from all our past events
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Media Archive
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                View All Photos
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
