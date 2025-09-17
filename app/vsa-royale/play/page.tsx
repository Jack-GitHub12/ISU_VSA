'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Trophy, Swords, BookOpen, Target } from 'lucide-react'
import Link from 'next/link'

// Dynamically import enhanced GameCanvas to avoid SSR issues
const GameCanvasEnhanced = dynamic(() => import('@/components/vsa-royale/GameCanvasEnhanced'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-900 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gold mb-3 mx-auto" />
        <p className="text-white text-lg font-fredoka">Loading Enhanced Battle Arena...</p>
      </div>
    </div>
  ),
})

export default function PlayPage() {
  const [gameMode, setGameMode] = useState<'battle' | 'campaign' | 'puzzle' | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard' | 'expert' | 'legendary'>(
    'normal'
  )

  if (!gameMode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-charcoal to-black text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/vsa-royale"
            className="inline-flex items-center text-gold hover:text-gold-light mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to VSA Royale
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 text-center">Select Game Mode</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => setGameMode('battle')}
                className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 hover:border-gold transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-cardinal rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Swords className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Quick Battle</h2>
                <p className="text-gray-400 text-center">
                  Jump into a fast-paced battle against AI opponents
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Earn eggroll rewards
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />5 difficulty levels
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Practice strategies
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => setGameMode('campaign')}
                className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 hover:border-gold transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Campaign</h2>
                <p className="text-gray-400 text-center">Follow the VSA story across ISU campus</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    50 unique levels
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Unlock new cards
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Boss battles
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setGameMode('puzzle')}
                className="bg-gray-900/80 rounded-xl p-6 border border-gray-800 hover:border-gold transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-deepRed rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-2">Puzzle Mode</h2>
                <p className="text-gray-400 text-center">
                  Solve strategic challenges with limited resources
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    100+ puzzles
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Learn strategies
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Trophy className="w-4 h-4 text-gold mr-2" />
                    Daily challenges
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Difficulty Selector for Battle Mode */}
            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Select Difficulty</h3>
              <div className="flex justify-center space-x-4">
                {['easy', 'normal', 'hard', 'expert', 'legendary'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff as typeof difficulty)}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      difficulty === diff
                        ? 'bg-gradient-cardinal-gold text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-charcoal to-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => setGameMode(null)}
            className="inline-flex items-center text-gold hover:text-gold-light"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Change Mode
          </button>
          <h1 className="text-2xl font-bold">
            {gameMode === 'battle' && 'Quick Battle'}
            {gameMode === 'campaign' && 'Campaign Mode'}
            {gameMode === 'puzzle' && 'Puzzle Mode'}
          </h1>
          <div className="text-gold">
            Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </div>
        </div>

        <GameCanvasEnhanced
          mode={gameMode}
          difficulty={difficulty}
        />
      </div>
    </div>
  )
}
