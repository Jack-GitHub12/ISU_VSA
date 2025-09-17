'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/types/vsa-royale'
import { getCardById } from '@/lib/vsa-royale/cards'
import { Heart, Zap, Clock, Volume2, VolumeX, Pause, Play, Home, RotateCcw } from 'lucide-react'

interface GameCanvasProps {
  mode: 'battle' | 'campaign' | 'puzzle'
  difficulty?: 'easy' | 'normal' | 'hard' | 'expert' | 'legendary'
  level?: number
}

export default function GameCanvas({ mode = 'battle', difficulty = 'normal' }: GameCanvasProps) {
  // console.log('Game mode:', mode, 'Difficulty:', difficulty) // Using the props
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playerHP] = useState(100)
  const [enemyHP] = useState(100)
  const [eggrolls, setEggrolls] = useState(5)
  const [gameTime, setGameTime] = useState(180) // 3 minutes
  const [currentHand, setCurrentHand] = useState<Card[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  useEffect(() => {
    // Initialize Phaser game when component mounts
    const initGame = async () => {
      if (typeof window !== 'undefined') {
        const Phaser = (await import('phaser')).default

        class BattleScene extends Phaser.Scene {
          constructor() {
            super({ key: 'BattleScene' })
          }

          preload() {
            // Load game assets
            this.load.image('arena', '/images/game/arena.png')
            this.load.image('tower', '/images/game/tower.png')
            this.load.image('unit', '/images/game/unit.png')
            this.load.image('spell-effect', '/images/game/spell-effect.png')
          }

          create() {
            // Set up game world
            const { width, height } = this.scale

            // Add arena background
            const arena = this.add.image(width / 2, height / 2, 'arena')
            arena.setDisplaySize(width, height)

            // Create game grid
            const gridSize = 16
            const cellWidth = width / gridSize
            const cellHeight = height / 18

            // Draw grid for debugging
            const graphics = this.add.graphics()
            graphics.lineStyle(1, 0x444444, 0.3)

            for (let x = 0; x <= gridSize; x++) {
              graphics.moveTo(x * cellWidth, 0)
              graphics.lineTo(x * cellWidth, height)
            }

            for (let y = 0; y <= 18; y++) {
              graphics.moveTo(0, y * cellHeight)
              graphics.lineTo(width, y * cellHeight)
            }

            // Add towers
            this.addTower(width * 0.5, height * 0.15, 'enemy')
            this.addTower(width * 0.25, height * 0.25, 'enemy')
            this.addTower(width * 0.75, height * 0.25, 'enemy')

            this.addTower(width * 0.5, height * 0.85, 'player')
            this.addTower(width * 0.25, height * 0.75, 'player')
            this.addTower(width * 0.75, height * 0.75, 'player')

            // Set up input
            this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
              this.handleCardPlacement(pointer.x, pointer.y)
            })

            setIsLoading(false)
          }

          update() {
            // Update game logic
            this.updateUnits()
            this.checkCollisions()
            this.updateEggrolls()
          }

          addTower(x: number, y: number, team: string) {
            const tower = this.add.sprite(x, y, 'tower')
            tower.setScale(0.5)
            tower.setTint(team === 'player' ? 0x0000ff : 0xff0000)
            tower.setData('team', team)
            tower.setData('hp', 1000)
          }

          handleCardPlacement(x: number, y: number) {
            if (selectedCard) {
              // Deploy unit at position
              this.deployUnit(x, y, selectedCard)
              setSelectedCard(null)
            }
          }

          deployUnit(x: number, y: number, card: Card) {
            const unit = this.add.sprite(x, y, 'unit')
            unit.setScale(0.3)
            unit.setTint(0x00ff00)
            unit.setData('card', card)
            unit.setData('hp', card.hp)
            unit.setData('team', 'player')

            // Add movement tween
            this.tweens.add({
              targets: unit,
              y: 100,
              duration: 10000,
              ease: 'Linear',
            })
          }

          updateUnits() {
            // Update unit positions and attacks
          }

          checkCollisions() {
            // Check for unit collisions and combat
          }

          updateEggrolls() {
            // Update eggroll generation
          }
        }

        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          parent: containerRef.current!,
          width: 800,
          height: 600,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 0 },
              debug: false,
            },
          },
          scene: BattleScene,
          backgroundColor: '#1a1a1a',
        }

        gameRef.current = new Phaser.Game(config)
      }
    }

    initGame()

    // Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
      }
    }
  }, [selectedCard])

  // Load initial hand
  useEffect(() => {
    const deck = ['freshman_member', 'volunteer', 'tet_firecracker', 'pho_power']
    const hand = deck
      .slice(0, 4)
      .map((id) => getCardById(id)!)
      .filter(Boolean)
    setCurrentHand(hand)
  }, [])

  // Game timer
  useEffect(() => {
    if (!isPaused && gameTime > 0) {
      const timer = setInterval(() => {
        setGameTime((prev) => Math.max(0, prev - 1))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isPaused, gameTime])

  // Eggroll generation
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setEggrolls((prev) => Math.min(10, prev + 1))
      }, 2800) // 1 eggroll per 2.8 seconds
      return () => clearInterval(timer)
    }
  }, [isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Game UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex justify-between items-center">
          {/* Enemy Info */}
          <div className="bg-black/70 rounded-lg p-3 flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">AI</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-full rounded-full transition-all"
                    style={{ width: `${enemyHP}%` }}
                  />
                </div>
                <span className="text-white text-sm">{enemyHP}%</span>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="bg-black/70 rounded-lg px-4 py-2 flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gold" />
            <span className="text-white font-mono text-xl">{formatTime(gameTime)}</span>
          </div>

          {/* Player Info */}
          <div className="bg-black/70 rounded-lg p-3 flex items-center space-x-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">{playerHP}%</span>
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-full rounded-full transition-all"
                    style={{ width: `${playerHP}%` }}
                  />
                </div>
                <Heart className="w-4 h-4 text-green-500" />
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">You</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="absolute top-4 right-4 z-30 flex space-x-2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="bg-black/70 p-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          {isPaused ? (
            <Play className="w-5 h-5 text-white" />
          ) : (
            <Pause className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="bg-black/70 p-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-white" />
          ) : (
            <VolumeX className="w-5 h-5 text-white" />
          )}
        </button>
        <button
          onClick={() => window.location.reload()}
          className="bg-black/70 p-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={() => (window.location.href = '/vsa-royale')}
          className="bg-black/70 p-2 rounded-lg hover:bg-black/80 transition-colors"
        >
          <Home className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Game Canvas */}
      <div
        ref={containerRef}
        className="relative bg-gray-900 rounded-xl overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-40">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gold mb-4 mx-auto" />
              <p className="text-white text-xl">Loading Battle Arena...</p>
            </div>
          </div>
        )}
      </div>

      {/* Card Hand */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="bg-black/80 rounded-t-xl p-4">
          {/* Eggroll Counter */}
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-cardinal-gold rounded-full px-6 py-2 flex items-center space-x-3">
              <Zap className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-xl">{eggrolls}/10</span>
              <span className="text-white/70 text-sm">Eggrolls</span>
            </div>
          </div>

          {/* Cards */}
          <div className="flex justify-center space-x-3">
            {currentHand.map((card, index) => (
              <motion.div
                key={`${card.id}-${index}`}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className={`relative cursor-pointer ${
                  selectedCard?.id === card.id ? 'ring-4 ring-gold' : ''
                } ${eggrolls < card.cost ? 'opacity-50' : ''}`}
                onClick={() => eggrolls >= card.cost && setSelectedCard(card)}
              >
                <div className="bg-gray-800 rounded-lg p-3 w-24">
                  <div className="bg-gradient-cardinal-gold h-20 rounded-md mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold text-center">{card.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gold font-bold text-sm">{card.cost}</span>
                    {card.hp && <span className="text-red-400 text-xs">❤️ {card.hp}</span>}
                    {card.damage && <span className="text-blue-400 text-xs">⚔️ {card.damage}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
