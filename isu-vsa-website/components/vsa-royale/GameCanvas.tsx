'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/types/vsa-royale'
import { getCardById } from '@/lib/vsa-royale/cards'
import {
  Heart,
  Zap,
  Clock,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Home,
  RotateCcw,
  AlertCircle,
} from 'lucide-react'

interface GameCanvasProps {
  mode: 'battle' | 'campaign' | 'puzzle'
  difficulty?: 'easy' | 'normal' | 'hard' | 'expert' | 'legendary'
  level?: number
}

export default function GameCanvas({ mode = 'battle', difficulty = 'normal' }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<Set<NodeJS.Timeout>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playerHP, setPlayerHP] = useState(100)
  const [enemyHP, setEnemyHP] = useState(100)
  const [eggrolls, setEggrolls] = useState(5)
  const [gameTime, setGameTime] = useState(180)
  const [currentHand, setCurrentHand] = useState<Card[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  // Cleanup function for timers
  const cleanupTimers = useCallback(() => {
    timersRef.current.forEach((timer) => clearInterval(timer))
    timersRef.current.clear()
  }, [])

  // Safe timer creation
  const createTimer = useCallback((callback: () => void, delay: number) => {
    const timer = setInterval(callback, delay)
    timersRef.current.add(timer)
    return timer
  }, [])

  useEffect(() => {
    let mounted = true

    const initGame = async () => {
      try {
        if (typeof window !== 'undefined' && containerRef.current && mounted) {
          const Phaser = (await import('phaser')).default

          class BattleScene extends Phaser.Scene {
            private units: Phaser.GameObjects.Group | null = null
            private towers: Phaser.GameObjects.Group | null = null

            constructor() {
              super({ key: 'BattleScene' })
            }

            preload() {
              // Error handling for asset loading
              this.load.on('loaderror', (file: { key: string }) => {
                if (mounted) {
                  setError(`Failed to load asset: ${file.key}`)
                }
              })

              // Load game assets with fallbacks - using kawaii dong for everything
              this.load.image('arena', '/images/dong/dongKawaii.JPG')
              this.load.image('tower', '/images/dong/dongKawaii.JPG')
              this.load.image('unit', '/images/dong/dongKawaii.JPG')
              this.load.image('spell-effect', '/images/dong/dongKawaii.JPG')
            }

            create() {
              if (!mounted) return

              const { width, height } = this.scale

              // Add arena background with error handling
              try {
                const arena = this.add.image(width / 2, height / 2, 'arena')
                arena.setDisplaySize(width, height)
              } catch {
                // Use color background as fallback
                this.cameras.main.setBackgroundColor('#2d5016')
              }

              // Initialize groups
              this.units = this.add.group()
              this.towers = this.add.group()

              // Create game grid
              const gridSize = 16
              const cellWidth = width / gridSize
              const cellHeight = height / 18

              // Draw grid
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

              // Add towers with error handling
              this.addTower(width * 0.5, height * 0.15, 'enemy')
              this.addTower(width * 0.25, height * 0.25, 'enemy')
              this.addTower(width * 0.75, height * 0.25, 'enemy')

              this.addTower(width * 0.5, height * 0.85, 'player')
              this.addTower(width * 0.25, height * 0.75, 'player')
              this.addTower(width * 0.75, height * 0.75, 'player')

              // Set up input
              this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                if (mounted) {
                  this.handleCardPlacement(pointer.x, pointer.y)
                }
              })

              if (mounted) {
                setIsLoading(false)
              }
            }

            update() {
              if (!mounted || isPaused) return

              // Update game logic safely
              try {
                this.updateUnits()
                this.checkCollisions()
                this.updateEggrolls()
              } catch {
                if (mounted) {
                  setError('Game update error occurred')
                }
              }
            }

            addTower(x: number, y: number, team: 'player' | 'enemy') {
              try {
                const color = team === 'player' ? 0x4ade80 : 0xef4444
                const tower = this.add.rectangle(x, y, 60, 80, color)
                tower.setData('team', team)
                tower.setData('hp', 100)
                this.towers?.add(tower)
              } catch {
                // Silently fail if tower can't be created
              }
            }

            handleCardPlacement(x: number, y: number) {
              if (!selectedCard || !mounted) return

              try {
                const unit = this.add.circle(x, y, 20, 0x60a5fa)
                unit.setData('card', selectedCard)
                unit.setData('team', 'player')
                this.units?.add(unit)

                if (mounted) {
                  setEggrolls((prev) => Math.max(0, prev - selectedCard.cost))
                  setSelectedCard(null)
                }
              } catch {
                // Silently fail if unit can't be created
              }
            }

            updateUnits() {
              if (!this.units) return

              this.units.children.entries.forEach((unit) => {
                const speed = 1
                ;(unit as Phaser.GameObjects.Arc).y -= speed
              })
            }

            checkCollisions() {
              // Collision detection logic
            }

            updateEggrolls() {
              // Eggroll generation logic
            }

            shutdown() {
              this.units?.clear(true, true)
              this.towers?.clear(true, true)
            }
          }

          const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: containerRef.current,
            width: 800,
            height: 600,
            scene: BattleScene,
            physics: {
              default: 'arcade',
              arcade: {
                gravity: { x: 0, y: 0 },
                debug: false,
              },
            },
            backgroundColor: '#1a1a1a',
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH,
            },
          }

          if (mounted) {
            gameRef.current = new Phaser.Game(config)
          }
        }
      } catch {
        if (mounted) {
          setError('Failed to initialize game. Please refresh the page.')
          setIsLoading(false)
        }
      }
    }

    initGame()

    // Timer for game time countdown
    createTimer(() => {
      if (mounted && !isPaused && gameTime > 0) {
        setGameTime((prev) => Math.max(0, prev - 1))
      }
    }, 1000)

    // Timer for eggroll generation
    createTimer(() => {
      if (mounted && !isPaused && eggrolls < 10) {
        setEggrolls((prev) => Math.min(10, prev + 1))
      }
    }, 2800)

    // Initialize hand
    if (mounted) {
      const initialHand: Card[] = [
        getCardById('banh-mi-warrior')!,
        getCardById('pho-healer')!,
        getCardById('spring-roll-rush')!,
        getCardById('tet-fireworks')!,
      ].filter(Boolean)
      setCurrentHand(initialHand)
    }

    // Cleanup function
    return () => {
      mounted = false
      cleanupTimers()
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [createTimer, cleanupTimers, isPaused, gameTime, eggrolls, selectedCard])

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (gameRef.current) {
      if (isPaused) {
        gameRef.current.scene.resume('BattleScene')
      } else {
        gameRef.current.scene.pause('BattleScene')
      }
    }
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    if (gameRef.current && gameRef.current.sound) {
      gameRef.current.sound.mute = !soundEnabled
    }
  }

  const restartGame = () => {
    cleanupTimers()
    setGameTime(180)
    setEggrolls(5)
    setPlayerHP(100)
    setEnemyHP(100)
    setError(null)
    if (gameRef.current) {
      gameRef.current.scene.start('BattleScene')
    }
  }

  const exitGame = () => {
    cleanupTimers()
    if (gameRef.current) {
      gameRef.current.destroy(true)
      gameRef.current = null
    }
    window.location.href = '/vsa-royale'
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Game Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Game Assets...</p>
          </div>
        </div>
      )}

      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 z-10">
        <div className="flex justify-between items-start">
          {/* Player Stats */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-red-500" />
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${playerHP}%` }}
                />
              </div>
              <span className="text-sm">{playerHP}/100</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-6 rounded ${i < eggrolls ? 'bg-yellow-400' : 'bg-gray-700'}`}
                  />
                ))}
              </div>
              <span className="text-sm">{eggrolls}/10</span>
            </div>
          </div>

          {/* Game Timer */}
          <div className="text-white text-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-2xl font-bold">
                {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm text-gray-300 mt-1">
              {mode === 'campaign' ? `Level ${difficulty}` : difficulty}
            </div>
          </div>

          {/* Enemy Stats */}
          <div className="text-white text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm">{enemyHP}/100</span>
              <div className="w-32 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all"
                  style={{ width: `${enemyHP}%` }}
                />
              </div>
              <Heart className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-sm text-gray-300">Enemy Tower</div>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div ref={containerRef} className="w-full h-[600px]" />

      {/* Card Hand */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex justify-center gap-2">
          {currentHand.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => eggrolls >= card.cost && setSelectedCard(card)}
              className={`relative bg-gray-800 rounded-lg p-2 cursor-pointer border-2 ${
                selectedCard?.id === card.id ? 'border-yellow-400' : 'border-gray-600'
              } ${eggrolls < card.cost ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="w-20 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded mb-1" />
              <div className="text-center">
                <p className="text-white text-xs font-bold truncate">{card.name}</p>
                <div className="flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-400 text-xs">{card.cost}</span>
                </div>
              </div>
              {selectedCard?.id === card.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <button
          onClick={togglePause}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          onClick={toggleSound}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
          aria-label={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
        <button
          onClick={restartGame}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
          aria-label="Restart"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={exitGame}
          className="bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
          aria-label="Exit"
        >
          <Home className="w-5 h-5" />
        </button>
      </div>

      {/* Pause Menu */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Game Paused</h2>
            <div className="space-y-4">
              <button
                onClick={togglePause}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Resume Game
              </button>
              <button
                onClick={restartGame}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Restart Level
              </button>
              <button
                onClick={exitGame}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg transition-colors"
              >
                Exit to Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
