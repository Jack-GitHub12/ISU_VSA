'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Calendar, Star, ArrowRight, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function VolunteerPage() {
  const volunteerOpportunities = [
    {
      title: 'Event Setup & Breakdown',
      description: 'Help set up decorations, equipment, and assist with event breakdown',
      time: '2-4 hours per event',
      frequency: 'Multiple times per month',
      skills: ['Organization', 'Teamwork', 'Physical work'],
      impact: 'Ensure smooth event operations',
      icon: Calendar,
    },
    {
      title: 'Community Service Projects',
      description: 'Participate in local community service initiatives and charity drives',
      time: '3-5 hours per project',
      frequency: 'Monthly',
      skills: ['Community engagement', 'Initiative', 'Compassion'],
      impact: 'Make a difference in the Ames community',
      icon: Heart,
    },
    {
      title: 'Mentorship Program',
      description: 'Guide new students and help them integrate into the VSA community',
      time: '1-2 hours per week',
      frequency: 'Ongoing',
      skills: ['Communication', 'Leadership', 'Empathy'],
      impact: 'Help new members feel welcomed and supported',
      icon: Users,
    },
    {
      title: 'Social Media Support',
      description: 'Help create content and manage VSA social media presence',
      time: '2-3 hours per week',
      frequency: 'Ongoing',
      skills: ['Creativity', 'Social media', 'Photography'],
      impact: 'Expand VSA reach and engagement',
      icon: Star,
    },
  ]

  const benefits = [
    'Gain valuable volunteer experience',
    'Build professional network',
    'Develop leadership skills',
    'Give back to community',
    'Make lifelong friends',
    'Enhance resume',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Volunteer</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Make a difference in your community while gaining valuable experience and building
              lasting connections
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cardinal px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Start Volunteering
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Volunteer Opportunities</h2>
            <p className="section-subtitle">
              Find the perfect way to contribute your time and skills
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <AnimatedSection
                key={opportunity.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className="card h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mr-4">
                      <opportunity.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{opportunity.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-4">{opportunity.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Time Commitment:</span>
                      <span className="text-sm text-gray-600">{opportunity.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Frequency:</span>
                      <span className="text-sm text-gray-600">{opportunity.frequency}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Skills You&apos;ll Develop:</h4>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-cardinal/10 text-cardinal px-2 py-1 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gold/10 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700">
                      <strong>Impact:</strong> {opportunity.impact}
                    </p>
                  </div>

                  <button className="btn-primary w-full">Sign Up</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="section-title">Why Volunteer with VSA?</h2>
              <p className="text-lg text-gray-700 mb-6">
                Volunteering with VSA is more than just giving back – it&apos;s an opportunity to
                grow personally and professionally while making a meaningful impact.
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Volunteer Impact</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cardinal">150+</div>
                    <div className="text-sm text-gray-600">Hours Contributed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold">25+</div>
                    <div className="text-sm text-gray-600">Active Volunteers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">12</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">500+</div>
                    <div className="text-sm text-gray-600">People Helped</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">How to Get Started</h2>
            <p className="section-subtitle">Begin your volunteer journey in three simple steps</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-cardinal rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Choose Your Interest</h3>
                <p className="text-gray-600">
                  Browse volunteer opportunities and find one that matches your interests and
                  schedule
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
                  Complete the volunteer registration form and attend a brief orientation session
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-2xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Start Making Impact</h3>
                <p className="text-gray-600">
                  Begin volunteering and start making a positive difference in your community
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Make a Difference?</h2>
            <p className="section-subtitle mb-8">
              Join our volunteer community and help us create positive change
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Become a Volunteer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline"
              >
                Contact Volunteer Coordinator
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
