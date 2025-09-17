'use client'

import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Swords,
  Target,
  Play,
  BookOpen,
  Gamepad2,
  Shield,
  Zap,
  Star,
} from 'lucide-react'
import Link from 'next/link'

export default function VSARoyalePage() {
  // const [selectedMode] = useState<'battle' | 'campaign' | 'puzzle' | null>(null)

  const gameModes = [
    {
      id: 'battle',
      name: 'Quick Battle',
      description: 'Battle against AI opponents',
      icon: Swords,
      color: 'bg-cardinal',
      features: ['5 difficulty levels', 'Eggroll rewards', 'Practice strategies'],
    },
    {
      id: 'campaign',
      name: 'Campaign Mode',
      description: 'Story-driven progression',
      icon: BookOpen,
      color: 'bg-gold',
      features: ['50 levels', 'Unlock new cards', 'Boss battles'],
    },
    {
      id: 'puzzle',
      name: 'Puzzle Mode',
      description: 'Solve strategic challenges',
      icon: Target,
      color: 'bg-deepRed',
      features: ['100+ puzzles', 'Learn strategies', 'Daily challenges'],
    },
  ]

  const features = [
    {
      icon: Users,
      title: 'VSA Members as Heroes',
      description: 'Play as executive board members and committee chairs with unique abilities',
    },
    {
      icon: Trophy,
      title: 'Competitive Gameplay',
      description: 'Climb the leaderboards and compete in weekly tournaments',
    },
    {
      icon: Zap,
      title: 'Fast-Paced Battles',
      description: '3-minute matches with sudden death overtime',
    },
    {
      icon: Shield,
      title: 'Strategic Depth',
      description: 'Build decks, manage resources, and outsmart opponents',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-cardinal-gold opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-cardinal-gold rounded-full flex items-center justify-center">
                <Gamepad2 className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              VSA <span className="gradient-text">Royale</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              The ultimate tower defense battle arena featuring ISU VSA members
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vsa-royale/play" className="btn-primary">
                <Play className="w-5 h-5 inline mr-2" />
                Play Now
              </Link>
              <Link href="/vsa-royale/tutorial" className="btn-secondary">
                How to Play
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="py-16 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Game Modes</h2>
            <p className="text-xl text-gray-300">Choose your battle style</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameModes.map((mode, index) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 hover:border-gold transition-all cursor-pointer transform hover:scale-105"
                // onClick={() => console.log('Selected mode:', mode.id)}
              >
                <div
                  className={`w-16 h-16 ${mode.color} rounded-full flex items-center justify-center mb-4`}
                >
                  <mode.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{mode.name}</h3>
                <p className="text-gray-400 mb-4">{mode.description}</p>
                <ul className="space-y-2">
                  {mode.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <Star className="w-4 h-4 text-gold mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Game Features</h2>
            <p className="text-xl text-gray-300">What makes VSA Royale special</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-cardinal-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Top Players</h2>
            <p className="text-xl text-gray-300">This week&apos;s champions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/80 rounded-xl p-6 border border-gray-800"
          >
            <div className="space-y-4">
              {[
                { rank: 1, name: 'CycloneMaster', wins: 47, trophies: 2847 },
                { rank: 2, name: 'VSAChampion', wins: 42, trophies: 2734 },
                { rank: 3, name: 'EggrollKing', wins: 39, trophies: 2698 },
                { rank: 4, name: 'TetWarrior', wins: 36, trophies: 2612 },
                { rank: 5, name: 'PhoFighter', wins: 35, trophies: 2589 },
              ].map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1
                          ? 'bg-gold text-charcoal'
                          : player.rank === 2
                            ? 'bg-gray-300 text-charcoal'
                            : player.rank === 3
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-700 text-white'
                      }`}
                    >
                      {player.rank}
                    </div>
                    <div>
                      <p className="font-semibold">{player.name}</p>
                      <p className="text-sm text-gray-400">{player.wins} wins this week</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-gold" />
                    <span className="font-bold text-gold">{player.trophies}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/vsa-royale/leaderboard"
                className="text-gold hover:text-gold-light transition-colors"
              >
                View Full Leaderboard →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Battle?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the VSA Royale arena and prove your strategic skills
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vsa-royale/play" className="btn-primary">
                Start Playing
              </Link>
              <Link
                href="/vsa-royale/deck-builder"
                className="btn-outline border-gold text-gold hover:bg-gold hover:text-charcoal"
              >
                Build Your Deck
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
