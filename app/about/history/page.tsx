'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, Users, Award, Star, Clock, Milestone, TrendingUp, Heart } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function HistoryPage() {
  const timelineEvents = [
    {
      year: '1985',
      title: 'Foundation',
      description:
        'ISU VSA was established by a group of Vietnamese students seeking to create a home away from home.',
      icon: Star,
      color: 'from-cardinal to-red-600',
    },
    {
      year: '1990',
      title: 'First Cultural Show',
      description:
        'Organized our first major cultural performance, introducing Vietnamese arts to the ISU community.',
      icon: Award,
      color: 'from-purple-500 to-purple-700',
    },
    {
      year: '1995',
      title: 'Community Outreach',
      description:
        'Expanded beyond campus to serve the broader Ames Vietnamese community and local charities.',
      icon: Heart,
      color: 'from-blue-500 to-blue-700',
    },
    {
      year: '2000',
      title: 'Scholarship Program',
      description:
        'Launched our first scholarship fund to support Vietnamese students pursuing higher education.',
      icon: TrendingUp,
      color: 'from-green-500 to-green-700',
    },
    {
      year: '2005',
      title: 'Regional Recognition',
      description:
        'Became a founding member of the Midwest Vietnamese Student Association network.',
      icon: Users,
      color: 'from-gold to-yellow-600',
    },
    {
      year: '2010',
      title: 'Digital Innovation',
      description:
        'Embraced digital platforms to connect Vietnamese students across generations and locations.',
      icon: Milestone,
      color: 'from-indigo-500 to-indigo-700',
    },
    {
      year: '2015',
      title: 'Cultural Center',
      description:
        'Established permanent space in the Memorial Union for Vietnamese cultural activities.',
      icon: Calendar,
      color: 'from-teal-500 to-teal-700',
    },
    {
      year: '2020',
      title: 'Virtual Adaptation',
      description:
        'Successfully adapted all programs to virtual formats during the pandemic, maintaining community connection.',
      icon: Clock,
      color: 'from-orange-500 to-orange-700',
    },
    {
      year: '2025',
      title: 'Today & Beyond',
      description:
        'Celebrating 40 years of community, culture, and excellence at Iowa State University.',
      icon: Star,
      color: 'from-cardinal to-gold',
    },
  ]

  const achievements = [
    {
      number: '40+',
      label: 'Years of Service',
      description: 'Serving the ISU and Ames community since 1985',
    },
    {
      number: '500+',
      label: 'Alumni Network',
      description: 'Graduates making impact worldwide',
    },
    {
      number: '50+',
      label: 'Annual Events',
      description: 'Cultural, social, and educational programs',
    },
    {
      number: '$25K+',
      label: 'Scholarships Awarded',
      description: 'Supporting student academic success',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our History</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Four decades of building community, preserving culture, and empowering Vietnamese
              students at Iowa State
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="section-title">Our Founding Story</h2>
              <div className="space-y-6 text-gray-700">
                <p className="text-lg leading-relaxed">
                  In 1985, a small group of Vietnamese students at Iowa State University recognized
                  the need for a community that would celebrate their heritage while supporting
                  their academic journey in America.
                </p>
                <p className="text-lg leading-relaxed">
                  These pioneering students, many of whom were first-generation immigrants or
                  children of Vietnamese refugees, understood the importance of maintaining cultural
                  connections while pursuing the American dream of higher education.
                </p>
                <p className="text-lg leading-relaxed">
                  What started as informal gatherings in dorm rooms has grown into one of Iowa
                  State&apos;s most active and respected cultural organizations, serving as a bridge
                  between Vietnamese traditions and American academic excellence.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/eboard/eboardGroup.JPG"
                  alt="Founding members of ISU VSA in 1985"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 text-white p-4 rounded-lg">
                    <p className="text-sm">Founding members of ISU VSA, 1985</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="section-title">Our Journey Through the Years</h2>
            <p className="section-subtitle">Milestones that shaped who we are today</p>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cardinal to-gold hidden md:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <AnimatedSection
                  key={event.year}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={index * 0.1}
                >
                  <div
                    className={`flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col md:gap-8 gap-4`}
                  >
                    {/* Content */}
                    <div
                      className={`md:w-1/2 ${
                        index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                      } text-center`}
                    >
                      <div className="card">
                        <div className="flex items-center justify-center mb-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-lg`}
                          >
                            <event.icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-cardinal mb-2">{event.year}</h3>
                        <h4 className="text-xl font-semibold mb-3">{event.title}</h4>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10 md:block hidden">
                      <div className="w-6 h-6 bg-white border-4 border-cardinal rounded-full shadow-lg"></div>
                    </div>

                    {/* Spacer */}
                    <div className="md:w-1/2 hidden md:block"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">By the Numbers</h2>
            <p className="section-subtitle">Our impact over four decades</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <AnimatedSection key={achievement.label} direction="up" delay={index * 0.1}>
                <div className="text-center">
                  <div className="bg-gradient-cardinal-gold text-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold">{achievement.number}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{achievement.label}</h3>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Legacy */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Our Legacy</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                For forty years, ISU VSA has been more than just a student organization. We&apos;ve
                been a family, a cultural beacon, and a launching pad for future leaders.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our alumni have gone on to become doctors, engineers, entrepreneurs, teachers, and
                community leaders, carrying with them the values of excellence, community, and
                cultural pride that define our organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Meet Our Alumni
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline"
                >
                  Join Our Story
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
