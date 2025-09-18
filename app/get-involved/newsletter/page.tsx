'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Bell, Users, Calendar, Star, CheckCircle, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function NewsletterPage() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const features = [
    {
      icon: Calendar,
      title: 'Event Updates',
      description: 'Get early access to event announcements and RSVP links',
    },
    {
      icon: Users,
      title: 'Member Highlights',
      description: 'Read about member achievements and success stories',
    },
    {
      icon: Star,
      title: 'Cultural Content',
      description: 'Learn about Vietnamese traditions, recipes, and history',
    },
    {
      icon: Bell,
      title: 'Opportunities',
      description: 'Be first to know about scholarships, jobs, and volunteer opportunities',
    },
  ]

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    setIsSubscribed(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Newsletter</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Stay connected with VSA news, events, and opportunities delivered to your inbox
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Subscribe to VSA Updates</h2>
            <p className="section-subtitle">
              Join 500+ members staying informed about VSA activities
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up">
            <div className="card max-w-2xl mx-auto">
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@iastate.edu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" id="terms" className="mt-1 mr-3" required />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to receive newsletters and updates from ISU VSA. You can unsubscribe
                      at any time.
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary w-full inline-flex items-center justify-center"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Subscribe to Newsletter
                  </motion.button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Welcome to the VSA Family!</h3>
                  <p className="text-gray-600 mb-6">
                    You&apos;ve successfully subscribed to our newsletter. Check your email for a
                    confirmation message.
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-cardinal hover:text-cardinal-dark font-semibold"
                  >
                    Subscribe another email
                  </button>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">What You&apos;ll Get</h2>
            <p className="section-subtitle">Stay informed with our monthly newsletter content</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} direction="up" delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Newsletter */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Latest Newsletter</h2>
            <p className="section-subtitle">Preview of our January 2025 edition</p>
          </AnimatedSection>

          <AnimatedSection direction="up">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-cardinal-gold text-white p-6">
                <h3 className="text-2xl font-bold">VSA Monthly - January 2025</h3>
                <p className="text-gold-light">Celebrating Tết and New Beginnings</p>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-cardinal mb-2">🎉 Upcoming Events</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Tết Festival 2025 - February 8th at Memorial Union</li>
                    <li>• Phở Night Cooking Class - January 22nd</li>
                    <li>• VSA Royale Tournament - January 29th</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-cardinal mb-2">⭐ Member Spotlight</h4>
                  <p className="text-gray-700">
                    Congratulations to Sarah Nguyen for landing her internship at Google! Read about
                    her journey and tips for fellow students.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-cardinal mb-2">🍜 Recipe of the Month</h4>
                  <p className="text-gray-700">
                    Learn to make traditional Bánh Chưng for Tết with our step-by-step guide.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-cardinal mb-2">💼 Opportunities</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Vietnamese Cultural Heritage Scholarship - Deadline: February 15</li>
                    <li>• Summer internship at Vietnamese Embassy</li>
                    <li>• Volunteer opportunities at local food bank</li>
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Don&apos;t Miss Out!</h2>
            <p className="section-subtitle mb-8">
              Join hundreds of VSA members who stay connected through our newsletter
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              Subscribe Now
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
