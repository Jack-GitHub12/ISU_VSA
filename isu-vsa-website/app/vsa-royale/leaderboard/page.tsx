'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Medal, Crown, Gamepad2, TrendingUp, Calendar, Users } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time')

  const leaderboardData = {
    'all-time': [
      {
        rank: 1,
        username: 'DragonSlayer99',
        score: 12450,
        wins: 89,
        gamesPlayed: 156,
        winRate: 57.1,
        level: 25,
      },
      {
        rank: 2,
        username: 'VietWarrior',
        score: 11890,
        wins: 82,
        gamesPlayed: 145,
        winRate: 56.6,
        level: 24,
      },
      {
        rank: 3,
        username: 'TowerMaster',
        score: 11230,
        wins: 76,
        gamesPlayed: 134,
        winRate: 56.7,
        level: 23,
      },
      {
        rank: 4,
        username: 'PhoenixRising',
        score: 10850,
        wins: 71,
        gamesPlayed: 128,
        winRate: 55.5,
        level: 22,
      },
      {
        rank: 5,
        username: 'CycloneStorm',
        score: 10450,
        wins: 68,
        gamesPlayed: 125,
        winRate: 54.4,
        level: 21,
      },
      {
        rank: 6,
        username: 'MysticDefender',
        score: 9980,
        wins: 64,
        gamesPlayed: 119,
        winRate: 53.8,
        level: 20,
      },
      {
        rank: 7,
        username: 'ShadowKnight',
        score: 9650,
        wins: 61,
        gamesPlayed: 115,
        winRate: 53.0,
        level: 19,
      },
      {
        rank: 8,
        username: 'ElementalMage',
        score: 9320,
        wins: 58,
        gamesPlayed: 112,
        winRate: 51.8,
        level: 18,
      },
      {
        rank: 9,
        username: 'IronGuardian',
        score: 8890,
        wins: 55,
        gamesPlayed: 108,
        winRate: 50.9,
        level: 17,
      },
      {
        rank: 10,
        username: 'StormBreaker',
        score: 8550,
        wins: 52,
        gamesPlayed: 105,
        winRate: 49.5,
        level: 16,
      },
    ],
    monthly: [
      {
        rank: 1,
        username: 'VietWarrior',
        score: 2340,
        wins: 18,
        gamesPlayed: 32,
        winRate: 56.3,
        level: 24,
      },
      {
        rank: 2,
        username: 'DragonSlayer99',
        score: 2180,
        wins: 16,
        gamesPlayed: 29,
        winRate: 55.2,
        level: 25,
      },
      {
        rank: 3,
        username: 'PhoenixRising',
        score: 1950,
        wins: 15,
        gamesPlayed: 28,
        winRate: 53.6,
        level: 22,
      },
    ],
    weekly: [
      {
        rank: 1,
        username: 'TowerMaster',
        score: 580,
        wins: 5,
        gamesPlayed: 8,
        winRate: 62.5,
        level: 23,
      },
      {
        rank: 2,
        username: 'MysticDefender',
        score: 520,
        wins: 4,
        gamesPlayed: 7,
        winRate: 57.1,
        level: 20,
      },
      {
        rank: 3,
        username: 'CycloneStorm',
        score: 480,
        wins: 4,
        gamesPlayed: 8,
        winRate: 50.0,
        level: 21,
      },
    ],
  }

  const periods = [
    { id: 'all-time', name: 'All Time' },
    { id: 'monthly', name: 'This Month' },
    { id: 'weekly', name: 'This Week' },
  ]

  const stats = {
    totalPlayers: 156,
    gamesPlayed: 2847,
    avgGameTime: '12:34',
    topScore: 12450,
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-gold" />
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-gold to-yellow-500 text-white'
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white'
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Leaderboard</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              See who rules the VSA Royale battlefield and climb the ranks yourself
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gold/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-16 h-16 bg-cardinal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-cardinal">{stats.totalPlayers}</h3>
                <p className="text-gray-600">Total Players</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-blue-600">
                  {stats.gamesPlayed.toLocaleString()}
                </h3>
                <p className="text-gray-600">Games Played</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-green-600">
                  {stats.topScore.toLocaleString()}
                </h3>
                <p className="text-gray-600">Top Score</p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.4}>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-purple-600">{stats.avgGameTime}</h3>
                <p className="text-gray-600">Avg Game Time</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Period Filter */}
      <section className="py-8 px-4 bg-white sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-4">
            {periods.map((period) => (
              <button
                key={period.id}
                onClick={() => setSelectedPeriod(period.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedPeriod === period.id
                    ? 'bg-cardinal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-2">
              {periods.find((p) => p.id === selectedPeriod)?.name} Rankings
            </h2>
            <p className="text-gray-600 text-center">
              Updated in real-time •{' '}
              {leaderboardData[selectedPeriod as keyof typeof leaderboardData].length} players shown
            </p>
          </AnimatedSection>

          <div className="space-y-4">
            {leaderboardData[selectedPeriod as keyof typeof leaderboardData].map(
              (player, index) => (
                <AnimatedSection key={player.username} direction="up" delay={index * 0.1}>
                  <div
                    className={`card ${
                      player.rank <= 3 ? 'ring-2 ring-gold' : ''
                    } hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(player.rank)}`}
                        >
                          {getRankIcon(player.rank)}
                        </div>

                        <div>
                          <h3 className="text-xl font-bold">{player.username}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Level {player.level}</span>
                            <span>•</span>
                            <span>
                              {player.wins}W / {player.gamesPlayed - player.wins}L
                            </span>
                            <span>•</span>
                            <span>{player.winRate}% WR</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-cardinal">
                          {player.score.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Score</div>
                      </div>
                    </div>

                    {/* Progress Bar for Win Rate */}
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Win Rate</span>
                        <span>{player.winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${player.winRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Ready to Climb the Rankings?</h2>
            <p className="section-subtitle mb-8">
              Join the competition and see if you have what it takes to reach the top
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Play Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Trophy className="w-5 h-5 mr-2" />
                View Tournament Schedule
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
