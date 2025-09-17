'use client'

import { motion } from 'framer-motion'
import { Heart, Users, Globe, Target, Star, ArrowRight, BookOpen, Compass } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function MissionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Mission</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Empowering Vietnamese students to excel academically while preserving and sharing our
              rich cultural heritage
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Mission Statement</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                The Iowa State University Vietnamese Student Association (ISU VSA) is dedicated to
                promoting Vietnamese culture, fostering community connections, and supporting the
                academic and personal growth of our members and the broader Iowa State community.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We strive to create an inclusive environment where students can explore their
                heritage, build lasting friendships, develop leadership skills, and contribute
                meaningfully to both the Vietnamese community and Iowa State University.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Community',
                description:
                  'Building strong bonds and supporting each other through our journey at ISU and beyond',
                color: 'from-red-500 to-cardinal',
              },
              {
                icon: Globe,
                title: 'Culture',
                description:
                  'Preserving and sharing Vietnamese traditions, language, and values with the broader community',
                color: 'from-blue-500 to-purple-600',
              },
              {
                icon: Users,
                title: 'Leadership',
                description:
                  'Developing future leaders through hands-on experience, mentorship, and personal growth',
                color: 'from-green-500 to-emerald-600',
              },
              {
                icon: Target,
                title: 'Excellence',
                description:
                  'Striving for excellence in academics, events, personal development, and community service',
                color: 'from-gold to-yellow-500',
              },
            ].map((value, index) => (
              <AnimatedSection
                key={value.title}
                direction="up"
                delay={index * 0.1}
                className="text-center"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                >
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-charcoal">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Goals & Objectives */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Goals & Objectives</h2>
            <p className="section-subtitle">What we aim to achieve as an organization</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-cardinal rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cultural Education</h3>
                    <p className="text-gray-600">
                      Educate students and the community about Vietnamese culture, history, and
                      traditions through events, workshops, and cultural celebrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Student Support</h3>
                    <p className="text-gray-600">
                      Provide academic, social, and emotional support to Vietnamese students and
                      those interested in Vietnamese culture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cardinal to-gold rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Community Service</h3>
                    <p className="text-gray-600">
                      Give back to the Ames community and beyond through volunteer work and
                      community engagement initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Compass className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Leadership Development</h3>
                    <p className="text-gray-600">
                      Cultivate leadership skills through executive positions, committee work, and
                      event organization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Cultural Bridge</h3>
                    <p className="text-gray-600">
                      Serve as a bridge between Vietnamese culture and the broader Iowa State
                      University community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lasting Connections</h3>
                    <p className="text-gray-600">
                      Create lifelong friendships and professional networks that extend beyond
                      college years.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Our Vision</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                To be the premier Vietnamese student organization at Iowa State University,
                recognized for our commitment to cultural preservation, academic excellence, and
                community impact.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We envision a future where Vietnamese culture is celebrated and understood, where
                our members become leaders in their communities, and where the bonds we create last
                a lifetime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center"
                >
                  Join Our Mission
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline inline-flex items-center"
                >
                  Learn More About Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
