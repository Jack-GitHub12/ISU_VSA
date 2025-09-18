'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Mic, Video, Download, Star, Globe, MessageCircle } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function LanguagePage() {
  const resources = [
    {
      title: 'Beginner Vietnamese Course',
      description:
        'Start your Vietnamese language journey with basic pronunciation and common phrases',
      level: 'Beginner',
      duration: '8 weeks',
      format: 'In-person & Online',
      topics: ['Basic pronunciation', 'Greetings', 'Numbers', 'Family terms'],
      icon: BookOpen,
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Conversation Practice',
      description: 'Weekly conversation sessions with native speakers and advanced learners',
      level: 'All Levels',
      duration: 'Weekly',
      format: 'In-person',
      topics: [
        'Daily conversations',
        'Cultural discussions',
        'Pronunciation practice',
        'Q&A sessions',
      ],
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Vietnamese Culture & Language',
      description: 'Learn Vietnamese through cultural context and traditional stories',
      level: 'Intermediate',
      duration: '6 weeks',
      format: 'Hybrid',
      topics: ['Folk tales', 'Cultural customs', 'Historical contexts', 'Traditional songs'],
      icon: Globe,
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Language Exchange Program',
      description: 'Partner with native speakers for mutual language learning',
      level: 'All Levels',
      duration: 'Ongoing',
      format: 'Flexible',
      topics: ['Peer learning', 'Cultural exchange', 'Friendship building', 'Real-world practice'],
      icon: Users,
      color: 'from-orange-500 to-orange-700',
    },
  ]

  const tools = [
    {
      name: 'Pronunciation Guide',
      description: 'Audio examples of Vietnamese tones and pronunciation',
      type: 'Audio',
      icon: Mic,
    },
    {
      name: 'Video Lessons',
      description: 'Structured video lessons for self-paced learning',
      type: 'Video',
      icon: Video,
    },
    {
      name: 'Vocabulary Lists',
      description: 'Downloadable PDFs with common words and phrases',
      type: 'PDF',
      icon: Download,
    },
    {
      name: 'Practice Worksheets',
      description: 'Interactive exercises to test your knowledge',
      type: 'Interactive',
      icon: BookOpen,
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Learn Vietnamese</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Connect with your heritage and expand your horizons through Vietnamese language
              learning
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Language Programs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Language Programs</h2>
            <p className="section-subtitle">
              Choose the learning path that fits your goals and schedule
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map((resource, index) => (
              <AnimatedSection
                key={resource.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className="card h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${resource.color} rounded-full flex items-center justify-center mr-4`}
                    >
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{resource.title}</h3>
                      <span className="text-sm text-gray-600">{resource.level}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{resource.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Duration:</span>
                      <p className="text-sm text-gray-600">{resource.duration}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Format:</span>
                      <p className="text-sm text-gray-600">{resource.format}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">What You&apos;ll Learn:</h4>
                    <ul className="space-y-1">
                      {resource.topics.map((topic) => (
                        <li key={topic} className="flex items-center text-sm text-gray-600">
                          <Star className="w-3 h-3 text-gold mr-2 flex-shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn-primary w-full">Enroll Now</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Tools */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Learning Resources</h2>
            <p className="section-subtitle">
              Free tools to support your Vietnamese learning journey
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((tool, index) => (
              <AnimatedSection key={tool.name} direction="up" delay={index * 0.1}>
                <div className="card text-center h-full">
                  <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <tool.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{tool.name}</h3>
                  <p className="text-gray-600 mb-4 flex-grow">{tool.description}</p>
                  <span className="bg-gold/20 text-charcoal px-3 py-1 rounded-full text-sm">
                    {tool.type}
                  </span>
                  <button className="btn-outline w-full mt-4">Access Resource</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn Vietnamese */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="section-title">Why Learn Vietnamese?</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cardinal rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cultural Connection</h3>
                    <p className="text-gray-600">
                      Deepen your understanding of Vietnamese culture and connect with your heritage
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-4 h-4 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Global Opportunities</h3>
                    <p className="text-gray-600">
                      Open doors to career opportunities in Vietnam and with Vietnamese communities
                      worldwide
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Community Building</h3>
                    <p className="text-gray-600">
                      Strengthen connections with family and the Vietnamese-American community
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Cognitive Benefits</h3>
                    <p className="text-gray-600">
                      Improve memory, multitasking, and problem-solving skills through bilingualism
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-gradient-to-r from-cardinal/10 to-gold/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Learning Statistics</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cardinal">95M+</div>
                    <div className="text-sm text-gray-600">Native Speakers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold">2M+</div>
                    <div className="text-sm text-gray-600">US Vietnamese</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">6</div>
                    <div className="text-sm text-gray-600">Tone System</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">29</div>
                    <div className="text-sm text-gray-600">Letters</div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h4 className="font-semibold mb-2">Did You Know?</h4>
                  <p className="text-sm text-gray-600">
                    Vietnamese is the 6th most spoken language in the United States and is
                    increasingly valuable in business and diplomacy.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Start Learning?</h2>
            <p className="section-subtitle mb-8">
              Begin your Vietnamese language journey with our supportive community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Learning Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Join Conversation Group
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
