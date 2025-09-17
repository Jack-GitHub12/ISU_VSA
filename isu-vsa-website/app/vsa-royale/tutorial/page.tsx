'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  ChevronLeft,
  ChevronRight,
  Target,
  Shield,
  Zap,
  Trophy,
  Users,
  Star,
} from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      title: 'Welcome to VSA Royale',
      description:
        'VSA Royale is a strategic tower defense game where you build and defend your base while attacking your opponent.',
      image: '/images/dong/dongKawaii.JPG',
      tips: [
        'Each game lasts 5-10 minutes',
        'Strategy is more important than speed',
        'Practice makes perfect!',
      ],
    },
    {
      title: 'Understanding Cards',
      description:
        'There are four main types of cards: Towers (defense), Units (attack), Spells (special effects), and Support (boosts).',
      image: '/images/dong/dongKawaii.JPG',
      tips: [
        'Each card has an energy cost',
        'Balance your deck with different types',
        'Consider card synergies',
      ],
    },
    {
      title: 'Building Your Defense',
      description: 'Place towers strategically to defend your base from incoming enemy units.',
      image: '/images/dong/dongKawaii.JPG',
      tips: [
        'Cover all possible paths',
        'Upgrade towers when possible',
        'Use terrain to your advantage',
      ],
    },
    {
      title: 'Attacking Your Opponent',
      description: 'Deploy units to attack the enemy base while managing your energy resources.',
      image: '/images/dong/dongKawaii.JPG',
      tips: [
        'Time your attacks carefully',
        'Combine different unit types',
        'Watch your energy meter',
      ],
    },
    {
      title: 'Advanced Strategies',
      description:
        'Master spell timing, resource management, and reading your opponent to achieve victory.',
      image: '/images/dong/dongKawaii.JPG',
      tips: [
        'Save spells for key moments',
        'Adapt to opponent strategy',
        'Practice different deck types',
      ],
    },
  ]

  const gameFeatures = [
    {
      icon: Target,
      title: 'Strategic Gameplay',
      description: 'Plan your moves and outsmart opponents with tactical thinking',
    },
    {
      icon: Shield,
      title: 'Defense Building',
      description: 'Construct powerful towers and barriers to protect your base',
    },
    {
      icon: Zap,
      title: 'Spell Casting',
      description: 'Use magical spells to turn the tide of battle',
    },
    {
      icon: Trophy,
      title: 'Competitive Ranking',
      description: 'Climb the leaderboards and earn prestigious titles',
    },
    {
      icon: Users,
      title: 'Multiplayer Battles',
      description: 'Challenge friends or find opponents in ranked matches',
    },
    {
      icon: Star,
      title: 'Regular Updates',
      description: 'New cards, features, and events added regularly',
    },
  ]

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">VSA Royale Tutorial</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8">
              Master the art of strategic combat and become a VSA Royale champion
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cardinal px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Tutorial
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Tutorial */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-8">
            <h2 className="section-title">Interactive Tutorial</h2>
            <p className="text-gray-600">
              Step {currentStep + 1} of {tutorialSteps.length}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="up">
            <div className="card">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tutorial Content */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-cardinal">
                    {tutorialSteps[currentStep].title}
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg">
                    {tutorialSteps[currentStep].description}
                  </p>

                  <div className="bg-gold/10 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">💡 Pro Tips:</h4>
                    <ul className="space-y-2">
                      {tutorialSteps[currentStep].tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-4 h-4 text-gold mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        currentStep === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </button>

                    <div className="flex space-x-2">
                      {tutorialSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentStep ? 'bg-cardinal' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextStep}
                      disabled={currentStep === tutorialSteps.length - 1}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        currentStep === tutorialSteps.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-cardinal text-white hover:bg-cardinal-dark'
                      }`}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                {/* Tutorial Visual */}
                <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Tutorial Video Preview</p>
                      <p className="text-sm text-gray-400">{tutorialSteps[currentStep].title}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Game Features */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Game Features</h2>
            <p className="section-subtitle">
              Discover what makes VSA Royale exciting and challenging
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameFeatures.map((feature, index) => (
              <AnimatedSection key={feature.title} direction="up" delay={index * 0.1}>
                <div className="card text-center h-full">
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

      {/* Quick Start Guide */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Quick Start Guide</h2>
            <p className="section-subtitle">Get into your first game in minutes</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Create Account',
                description: 'Sign up with your ISU email to get started',
                color: 'bg-blue-600',
              },
              {
                step: '2',
                title: 'Complete Tutorial',
                description: 'Learn the basics with our interactive guide',
                color: 'bg-green-600',
              },
              {
                step: '3',
                title: 'Build Your Deck',
                description: 'Choose cards that match your strategy',
                color: 'bg-purple-600',
              },
              {
                step: '4',
                title: 'Enter Battle',
                description: 'Find an opponent and start playing!',
                color: 'bg-cardinal',
              },
            ].map((step, index) => (
              <AnimatedSection key={step.step} direction="up" delay={index * 0.1}>
                <div className="text-center">
                  <div
                    className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white font-bold text-xl">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Mode */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="section-title">Practice Mode</h2>
              <p className="text-lg text-gray-700 mb-6">
                Perfect your skills against AI opponents before jumping into ranked matches.
                Practice mode lets you experiment with different strategies without affecting your
                rank.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Target className="w-6 h-6 text-cardinal mr-3" />
                  <span>Multiple AI difficulty levels</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-cardinal mr-3" />
                  <span>No rank changes in practice mode</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-cardinal mr-3" />
                  <span>Perfect for testing new decks</span>
                </div>
              </div>

              <button className="btn-primary">Start Practice Game</button>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">Practice Statistics</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">Easy AI</div>
                    <div className="text-sm text-gray-600">Perfect for beginners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">Medium AI</div>
                    <div className="text-sm text-gray-600">Good for strategy testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">Hard AI</div>
                    <div className="text-sm text-gray-600">Challenging practice</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">Expert AI</div>
                    <div className="text-sm text-gray-600">Ultimate challenge</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Play?</h2>
            <p className="section-subtitle mb-8">
              Join the VSA Royale community and start your journey to becoming a champion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Shield className="w-5 h-5 mr-2" />
                Build Your Deck
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
