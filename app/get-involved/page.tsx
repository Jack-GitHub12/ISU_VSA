'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Heart,
  Briefcase,
  Mail,
  ArrowRight,
  Star,
  Calendar,
  Award,
  BookOpen,
} from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function GetInvolvedPage() {
  const involvementOptions = [
    {
      title: 'Membership',
      description:
        'Join our community of students passionate about Vietnamese culture and academic excellence',
      icon: Users,
      link: '/get-involved/membership',
      benefits: [
        'Access to all events',
        'Leadership opportunities',
        'Networking',
        'Cultural activities',
      ],
      color: 'from-cardinal to-red-700',
      featured: true,
    },
    {
      title: 'Committees',
      description:
        'Lead specific initiatives and help shape the future of VSA through committee work',
      icon: Briefcase,
      link: '/get-involved/committees',
      benefits: ['Leadership roles', 'Event planning', 'Skill development', 'Resume building'],
      color: 'from-blue-500 to-blue-700',
      featured: false,
    },
    {
      title: 'Volunteer',
      description: 'Support our events and community service initiatives as a volunteer',
      icon: Heart,
      link: '/get-involved/volunteer',
      benefits: ['Community impact', 'Meet new people', 'Flexible commitment', 'Service hours'],
      color: 'from-green-500 to-green-700',
      featured: false,
    },
    {
      title: 'Newsletter',
      description: 'Stay connected with VSA news, events, and opportunities',
      icon: Mail,
      link: '/get-involved/newsletter',
      benefits: ['Event updates', 'Opportunities', 'Member highlights', 'Cultural content'],
      color: 'from-purple-500 to-purple-700',
      featured: false,
    },
  ]

  const whyJoin = [
    {
      icon: Star,
      title: 'Cultural Connection',
      description: 'Connect with your Vietnamese heritage and share it with others',
    },
    {
      icon: Users,
      title: 'Lifelong Friendships',
      description: 'Build meaningful relationships that extend beyond college',
    },
    {
      icon: Calendar,
      title: 'Amazing Events',
      description: 'Participate in cultural celebrations, social gatherings, and service projects',
    },
    {
      icon: Award,
      title: 'Leadership Development',
      description: 'Develop leadership skills through hands-on experience',
    },
    {
      icon: BookOpen,
      title: 'Academic Support',
      description: 'Study groups, mentorship, and academic resources',
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Make a difference in the Vietnamese and ISU communities',
    },
  ]

  // Real member testimonials will be added after collecting feedback from current members
  // Contact isuvsa@gmail.com to submit your VSA experience
  const testimonials: Array<{
    name: string
    role: string
    photo: string
    quote: string
  }> = []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get Involved</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Join a vibrant community of students celebrating Vietnamese culture and achieving
              academic excellence
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cardinal px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Join VSA Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Ways to Get Involved</h2>
            <p className="section-subtitle">Find the perfect way to contribute to our community</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {involvementOptions.map((option, index) => (
              <AnimatedSection
                key={option.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <Link href={option.link}>
                  <div
                    className={`card h-full group cursor-pointer ${option.featured ? 'ring-2 ring-cardinal' : ''}`}
                  >
                    {option.featured && (
                      <div className="bg-cardinal text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                        Most Popular
                      </div>
                    )}

                    <div className="flex items-center mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mr-4`}
                      >
                        <option.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold group-hover:text-cardinal transition-colors">
                        {option.title}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-6">{option.description}</p>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-charcoal">Benefits:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {option.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center">
                            <Star className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center text-cardinal font-semibold group-hover:text-cardinal-dark transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join VSA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Why Join VSA?</h2>
            <p className="section-subtitle">Discover the benefits of being part of our community</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyJoin.map((reason, index) => (
              <AnimatedSection key={reason.title} direction="up" delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <reason.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">What Our Members Say</h2>
            <p className="section-subtitle">Hear from students who found their home in VSA</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testimonial, index) => (
                <AnimatedSection key={testimonial.name} direction="up" delay={index * 0.2}>
                  <div className="card text-center h-full">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      <Image
                        src={testimonial.photo}
                        alt={testimonial.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <blockquote className="text-gray-700 italic mb-4 flex-grow">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>
                    <div>
                      <h4 className="font-bold text-charcoal">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-lg text-gray-600">
                  Member testimonials coming soon! Contact{' '}
                  <a href="mailto:isuvsa@gmail.com" className="text-cardinal hover:underline">
                    isuvsa@gmail.com
                  </a>{' '}
                  to share your VSA experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">How to Get Started</h2>
            <p className="section-subtitle">Join VSA in three simple steps</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-cardinal rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Attend an Event</h3>
                <p className="text-gray-600">
                  Come to any of our events to meet members and experience our community
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-charcoal font-bold text-2xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sign Up</h3>
                <p className="text-gray-600">
                  Complete our membership form and pay your annual dues
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Get Involved</h3>
                <p className="text-gray-600">
                  Join committees, volunteer, and start making a difference
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="up" delay={0.4} className="text-center mt-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Ready to Join?</h3>
              <p className="text-gray-600 mb-6">
                Start your journey with VSA today and become part of a community that will support
                you throughout your time at ISU and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Become a Member
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
