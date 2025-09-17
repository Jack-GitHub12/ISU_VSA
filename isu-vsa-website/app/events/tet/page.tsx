'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Gift,
  Music,
  Utensils,
  Camera,
  Heart,
} from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function TetPage() {
  const tetActivities = [
    {
      icon: Music,
      title: 'Traditional Performances',
      description:
        'Lion and dragon dances, Vietnamese folk music, and traditional instrument performances',
      time: '7:00 PM - 8:30 PM',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: Utensils,
      title: 'Authentic Vietnamese Cuisine',
      description:
        'Traditional Tết dishes including bánh chưng, nem rán, and special holiday sweets',
      time: '6:00 PM - 10:00 PM',
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: Gift,
      title: 'Lucky Money Ceremony',
      description: 'Traditional lì xì giving ceremony and New Year blessings exchange',
      time: '8:30 PM - 9:00 PM',
      color: 'from-gold to-yellow-600',
    },
    {
      icon: Star,
      title: 'Cultural Exhibits',
      description: 'Learn about Vietnamese New Year traditions, customs, and their meanings',
      time: '6:00 PM - 10:00 PM',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: Camera,
      title: 'Photo Opportunities',
      description: 'Traditional áo dài photo booth and Vietnamese New Year decorations',
      time: '6:00 PM - 10:00 PM',
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: Users,
      title: 'Community Gathering',
      description: 'Connect with Vietnamese families and learn about Tết traditions together',
      time: '6:00 PM - 10:00 PM',
      color: 'from-blue-500 to-blue-700',
    },
  ]

  const tetHistory = [
    {
      year: 'Origins',
      title: 'Ancient Traditions',
      description:
        'Tết Nguyên Đán, marking the first day of spring and the Vietnamese New Year, has been celebrated for over 4,000 years.',
    },
    {
      year: 'Customs',
      title: 'Sacred Rituals',
      description:
        'Families honor ancestors, clean homes for good luck, and prepare special foods to welcome prosperity.',
    },
    {
      year: 'Modern',
      title: 'Global Celebration',
      description:
        'Vietnamese communities worldwide maintain these cherished traditions while adapting to new environments.',
    },
  ]

  const traditionalFoods = [
    {
      name: 'Bánh Chưng',
      description: 'Square sticky rice cake symbolizing the earth, wrapped in banana leaves',
      significance: 'Represents gratitude to ancestors and connection to homeland',
    },
    {
      name: 'Nem Rán',
      description: 'Crispy spring rolls filled with pork, vegetables, and glass noodles',
      significance: 'Golden color symbolizes prosperity and wealth',
    },
    {
      name: 'Thịt Kho Nước Dừa',
      description: 'Braised pork belly in coconut water, a traditional Tết dish',
      significance: 'Rich flavors represent abundance and family unity',
    },
    {
      name: 'Bánh Tét',
      description: 'Cylindrical sticky rice cake from southern Vietnam',
      significance: 'Round shape symbolizes reunion and completeness',
    },
    {
      name: 'Mut Tet',
      description: 'Candied fruits and seeds served during New Year visits',
      significance: 'Sweetness wishes for a sweet and happy new year',
    },
    {
      name: 'Hoa Mai & Hoa Đào',
      description: 'Yellow apricot and pink peach blossoms for decoration',
      significance: 'Flowers represent renewal, hope, and new beginnings',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-red-600 via-gold to-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimatedSection direction="up" className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="mb-6"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4">Tết Festival</h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-gold">Xuân Ất Tỵ 2025</h2>
            </motion.div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Join us for Iowa State&apos;s grandest celebration of Vietnamese New Year
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                RSVP for Tết 2025
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
              >
                Learn About Tết
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <h2 className="section-title">Tết Festival 2025</h2>
              <p className="text-lg text-gray-700 mb-6">
                Celebrate the Year of the Snake with Iowa State&apos;s largest Vietnamese cultural
                celebration. Experience authentic traditions, delicious food, and vibrant
                performances that bring our community together.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-700">
                  <Calendar className="w-6 h-6 mr-4 text-red-600" />
                  <div>
                    <span className="font-semibold">Saturday, February 8, 2025</span>
                    <p className="text-sm text-gray-500">First Saturday of Lunar New Year</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-6 h-6 mr-4 text-red-600" />
                  <div>
                    <span className="font-semibold">6:00 PM - 10:00 PM</span>
                    <p className="text-sm text-gray-500">Doors open at 5:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-6 h-6 mr-4 text-red-600" />
                  <div>
                    <span className="font-semibold">Memorial Union Great Hall</span>
                    <p className="text-sm text-gray-500">Iowa State University</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-6 h-6 mr-4 text-red-600" />
                  <div>
                    <span className="font-semibold">400+ Expected Attendees</span>
                    <p className="text-sm text-gray-500">Open to all community members</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-gold/10 p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">Ticket Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Students</span>
                    <span className="font-semibold">$10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>General Admission</span>
                    <span className="font-semibold">$15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Children (under 12)</span>
                    <span className="font-semibold">$5</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-3">
                    * Includes dinner, entertainment, and cultural activities
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/eboard/eboardGroup.JPG"
                  alt="Tết Festival celebration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Experience Authentic Tết</h3>
                  <p className="text-sm opacity-90">
                    Traditional lion dances, Vietnamese cuisine, and cultural performances
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Festival Activities</h2>
            <p className="section-subtitle">Immerse yourself in Vietnamese New Year traditions</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tetActivities.map((activity, index) => (
              <AnimatedSection key={activity.title} direction="up" delay={index * 0.1}>
                <div className="card h-full text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                  >
                    <activity.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="bg-gray-100 px-3 py-1 rounded-full inline-block">
                    <span className="text-sm font-medium text-gray-700">{activity.time}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Tết History & Significance */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Understanding Tết</h2>
            <p className="section-subtitle">The history and significance of Vietnamese New Year</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {tetHistory.map((period, index) => (
              <AnimatedSection key={period.year} direction="up" delay={index * 0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">{period.year}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{period.title}</h3>
                  <p className="text-gray-600">{period.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection direction="up">
            <div className="bg-gradient-to-r from-red-50 to-gold/10 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-center mb-6">Tết Traditions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold mb-3">Before Tết</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Clean and decorate homes</li>
                    <li>• Prepare traditional foods</li>
                    <li>• Pay off debts and resolve conflicts</li>
                    <li>• Buy new clothes and flowers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">During Tết</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Visit family and friends</li>
                    <li>• Give lì xì (lucky money)</li>
                    <li>• Make wishes for the new year</li>
                    <li>• Enjoy traditional games and food</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Traditional Foods */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-gold/20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Traditional Tết Foods</h2>
            <p className="section-subtitle">Taste the flavors of Vietnamese New Year</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {traditionalFoods.map((food, index) => (
              <AnimatedSection key={food.name} direction="up" delay={index * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-bold mb-2 text-red-700">{food.name}</h3>
                  <p className="text-gray-700 mb-3">{food.description}</p>
                  <div className="bg-gold/20 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">{food.significance}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Tết Celebration</h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Be part of Iowa State&apos;s most vibrant cultural celebration and welcome the Year of
              the Snake with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                RSVP Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
              >
                Volunteer at Tết
              </motion.button>
            </div>
            <p className="text-sm mt-4 opacity-90">
              RSVP deadline: February 5, 2025 | Questions? Contact us at tet@isuvsa.org
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
