'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sword, Shield, Zap, Star, Plus, Minus, Save, Download, Upload } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function DeckBuilderPage() {
  // const [selectedDeck, setSelectedDeck] = useState(0)
  const [deckName, setDeckName] = useState('My Deck')

  const cardTypes = [
    { id: 'tower', name: 'Tower Cards', icon: Shield, color: 'from-blue-500 to-blue-700' },
    { id: 'spell', name: 'Spell Cards', icon: Zap, color: 'from-purple-500 to-purple-700' },
    { id: 'unit', name: 'Unit Cards', icon: Sword, color: 'from-red-500 to-red-700' },
    { id: 'support', name: 'Support Cards', icon: Star, color: 'from-green-500 to-green-700' },
  ]

  const sampleCards = [
    {
      id: 1,
      name: 'Lightning Tower',
      type: 'tower',
      cost: 3,
      rarity: 'common',
      description: 'Basic defensive tower with electrical attacks',
    },
    {
      id: 2,
      name: 'Fireball',
      type: 'spell',
      cost: 2,
      rarity: 'common',
      description: 'Deal damage to target area',
    },
    {
      id: 3,
      name: 'Guardian Spirit',
      type: 'unit',
      cost: 4,
      rarity: 'rare',
      description: 'Protective unit with high health',
    },
    {
      id: 4,
      name: 'Resource Boost',
      type: 'support',
      cost: 1,
      rarity: 'common',
      description: 'Increases resource generation',
    },
  ]

  const currentDeck = {
    name: deckName,
    cards: [
      { card: sampleCards[0], quantity: 2 },
      { card: sampleCards[1], quantity: 3 },
      { card: sampleCards[2], quantity: 1 },
      { card: sampleCards[3], quantity: 2 },
    ],
    totalCards: 8,
    maxCards: 15,
    totalCost: 18,
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-400 bg-gray-50'
      case 'rare':
        return 'border-blue-500 bg-blue-50'
      case 'epic':
        return 'border-purple-500 bg-purple-50'
      case 'legendary':
        return 'border-gold bg-gold/10'
      default:
        return 'border-gray-400 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Deck Builder</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Craft the perfect deck strategy and dominate the VSA Royale battlefield
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Deck Builder Interface */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card Collection */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <div className="card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Card Collection</h2>
                    <div className="flex space-x-2">
                      {cardTypes.map((type) => (
                        <button
                          key={type.id}
                          className="px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                          <type.icon className="w-4 h-4 inline mr-1" />
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {sampleCards.concat(sampleCards).map((card, index) => (
                      <motion.div
                        key={`${card.id}-${index}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${getRarityColor(card.rarity)} hover:shadow-lg`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-sm">{card.name}</h3>
                          <span className="bg-cardinal text-white px-2 py-1 rounded-full text-xs">
                            {card.cost}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{card.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium capitalize">{card.type}</span>
                          <span className="text-xs text-gray-500 capitalize">{card.rarity}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Current Deck */}
            <div>
              <AnimatedSection direction="right">
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Current Deck</h2>
                    <button className="text-cardinal hover:text-cardinal-dark">
                      <Save className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      value={deckName}
                      onChange={(e) => setDeckName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-transparent"
                      placeholder="Deck Name"
                    />
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        Cards: {currentDeck.totalCards}/{currentDeck.maxCards}
                      </span>
                      <span>Total Cost: {currentDeck.totalCost}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-cardinal-gold h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(currentDeck.totalCards / currentDeck.maxCards) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {currentDeck.cards.map((deckCard, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{deckCard.card.name}</h4>
                          <p className="text-xs text-gray-600">{deckCard.card.type}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="w-6 h-6 bg-cardinal text-white rounded-full flex items-center justify-center text-xs hover:bg-cardinal-dark">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">
                            {deckCard.quantity}
                          </span>
                          <button className="w-6 h-6 bg-cardinal text-white rounded-full flex items-center justify-center text-xs hover:bg-cardinal-dark">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <button className="btn-primary w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Deck
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="btn-outline text-sm">
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </button>
                      <button className="btn-outline text-sm">
                        <Upload className="w-4 h-4 mr-1" />
                        Import
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Deck Strategies */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Popular Strategies</h2>
            <p className="section-subtitle">
              Learn from top players and discover winning combinations
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Lightning Rush',
                description: 'Fast-paced strategy focusing on quick electrical attacks',
                winRate: '68%',
                difficulty: 'Easy',
                color: 'from-yellow-500 to-yellow-700',
              },
              {
                name: 'Fortress Defense',
                description: 'Build strong defensive positions and outlast opponents',
                winRate: '72%',
                difficulty: 'Medium',
                color: 'from-blue-500 to-blue-700',
              },
              {
                name: 'Spell Weaver',
                description: 'Combine powerful spells for devastating combo attacks',
                winRate: '65%',
                difficulty: 'Hard',
                color: 'from-purple-500 to-purple-700',
              },
            ].map((strategy, index) => (
              <AnimatedSection key={strategy.name} direction="up" delay={index * 0.1}>
                <div className="card text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${strategy.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{strategy.name}</h3>
                  <p className="text-gray-600 mb-4">{strategy.description}</p>
                  <div className="flex justify-between text-sm mb-4">
                    <span>
                      Win Rate: <strong>{strategy.winRate}</strong>
                    </span>
                    <span>
                      Difficulty: <strong>{strategy.difficulty}</strong>
                    </span>
                  </div>
                  <button className="btn-outline w-full text-sm">Learn Strategy</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Test Your Deck?</h2>
            <p className="section-subtitle mb-8">
              Take your carefully crafted deck into battle and climb the leaderboards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Sword className="w-5 h-5 mr-2" />
                Play Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Star className="w-5 h-5 mr-2" />
                View Leaderboard
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
