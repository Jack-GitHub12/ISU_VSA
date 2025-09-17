'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Shield,
  Swords,
} from 'lucide-react'

interface GameUnit {
  id: string
  cardData: Card
  x: number
  y: number
  targetX: number
  targetY: number
  hp: number
  maxHp: number
  team: 'player' | 'enemy'
  state: 'moving' | 'attacking' | 'idle'
  attackTarget: GameTower | GameUnit | null
  attackCooldown: number
  sprite?: Phaser.GameObjects.Container
  healthBar?: Phaser.GameObjects.Graphics
}

interface GameTower {
  id: string
  type: 'king' | 'princess'
  x: number
  y: number
  hp: number
  maxHp: number
  team: 'player' | 'enemy'
  damage: number
  attackSpeed: number
  attackRange: number
  attackCooldown: number
  sprite?: Phaser.GameObjects.Container
  healthBar?: Phaser.GameObjects.Graphics
}

interface GameCanvasProps {
  mode: 'battle' | 'campaign' | 'puzzle'
  difficulty?: 'easy' | 'normal' | 'hard' | 'expert' | 'legendary'
  level?: number
}

const DONG_COIN_MAX = 10
const DONG_COIN_REGEN_RATE = 2.8 // seconds per coin
const GAME_WIDTH = 800
const GAME_HEIGHT = 600
const LANE_WIDTH = GAME_WIDTH / 3
const DEPLOYMENT_ZONE_HEIGHT = GAME_HEIGHT * 0.4

export default function GameCanvasEnhanced({ mode = 'battle', difficulty = 'normal' }: GameCanvasProps) {
  const gameRef = useRef<Phaser.Game | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<Phaser.Scene | null>(null)
  const unitsRef = useRef<Map<string, GameUnit>>(new Map())
  const towersRef = useRef<Map<string, GameTower>>(new Map())
  const dragPreviewRef = useRef<Phaser.GameObjects.Container | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [playerHP, setPlayerHP] = useState(100)
  const [enemyHP, setEnemyHP] = useState(100)
  const [dongCoins, setDongCoins] = useState(5)
  const [dongCoinProgress, setDongCoinProgress] = useState(0)
  const [gameTime, setGameTime] = useState(180)
  const [currentHand, setCurrentHand] = useState<Card[]>([])
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
  const [canPlaceCard, setCanPlaceCard] = useState(false)

  // Initialize game
  useEffect(() => {
    let mounted = true
    let animationFrame: number
    let lastTime = 0
    let dongCoinTimer = 0

    const initGame = async () => {
      try {
        if (typeof window !== 'undefined' && containerRef.current && mounted) {
          const Phaser = (await import('phaser')).default

          class BattleScene extends Phaser.Scene {
            private graphics!: Phaser.GameObjects.Graphics
            private deploymentZone!: Phaser.GameObjects.Rectangle

            constructor() {
              super({ key: 'BattleScene' })
            }

            preload() {
              this.load.on('loaderror', (file: { key: string }) => {
                console.error(`Failed to load asset: ${file.key}`)
              })

              // Create simple colored squares as sprites
              this.createColoredSprite('unit-player', 0x4ade80)
              this.createColoredSprite('unit-enemy', 0xef4444)
              this.createColoredSprite('tower-king', 0xfbbf24)
              this.createColoredSprite('tower-princess', 0x60a5fa)
              this.createColoredSprite('projectile', 0xfde047)
              this.createColoredSprite('particle', 0xfbbf24)
            }

            createColoredSprite(key: string, color: number) {
              const graphics = this.make.graphics({ x: 0, y: 0 }, false)
              graphics.fillStyle(color, 1)
              graphics.fillRect(0, 0, 32, 32)
              graphics.generateTexture(key, 32, 32)
              graphics.destroy()
            }

            create() {
              if (!mounted) return
              sceneRef.current = this

              const { width, height } = this.scale
              this.graphics = this.add.graphics()

              // Create gradient background
              this.createBackground()

              // Create battlefield grid
              this.createBattlefieldGrid()

              // Create deployment zone
              this.deploymentZone = this.add.rectangle(
                width / 2,
                height - DEPLOYMENT_ZONE_HEIGHT / 2,
                width,
                DEPLOYMENT_ZONE_HEIGHT,
                0x4ade80,
                0.1
              )
              this.deploymentZone.setStrokeStyle(2, 0x4ade80, 0.5)

              // Create towers
              this.createTowers()

              // Handle input
              this.setupInput()

              if (mounted) {
                setIsLoading(false)
              }
            }

            createBackground() {
              const { width, height } = this.scale
              const bg = this.add.graphics()

              // Create gradient effect
              for (let y = 0; y < height; y += 2) {
                const progress = y / height
                const r = Math.floor(26 + (45 - 26) * progress)
                const g = Math.floor(35 + (80 - 35) * progress)
                const b = Math.floor(46 + (22 - 46) * progress)
                bg.fillStyle(Phaser.Display.Color.GetColor(r, g, b), 1)
                bg.fillRect(0, y, width, 2)
              }
            }

            createBattlefieldGrid() {
              const { width, height } = this.scale
              this.graphics.lineStyle(1, 0xffffff, 0.1)

              // Draw lane dividers
              for (let i = 1; i < 3; i++) {
                this.graphics.moveTo((width / 3) * i, 0)
                this.graphics.lineTo((width / 3) * i, height)
              }

              // Draw horizontal grid lines
              for (let y = 0; y < height; y += 40) {
                this.graphics.moveTo(0, y)
                this.graphics.lineTo(width, y)
              }
            }

            createTowers() {
              // Enemy towers
              this.createTower('enemy-king', 'king', GAME_WIDTH / 2, 80, 'enemy')
              this.createTower('enemy-left', 'princess', GAME_WIDTH * 0.25, 140, 'enemy')
              this.createTower('enemy-right', 'princess', GAME_WIDTH * 0.75, 140, 'enemy')

              // Player towers
              this.createTower('player-king', 'king', GAME_WIDTH / 2, GAME_HEIGHT - 80, 'player')
              this.createTower('player-left', 'princess', GAME_WIDTH * 0.25, GAME_HEIGHT - 140, 'player')
              this.createTower('player-right', 'princess', GAME_WIDTH * 0.75, GAME_HEIGHT - 140, 'player')
            }

            createTower(id: string, type: 'king' | 'princess', x: number, y: number, team: 'player' | 'enemy') {
              const tower: GameTower = {
                id,
                type,
                x,
                y,
                hp: type === 'king' ? 4000 : 2500,
                maxHp: type === 'king' ? 4000 : 2500,
                team,
                damage: type === 'king' ? 120 : 90,
                attackSpeed: 1.2,
                attackRange: 150,
                attackCooldown: 0,
              }

              const container = this.add.container(x, y)

              // Tower base
              const baseColor = team === 'player' ? 0x4ade80 : 0xef4444
              const base = this.add.rectangle(0, 0, type === 'king' ? 80 : 60, type === 'king' ? 100 : 80, baseColor)
              base.setStrokeStyle(3, 0x000000, 0.5)
              container.add(base)

              // Tower crown
              const crownColor = type === 'king' ? 0xfbbf24 : 0x60a5fa
              const crown = this.add.star(0, -20, 5, 15, 25, crownColor)
              container.add(crown)

              // Health bar background
              const healthBarBg = this.add.rectangle(0, -50, 60, 8, 0x000000, 0.5)
              container.add(healthBarBg)

              // Health bar
              const healthBar = this.add.graphics()
              this.updateHealthBar(healthBar, 60, tower.hp / tower.maxHp)
              healthBar.x = -30
              healthBar.y = -50
              container.add(healthBar)

              tower.sprite = container
              tower.healthBar = healthBar
              towersRef.current.set(id, tower)

              // Add glow effect
              const glow = this.add.circle(x, y, type === 'king' ? 50 : 40, baseColor, 0.2)
              this.tweens.add({
                targets: glow,
                alpha: { from: 0.2, to: 0.4 },
                scale: { from: 1, to: 1.2 },
                duration: 1000,
                repeat: -1,
                yoyo: true,
              })
            }

            setupInput() {
              this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
                if (isDragging && selectedCard) {
                  setDragPosition({ x: pointer.x, y: pointer.y })
                  this.updateDragPreview(pointer.x, pointer.y)

                  // Check if in deployment zone
                  const inZone = pointer.y >= GAME_HEIGHT - DEPLOYMENT_ZONE_HEIGHT
                  setCanPlaceCard(inZone && dongCoins >= selectedCard.cost)
                }
              })

              this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
                if (isDragging && selectedCard && canPlaceCard) {
                  this.deployUnit(selectedCard, pointer.x, pointer.y)
                  setDongCoins(prev => prev - selectedCard.cost)
                  setSelectedCard(null)
                }
                setIsDragging(false)
                this.clearDragPreview()
              })
            }

            updateDragPreview(x: number, y: number) {
              if (dragPreviewRef.current) {
                dragPreviewRef.current.destroy()
              }

              const preview = this.add.container(x, y)
              const circle = this.add.circle(0, 0, 25, canPlaceCard ? 0x4ade80 : 0xef4444, 0.5)
              preview.add(circle)

              if (selectedCard?.range) {
                const rangeCircle = this.add.circle(0, 0, selectedCard.range * 10, 0xffffff, 0.1)
                rangeCircle.setStrokeStyle(2, 0xffffff, 0.3)
                preview.add(rangeCircle)
              }

              dragPreviewRef.current = preview
            }

            clearDragPreview() {
              if (dragPreviewRef.current) {
                dragPreviewRef.current.destroy()
                dragPreviewRef.current = null
              }
            }

            deployUnit(card: Card, x: number, y: number) {
              const unitId = `unit-${Date.now()}-${Math.random()}`
              const unit: GameUnit = {
                id: unitId,
                cardData: card,
                x,
                y,
                targetX: x,
                targetY: 100,
                hp: card.hp || 100,
                maxHp: card.hp || 100,
                team: 'player',
                state: 'moving',
                attackTarget: null,
                attackCooldown: 0,
              }

              const container = this.add.container(x, y)

              // Unit sprite
              const unitSprite = this.add.circle(0, 0, 20, 0x4ade80)
              unitSprite.setStrokeStyle(2, 0x000000, 0.5)
              container.add(unitSprite)

              // Unit icon
              const icon = this.add.text(0, 0, card.name.charAt(0), {
                fontSize: '16px',
                color: '#ffffff',
                fontStyle: 'bold',
              })
              icon.setOrigin(0.5)
              container.add(icon)

              // Health bar
              const healthBarBg = this.add.rectangle(0, -30, 40, 6, 0x000000, 0.5)
              container.add(healthBarBg)

              const healthBar = this.add.graphics()
              this.updateHealthBar(healthBar, 40, 1)
              healthBar.x = -20
              healthBar.y = -30
              container.add(healthBar)

              unit.sprite = container
              unit.healthBar = healthBar
              unitsRef.current.set(unitId, unit)

              // Deploy effect
              this.createDeployEffect(x, y)
            }

            createDeployEffect(x: number, y: number) {
              // Simplified particle effect - just visual feedback
              const circle = this.add.circle(x, y, 30, 0xffd700, 0.5)
              this.tweens.add({
                targets: circle,
                scaleX: 2,
                scaleY: 2,
                alpha: 0,
                duration: 300,
                onComplete: () => circle.destroy()
              })
            }

            updateHealthBar(graphics: Phaser.GameObjects.Graphics, width: number, percentage: number) {
              graphics.clear()
              graphics.fillStyle(0xff0000, 1)
              graphics.fillRect(0, 0, width * percentage, 6)
            }

            createProjectile(from: { x: number; y: number }, to: { x: number; y: number }, damage: number) {
              const projectile = this.add.circle(from.x, from.y, 5, 0xfde047)

              this.tweens.add({
                targets: projectile,
                x: to.x,
                y: to.y,
                duration: 200,
                onComplete: () => {
                  projectile.destroy()
                  this.createHitEffect(to.x, to.y)
                }
              })
            }

            createHitEffect(x: number, y: number) {
              // Simplified hit effect - just visual feedback
              const flash = this.add.circle(x, y, 20, 0xff0000, 0.8)
              this.tweens.add({
                targets: flash,
                scaleX: 1.5,
                scaleY: 1.5,
                alpha: 0,
                duration: 200,
                onComplete: () => flash.destroy()
              })
            }

            shutdown() {
              unitsRef.current.clear()
              towersRef.current.clear()
              if (dragPreviewRef.current) {
                dragPreviewRef.current.destroy()
              }
            }
          }

          const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: containerRef.current,
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            scene: BattleScene,
            physics: {
              default: 'arcade',
              arcade: {
                gravity: { x: 0, y: 0 },
                debug: false,
              },
            },
            backgroundColor: '#1a2332',
            scale: {
              mode: Phaser.Scale.FIT,
              autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            render: {
              antialias: true,
              pixelArt: false,
              roundPixels: true,
            },
          }

          if (mounted) {
            gameRef.current = new Phaser.Game(config)
          }
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to initialize game')
          setIsLoading(false)
        }
      }
    }

    // Game update loop
    const gameLoop = (currentTime: number) => {
      if (!mounted || isPaused) {
        animationFrame = requestAnimationFrame(gameLoop)
        return
      }

      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // Update Dong Coins
      dongCoinTimer += deltaTime
      if (dongCoinTimer >= DONG_COIN_REGEN_RATE * 1000) {
        setDongCoins(prev => Math.min(prev + 1, DONG_COIN_MAX))
        dongCoinTimer = 0
      }
      setDongCoinProgress((dongCoinTimer / (DONG_COIN_REGEN_RATE * 1000)) * 100)

      // Update units
      unitsRef.current.forEach(unit => {
        updateUnit(unit, deltaTime / 1000)
      })

      // Update towers
      towersRef.current.forEach(tower => {
        updateTower(tower, deltaTime / 1000)
      })

      // Check collisions
      checkCollisions()

      animationFrame = requestAnimationFrame(gameLoop)
    }

    const updateUnit = (unit: GameUnit, deltaTime: number) => {
      if (!unit.sprite) return

      // Find nearest enemy
      if (!unit.attackTarget || unit.attackTarget.hp <= 0) {
        unit.attackTarget = findNearestTarget(unit)
      }

      if (unit.attackTarget) {
        const dist = getDistance(unit, unit.attackTarget)
        const range = (unit.cardData.range || 1) * 30

        if (dist <= range) {
          // Attack
          unit.state = 'attacking'
          unit.attackCooldown -= deltaTime

          if (unit.attackCooldown <= 0) {
            performAttack(unit, unit.attackTarget)
            unit.attackCooldown = 1 / (unit.cardData.attackSpeed || 1)
          }
        } else {
          // Move towards target
          unit.state = 'moving'
          const speed = (unit.cardData.speed || 1) * 50
          const angle = Math.atan2(unit.attackTarget.y - unit.y, unit.attackTarget.x - unit.x)

          unit.x += Math.cos(angle) * speed * deltaTime
          unit.y += Math.sin(angle) * speed * deltaTime

          if (unit.sprite) {
            unit.sprite.x = unit.x
            unit.sprite.y = unit.y
          }
        }
      } else {
        // Move towards enemy base
        unit.state = 'moving'
        const speed = (unit.cardData.speed || 1) * 50
        const targetY = unit.team === 'player' ? 80 : GAME_HEIGHT - 80
        const angle = Math.atan2(targetY - unit.y, GAME_WIDTH / 2 - unit.x)

        unit.x += Math.cos(angle) * speed * deltaTime
        unit.y += Math.sin(angle) * speed * deltaTime

        if (unit.sprite) {
          unit.sprite.x = unit.x
          unit.sprite.y = unit.y
        }
      }
    }

    const updateTower = (tower: GameTower, deltaTime: number) => {
      tower.attackCooldown -= deltaTime

      if (tower.attackCooldown <= 0) {
        const target = findNearestUnitForTower(tower)
        if (target) {
          performTowerAttack(tower, target)
          tower.attackCooldown = 1 / tower.attackSpeed
        }
      }
    }

    const findNearestTarget = (unit: GameUnit): GameTower | GameUnit | null => {
      let nearest: GameTower | GameUnit | null = null
      let minDist = Infinity

      // Check towers
      towersRef.current.forEach(tower => {
        if (tower.team !== unit.team && tower.hp > 0) {
          const dist = getDistance(unit, tower)
          if (dist < minDist) {
            minDist = dist
            nearest = tower
          }
        }
      })

      // Check units
      unitsRef.current.forEach(otherUnit => {
        if (otherUnit.team !== unit.team && otherUnit.hp > 0) {
          const dist = getDistance(unit, otherUnit)
          if (dist < minDist) {
            minDist = dist
            nearest = otherUnit
          }
        }
      })

      return nearest
    }

    const findNearestUnitForTower = (tower: GameTower): GameUnit | null => {
      let nearest: GameUnit | null = null
      let minDist = tower.attackRange

      unitsRef.current.forEach(unit => {
        if (unit.team !== tower.team && unit.hp > 0) {
          const dist = getDistance(tower, unit)
          if (dist <= tower.attackRange && dist < minDist) {
            minDist = dist
            nearest = unit
          }
        }
      })

      return nearest
    }

    const performAttack = (attacker: GameUnit, target: GameTower | GameUnit) => {
      const damage = attacker.cardData.damage || 50
      target.hp -= damage

      // Create projectile effect
      if (sceneRef.current) {
        const scene = sceneRef.current as any
        scene.createProjectile(
          { x: attacker.x, y: attacker.y },
          { x: target.x, y: target.y },
          damage
        )
      }

      // Update health bar
      if ('healthBar' in target && target.healthBar) {
        const scene = sceneRef.current as any
        scene.updateHealthBar(target.healthBar, 'maxHp' in target ? 60 : 40, target.hp / target.maxHp)
      }

      // Check if target died
      if (target.hp <= 0) {
        handleDeath(target)
      }
    }

    const performTowerAttack = (tower: GameTower, target: GameUnit) => {
      target.hp -= tower.damage

      // Create projectile effect
      if (sceneRef.current) {
        const scene = sceneRef.current as any
        scene.createProjectile(
          { x: tower.x, y: tower.y },
          { x: target.x, y: target.y },
          tower.damage
        )
      }

      // Update health bar
      if (target.healthBar) {
        const scene = sceneRef.current as any
        scene.updateHealthBar(target.healthBar, 40, target.hp / target.maxHp)
      }

      // Check if target died
      if (target.hp <= 0) {
        handleDeath(target)
      }
    }

    const handleDeath = (entity: GameTower | GameUnit) => {
      if ('cardData' in entity) {
        // Unit died
        if (entity.sprite) {
          entity.sprite.destroy()
        }
        unitsRef.current.delete(entity.id)
      } else {
        // Tower died
        if (entity.sprite) {
          entity.sprite.destroy()
        }
        towersRef.current.delete(entity.id)

        // Update HP bars
        if (entity.team === 'player') {
          setPlayerHP(prev => Math.max(0, prev - 33))
        } else {
          setEnemyHP(prev => Math.max(0, prev - 33))
        }
      }
    }

    const getDistance = (a: { x: number; y: number }, b: { x: number; y: number }): number => {
      const dx = a.x - b.x
      const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    const checkCollisions = () => {
      // Collision detection between units
      const units = Array.from(unitsRef.current.values())
      for (let i = 0; i < units.length; i++) {
        for (let j = i + 1; j < units.length; j++) {
          const dist = getDistance(units[i], units[j])
          if (dist < 30) {
            // Push units apart
            const angle = Math.atan2(units[j].y - units[i].y, units[j].x - units[i].x)
            units[i].x -= Math.cos(angle) * 0.5
            units[i].y -= Math.sin(angle) * 0.5
            units[j].x += Math.cos(angle) * 0.5
            units[j].y += Math.sin(angle) * 0.5
          }
        }
      }
    }

    initGame()
    animationFrame = requestAnimationFrame(gameLoop)

    // Initialize hand
    const initialHand: Card[] = [
      getCardById('freshman_member'),
      getCardById('volunteer'),
      getCardById('junior_member'),
      getCardById('tet_firecracker'),
    ].filter(Boolean) as Card[]
    setCurrentHand(initialHand)

    // Game timer
    const timerInterval = setInterval(() => {
      if (!isPaused && mounted) {
        setGameTime(prev => {
          const newTime = Math.max(0, prev - 1)
          if (newTime === 0) {
            // Game over
          }
          return newTime
        })
      }
    }, 1000)

    return () => {
      mounted = false
      cancelAnimationFrame(animationFrame)
      clearInterval(timerInterval)
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [isPaused])

  const handleCardDragStart = (card: Card) => {
    if (dongCoins >= card.cost) {
      setSelectedCard(card)
      setIsDragging(true)
    }
  }

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
    setGameTime(180)
    setDongCoins(5)
    setPlayerHP(100)
    setEnemyHP(100)
    setError(null)
    if (gameRef.current) {
      gameRef.current.scene.start('BattleScene')
    }
  }

  const exitGame = () => {
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
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading Enhanced Battle Arena...</p>
          </div>
        </div>
      )}

      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent p-4 z-10">
        <div className="flex justify-between items-start">
          {/* Player Stats */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <div className="w-32 bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all"
                  style={{ width: `${playerHP}%` }}
                />
              </div>
              <span className="text-sm font-bold">{playerHP}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <div className="relative">
                <div className="flex gap-1">
                  {[...Array(DONG_COIN_MAX)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-7 rounded-sm transition-all ${
                        i < Math.floor(dongCoins)
                          ? 'bg-gradient-to-t from-yellow-500 to-yellow-400 shadow-lg'
                          : i === Math.floor(dongCoins)
                          ? 'bg-gray-700 overflow-hidden'
                          : 'bg-gray-700'
                      }`}
                    >
                      {i === Math.floor(dongCoins) && dongCoins < DONG_COIN_MAX && (
                        <div
                          className="bg-gradient-to-t from-yellow-500 to-yellow-400 w-full transition-all"
                          style={{ height: `${dongCoinProgress}%` }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <span className="text-sm font-bold">{dongCoins.toFixed(1)}/10</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Your Towers</div>
          </div>

          {/* Game Timer */}
          <div className="text-white text-center">
            <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-3xl font-bold tabular-nums">
                {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-sm text-yellow-400 mt-1 font-semibold">
              {mode === 'battle' ? 'BATTLE' : mode.toUpperCase()} • {difficulty.toUpperCase()}
            </div>
          </div>

          {/* Enemy Stats */}
          <div className="text-white text-right">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold">{enemyHP}%</span>
              <div className="w-32 bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-red-500 to-red-400 h-3 rounded-full transition-all"
                  style={{ width: `${enemyHP}%` }}
                />
              </div>
              <Swords className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex items-center gap-2 justify-end">
              <span className="text-sm text-gray-400">AI Dong Coins</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-5 rounded-sm bg-red-500/50" />
                ))}
              </div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Enemy Towers</div>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div ref={containerRef} className="w-full h-[600px]" />

      {/* Card Hand */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <div className="flex justify-center gap-3">
          <AnimatePresence>
            {currentHand.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0, y: 50 }}
                whileHover={dongCoins >= card.cost ? { scale: 1.05, y: -10 } : {}}
                whileTap={dongCoins >= card.cost ? { scale: 0.95 } : {}}
                onMouseDown={() => handleCardDragStart(card)}
                className={`relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-3 cursor-pointer border-2 shadow-xl transition-all ${
                  selectedCard?.id === card.id
                    ? 'border-yellow-400 shadow-yellow-400/50'
                    : dongCoins >= card.cost
                    ? 'border-gray-600 hover:border-gray-500'
                    : 'border-gray-700 opacity-50 cursor-not-allowed'
                }`}
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <div className="w-24 h-32 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-4xl">🥟</span>
                </div>
                <div className="text-center">
                  <p className="text-white text-xs font-bold truncate mb-1">{card.name}</p>
                  <div className="flex items-center justify-center gap-1 bg-black/50 rounded-full px-2 py-1">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-bold">{card.cost}</span>
                  </div>
                </div>
                {card.hp && (
                  <div className="absolute top-2 left-2 bg-red-500 rounded-full px-2 py-0.5">
                    <span className="text-white text-xs font-bold">{card.hp}</span>
                  </div>
                )}
                {card.damage && (
                  <div className="absolute top-2 right-2 bg-blue-500 rounded-full px-2 py-0.5">
                    <span className="text-white text-xs font-bold">{card.damage}</span>
                  </div>
                )}
                {selectedCard?.id === card.id && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Next Card Indicator */}
        <div className="mt-3 flex justify-center">
          <div className="bg-gray-800/80 rounded-lg px-3 py-1 flex items-center gap-2">
            <span className="text-gray-400 text-xs">Next:</span>
            <div className="w-8 h-10 bg-gray-700 rounded flex items-center justify-center">
              <span className="text-sm">🥟</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={togglePause}
          className="bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          aria-label={isPaused ? 'Resume' : 'Pause'}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleSound}
          className="bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          aria-label={soundEnabled ? 'Mute' : 'Unmute'}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={restartGame}
          className="bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          aria-label="Restart"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={exitGame}
          className="bg-gray-800/90 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors shadow-lg"
          aria-label="Exit"
        >
          <Home className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Pause Menu */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-8 text-center shadow-2xl border border-gray-700"
            >
              <h2 className="text-3xl font-bold text-white mb-6">Game Paused</h2>
              <div className="space-y-4">
                <button
                  onClick={togglePause}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-lg transition-all font-bold shadow-lg"
                >
                  Resume Game
                </button>
                <button
                  onClick={restartGame}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all font-bold shadow-lg"
                >
                  Restart Level
                </button>
                <button
                  onClick={exitGame}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-3 px-6 rounded-lg transition-all font-bold shadow-lg"
                >
                  Exit to Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag Overlay */}
      {isDragging && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            cursor: canPlaceCard ? 'grab' : 'not-allowed',
          }}
        />
      )}
    </div>
  )
}