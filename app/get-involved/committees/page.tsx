'use client'

import { motion } from 'framer-motion'
import { Users, Megaphone, Heart, Briefcase, Camera, DollarSign, BookOpen } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function CommitteesPage() {
  const committees = [
    {
      name: 'Cultural Committee',
      icon: BookOpen,
      description: 'Organize cultural events, workshops, and educational programs',
      responsibilities: [
        'Plan cultural celebrations',
        'Organize workshops',
        'Coordinate guest speakers',
        'Manage cultural exhibits',
      ],
      commitment: '5-8 hours/week',
      positions: ['Cultural Chair', 'Event Coordinators', 'Workshop Leaders'],
      color: 'from-purple-500 to-purple-700',
    },
    {
      name: 'Social Committee',
      icon: Users,
      description: 'Plan social events and community building activities',
      responsibilities: [
        'Organize social events',
        'Plan mixers and networking',
        'Coordinate recreational activities',
        'Build community connections',
      ],
      commitment: '4-6 hours/week',
      positions: ['Social Chair', 'Event Planners', 'Activity Coordinators'],
      color: 'from-blue-500 to-blue-700',
    },
    {
      name: 'Marketing Committee',
      icon: Megaphone,
      description: 'Handle publicity, social media, and community outreach',
      responsibilities: [
        'Manage social media',
        'Create promotional materials',
        'Handle publicity',
        'Coordinate outreach',
      ],
      commitment: '6-10 hours/week',
      positions: ['PR Chair', 'Social Media Manager', 'Graphic Designers', 'Content Creators'],
      color: 'from-green-500 to-green-700',
    },
    {
      name: 'Service Committee',
      icon: Heart,
      description: 'Coordinate community service and volunteer opportunities',
      responsibilities: [
        'Plan service projects',
        'Coordinate volunteering',
        'Partner with local organizations',
        'Track service hours',
      ],
      commitment: '3-5 hours/week',
      positions: ['Service Chair', 'Project Coordinators', 'Partnership Liaisons'],
      color: 'from-red-500 to-red-700',
    },
    {
      name: 'Finance Committee',
      icon: DollarSign,
      description: 'Manage budget, fundraising, and financial planning',
      responsibilities: [
        'Budget management',
        'Fundraising events',
        'Financial reporting',
        'Grant applications',
      ],
      commitment: '4-7 hours/week',
      positions: ['Treasurer', 'Fundraising Coordinators', 'Financial Analysts'],
      color: 'from-gold to-yellow-600',
    },
    {
      name: 'Media Committee',
      icon: Camera,
      description: 'Document events and create multimedia content',
      responsibilities: [
        'Event photography',
        'Video production',
        'Content creation',
        'Website maintenance',
      ],
      commitment: '5-8 hours/week',
      positions: ['Media Chair', 'Photographers', 'Video Editors', 'Web Developers'],
      color: 'from-indigo-500 to-indigo-700',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Committees</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Join a committee and help shape the future of VSA while developing valuable leadership
              skills
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Committee Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Available Committees</h2>
            <p className="section-subtitle">
              Find the perfect way to contribute your skills and interests
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {committees.map((committee, index) => (
              <AnimatedSection key={committee.name} direction="up" delay={index * 0.1}>
                <div className="card h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${committee.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <committee.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{committee.name}</h3>
                  <p className="text-gray-600 mb-4">{committee.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {committee.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-cardinal rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Time Commitment:</h4>
                    <span className="bg-gold/20 text-charcoal px-3 py-1 rounded-full text-sm">
                      {committee.commitment}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Available Positions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {committee.positions.map((position) => (
                        <span
                          key={position}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                        >
                          {position}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="btn-primary w-full mt-auto">Join Committee</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Why Join a Committee?</h2>
            <p className="section-subtitle">Develop skills and make an impact</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-cardinal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Professional Development</h3>
                <p className="text-gray-600">
                  Gain valuable experience in project management, leadership, and teamwork
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-charcoal" />
                </div>
                <h3 className="text-xl font-bold mb-3">Network Building</h3>
                <p className="text-gray-600">
                  Connect with like-minded students and build lasting professional relationships
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Make an Impact</h3>
                <p className="text-gray-600">
                  Directly contribute to events and initiatives that benefit the entire VSA
                  community
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">How to Apply</h2>
            <p className="section-subtitle">Join a committee in three simple steps</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Choose Committee</h3>
                <p className="text-gray-600">
                  Review committee descriptions and choose the one that matches your interests
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Submit Application</h3>
                <p className="text-gray-600">
                  Complete the online application form with your background and interests
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Start Contributing</h3>
                <p className="text-gray-600">
                  Attend committee meetings and begin working on exciting projects
                </p>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection direction="up" delay={0.4} className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Apply for Committee
            </motion.button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
