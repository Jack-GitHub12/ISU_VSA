'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Calendar, Trophy, Target, GraduationCap } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function StudyPage() {
  const studyResources = [
    {
      title: 'Study Groups',
      description: 'Join subject-specific study groups with fellow VSA members',
      icon: Users,
      features: ['Math & Engineering', 'Business & Economics', 'Science & Pre-Med', 'Liberal Arts'],
      schedule: 'Weekly sessions',
      color: 'from-blue-500 to-blue-700',
    },
    {
      title: 'Tutoring Program',
      description: 'Get one-on-one help from upperclassmen and graduate students',
      icon: GraduationCap,
      features: [
        'Free for members',
        'All subjects covered',
        'Flexible scheduling',
        'Peer mentorship',
      ],
      schedule: 'By appointment',
      color: 'from-green-500 to-green-700',
    },
    {
      title: 'Exam Prep Sessions',
      description: 'Intensive review sessions before major exams and finals',
      icon: Target,
      features: ['Finals week support', 'MCAT/GRE prep', 'Study strategies', 'Practice tests'],
      schedule: 'Before exams',
      color: 'from-purple-500 to-purple-700',
    },
    {
      title: 'Academic Workshops',
      description: 'Learn essential academic skills for college success',
      icon: BookOpen,
      features: [
        'Time management',
        'Note-taking skills',
        'Research methods',
        'Presentation skills',
      ],
      schedule: 'Monthly',
      color: 'from-orange-500 to-orange-700',
    },
  ]

  const successStories = [
    {
      name: 'Emily Chen',
      major: 'Computer Science',
      achievement: 'Improved GPA from 2.8 to 3.6 with study group support',
    },
    {
      name: 'David Nguyen',
      major: 'Pre-Med',
      achievement: 'Scored 520 on MCAT after joining exam prep sessions',
    },
    {
      name: 'Sarah Le',
      major: 'Business',
      achievement: "Made Dean's List after utilizing tutoring program",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Study Resources</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Excel academically with peer support, tutoring, and study resources designed for
              success
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Study Programs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Academic Support Programs</h2>
            <p className="section-subtitle">Choose the support that fits your academic needs</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studyResources.map((resource, index) => (
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
                    <h3 className="text-xl font-bold">{resource.title}</h3>
                  </div>

                  <p className="text-gray-600 mb-6">{resource.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">What We Offer:</h4>
                    <ul className="space-y-2">
                      {resource.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-cardinal rounded-full mr-3 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <span className="text-sm font-medium text-gray-700">Schedule: </span>
                    <span className="bg-gold/20 text-charcoal px-2 py-1 rounded text-sm">
                      {resource.schedule}
                    </span>
                  </div>

                  <button className="btn-primary w-full">Join Program</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Success Stories</h2>
            <p className="section-subtitle">
              See how our academic support has helped VSA members excel
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <AnimatedSection key={story.name} direction="up" delay={index * 0.1}>
                <div className="card text-center">
                  <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{story.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{story.major}</p>
                  <p className="text-gray-700 italic">{story.achievement}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Study Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Weekly Study Schedule</h2>
            <p className="section-subtitle">
              Join us for regular study sessions throughout the week
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-cardinal-gold text-white p-4">
                <h3 className="text-xl font-bold text-center">Study Session Schedule</h3>
              </div>

              <div className="p-6 space-y-4">
                {[
                  {
                    day: 'Monday',
                    time: '7:00 PM - 9:00 PM',
                    subject: 'Math & Engineering',
                    location: 'Parks Library 298',
                  },
                  {
                    day: 'Tuesday',
                    time: '6:00 PM - 8:00 PM',
                    subject: 'Science & Pre-Med',
                    location: 'Biorenewables 1017',
                  },
                  {
                    day: 'Wednesday',
                    time: '7:00 PM - 9:00 PM',
                    subject: 'Business & Economics',
                    location: 'Gerdin 3002',
                  },
                  {
                    day: 'Thursday',
                    time: '6:00 PM - 8:00 PM',
                    subject: 'Liberal Arts',
                    location: 'Parks Library 298',
                  },
                  {
                    day: 'Friday',
                    time: '5:00 PM - 7:00 PM',
                    subject: 'Open Study Hall',
                    location: 'Memorial Union Pioneer Room',
                  },
                ].map((session) => (
                  <div
                    key={session.day}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h4 className="font-bold text-cardinal">{session.day}</h4>
                      <p className="text-sm text-gray-600">{session.time}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{session.subject}</p>
                      <p className="text-sm text-gray-600">{session.location}</p>
                    </div>
                    <button className="btn-outline text-sm px-3 py-1">Join</button>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Excel Academically?</h2>
            <p className="section-subtitle mb-8">
              Join our academic support community and achieve your educational goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Join Study Group
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                View Schedule
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
