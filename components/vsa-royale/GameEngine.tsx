'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import {
  Heart,
  Zap,
  Shield,
  Swords,
  Clock,
  Trophy,
  RotateCcw,
  Volume2,
  VolumeX,
  Pause,
  Play
} from 'lucide-react'

interface Card {
  id: string
  name: string
  cost: number
  damage?: number
  health?: number
  effect?: string
  type: 'unit' | 'spell'
  image: string
}

interface GameState {
  playerHealth: number
  botHealth: number
  playerMana: number
  botMana: number
  playerField: Card[]
  botField: Card[]
  playerHand: Card[]
  turn: 'player' | 'bot'
  gameStatus: 'playing' | 'victory' | 'defeat' | 'paused'
  turnTimer: number
}

const INITIAL_CARDS: Card[] = [
  { id: '1', name: 'Dong Warrior', cost: 2, damage: 3, health: 2, type: 'unit', image: '/images/dong/dongKawaii.JPG' },
  { id: '2', name: 'Banh Mi Fighter', cost: 3, damage: 4, health: 3, type: 'unit', image: '/images/dong/dongScream.JPG' },
  { id: '3', name: 'Pho Master', cost: 4, damage: 5, health: 4, type: 'unit', image: '/images/dong/dongKawaii_Closeup.JPG' },
  { id: '4', name: 'Spring Roll Shield', cost: 2, effect: 'Block 3 damage', type: 'spell', image: '/images/eboard/eboardGroup.JPG' },
  { id: '5', name: 'Tet Blessing', cost: 3, effect: 'Heal 5 HP', type: 'spell', image: '/images/eboard/theBoys.JPG' },
  { id: '6', name: 'VSA Spirit', cost: 5, damage: 7, health: 5, type: 'unit', image: '/images/eboard/jen_sab.JPG' },
  { id: '7', name: 'Study Session', cost: 1, effect: 'Draw 2 cards', type: 'spell', image: '/images/eboard/threeStack.JPG' },
  { id: '8', name: 'Cultural Dance', cost: 4, effect: 'Deal 4 damage to all enemies', type: 'spell', image: '/images/eboard/eboardGroup_Smile.JPG' },
]

export default function GameEngine({
  difficulty = 'normal',
  onGameEnd
}: {
  difficulty: 'easy' | 'normal' | 'hard' | 'expert' | 'legendary'
  onGameEnd?: (result: 'victory' | 'defeat') => void
}) {
  const [gameState, setGameState] = useState<GameState>({
    playerHealth: 30,
    botHealth: 30,
    playerMana: 3,
    botMana: 3,
    playerField: [],
    botField: [],
    playerHand: [],
    turn: 'player',
    gameStatus: 'playing',
    turnTimer: 30,
  })

  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [animations, setAnimations] = useState<string[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const botThinkingRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game
  useEffect(() => {
    drawInitialHand()
  }, [])

  // Turn timer
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.turn === 'player') {
      timerRef.current = setInterval(() => {
        setGameState(prev => {
          if (prev.turnTimer <= 1) {
            endTurn()
            return { ...prev, turnTimer: 30 }
          }
          return { ...prev, turnTimer: prev.turnTimer - 1 }
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameState.turn, gameState.gameStatus])

  // Bot AI
  useEffect(() => {
    if (gameState.turn === 'bot' && gameState.gameStatus === 'playing') {
      botThinkingRef.current = setTimeout(() => {
        executeBotTurn()
      }, 1500)
    }

    return () => {
      if (botThinkingRef.current) clearTimeout(botThinkingRef.current)
    }
  }, [gameState.turn, gameState.gameStatus])

  const drawInitialHand = () => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5)
    setGameState(prev => ({
      ...prev,
      playerHand: shuffled.slice(0, 4),
    }))
  }

  const drawCard = () => {
    const availableCards = INITIAL_CARDS.filter(
      card => !gameState.playerHand.some(h => h.id === card.id)
    )
    if (availableCards.length > 0 && gameState.playerHand.length < 8) {
      const newCard = availableCards[Math.floor(Math.random() * availableCards.length)]
      setGameState(prev => ({
        ...prev,
        playerHand: [...prev.playerHand, newCard],
      }))
    }
  }

  const playCard = (card: Card) => {
    if (card.cost > gameState.playerMana) {
      showAnimation('Not enough mana!')
      return
    }

    setGameState(prev => {
      const newState = { ...prev }
      newState.playerMana -= card.cost
      newState.playerHand = prev.playerHand.filter(c => c.id !== card.id)

      if (card.type === 'unit') {
        newState.playerField = [...prev.playerField, card]
        showAnimation(`Summoned ${card.name}!`)
      } else if (card.type === 'spell') {
        executeSpellEffect(card, 'player')
      }

      return newState
    })

    setSelectedCard(null)
  }

  const executeSpellEffect = (card: Card, caster: 'player' | 'bot') => {
    const isPlayer = caster === 'player'

    switch (card.effect) {
      case 'Heal 5 HP':
        setGameState(prev => ({
          ...prev,
          [isPlayer ? 'playerHealth' : 'botHealth']: Math.min(30, prev[isPlayer ? 'playerHealth' : 'botHealth'] + 5)
        }))
        showAnimation(`${isPlayer ? 'You' : 'Bot'} healed for 5 HP!`)
        break
      case 'Deal 4 damage to all enemies':
        setGameState(prev => ({
          ...prev,
          [!isPlayer ? 'playerField' : 'botField']: [],
          [!isPlayer ? 'playerHealth' : 'botHealth']: prev[!isPlayer ? 'playerHealth' : 'botHealth'] - 4
        }))
        showAnimation('Board cleared!')
        break
      case 'Draw 2 cards':
        if (isPlayer) {
          drawCard()
          drawCard()
        }
        showAnimation('Drew 2 cards!')
        break
      case 'Block 3 damage':
        showAnimation('Shield activated!')
        break
    }
  }

  const attackWithUnit = (attacker: Card, target: 'face' | Card) => {
    if (target === 'face') {
      setGameState(prev => ({
        ...prev,
        botHealth: prev.botHealth - (attacker.damage || 0)
      }))
      showAnimation(`${attacker.name} attacks for ${attacker.damage} damage!`)
    } else {
      // Unit combat logic
      const targetUnit = target as Card
      showAnimation(`${attacker.name} battles ${targetUnit.name}!`)
    }

    checkWinCondition()
  }

  const executeBotTurn = () => {
    const botDifficulty = {
      easy: 0.3,
      normal: 0.5,
      hard: 0.7,
      expert: 0.85,
      legendary: 0.95,
    }[difficulty]

    // Bot plays random cards based on difficulty
    const botMana = gameState.botMana
    const playableCards = INITIAL_CARDS.filter(c => c.cost <= botMana)

    if (playableCards.length > 0 && Math.random() < botDifficulty) {
      const cardToPlay = playableCards[Math.floor(Math.random() * playableCards.length)]

      setGameState(prev => {
        const newState = { ...prev }
        newState.botMana -= cardToPlay.cost

        if (cardToPlay.type === 'unit') {
          newState.botField = [...prev.botField, cardToPlay]
          showAnimation(`Bot summoned ${cardToPlay.name}!`)
        } else {
          executeSpellEffect(cardToPlay, 'bot')
        }

        return newState
      })
    }

    // Bot units attack
    gameState.botField.forEach(unit => {
      if (gameState.playerField.length > 0 && Math.random() < 0.5) {
        // Attack random player unit
        const target = gameState.playerField[Math.floor(Math.random() * gameState.playerField.length)]
        showAnimation(`Bot's ${unit.name} attacks ${target.name}!`)
      } else {
        // Attack player directly
        setGameState(prev => ({
          ...prev,
          playerHealth: prev.playerHealth - (unit.damage || 0)
        }))
        showAnimation(`Bot's ${unit.name} attacks you for ${unit.damage} damage!`)
      }
    })

    setTimeout(() => {
      endTurn()
    }, 1000)
  }

  const endTurn = () => {
    setGameState(prev => ({
      ...prev,
      turn: prev.turn === 'player' ? 'bot' : 'player',
      playerMana: prev.turn === 'bot' ? Math.min(10, prev.playerMana + 1) : prev.playerMana,
      botMana: prev.turn === 'player' ? Math.min(10, prev.botMana + 1) : prev.botMana,
      turnTimer: 30,
    }))

    if (gameState.turn === 'bot') {
      drawCard()
    }
  }

  const checkWinCondition = () => {
    if (gameState.botHealth <= 0) {
      setGameState(prev => ({ ...prev, gameStatus: 'victory' }))
      onGameEnd?.('victory')
    } else if (gameState.playerHealth <= 0) {
      setGameState(prev => ({ ...prev, gameStatus: 'defeat' }))
      onGameEnd?.('defeat')
    }
  }

  const showAnimation = (text: string) => {
    setAnimations(prev => [...prev, text])
    setTimeout(() => {
      setAnimations(prev => prev.slice(1))
    }, 2000)
  }

  const resetGame = () => {
    setGameState({
      playerHealth: 30,
      botHealth: 30,
      playerMana: 3,
      botMana: 3,
      playerField: [],
      botField: [],
      playerHand: [],
      turn: 'player',
      gameStatus: 'playing',
      turnTimer: 30,
    })
    drawInitialHand()
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-4 h-[700px] relative overflow-hidden">
      {/* Game Status Overlay */}
      <AnimatePresence>
        {gameState.gameStatus !== 'playing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-gray-900 rounded-xl p-8 text-center"
            >
              {gameState.gameStatus === 'victory' ? (
                <>
                  <Trophy className="w-16 h-16 text-gold mx-auto mb-4" />
                  <h2 className="text-4xl font-bold text-gold mb-2">Victory!</h2>
                  <p className="text-white mb-4">You defeated the AI!</p>
                </>
              ) : (
                <>
                  <Swords className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <h2 className="text-4xl font-bold text-red-500 mb-2">Defeat</h2>
                  <p className="text-white mb-4">Try again!</p>
                </>
              )}
              <button
                onClick={resetGame}
                className="btn-primary flex items-center mx-auto"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation Notifications */}
      <AnimatePresence>
        {animations.map((text, index) => (
          <motion.div
            key={`${text}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold/90 text-white px-6 py-3 rounded-lg font-bold z-40 pointer-events-none"
          >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Game Board */}
      <div className="h-full flex flex-col">
        {/* Bot Area */}
        <div className="flex-1 border-b border-gray-700 p-2">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-white font-bold">{gameState.botHealth}/30</span>
            </div>
            <span className="text-gray-400">AI Bot ({difficulty})</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold">{gameState.botMana}/10</span>
            </div>
          </div>

          {/* Bot Field */}
          <div className="flex space-x-2 justify-center min-h-[100px]">
            {gameState.botField.map((card, index) => (
              <motion.div
                key={`bot-${card.id}-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-24 bg-gray-800 rounded-lg p-1 border-2 border-red-500"
              >
                <div className="relative h-12 rounded">
                  <Image src={card.image} alt={card.name} fill className="object-cover rounded" />
                </div>
                <div className="text-xs text-center text-white mt-1">{card.name}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-yellow-400">{card.damage}</span>
                  <span className="text-red-400">{card.health}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Center Info */}
        <div className="py-2 bg-gray-800/50 flex justify-center items-center space-x-8">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="text-white hover:text-gold"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gold" />
            <span className="text-white font-bold">{gameState.turnTimer}s</span>
          </div>

          <div className={`px-4 py-1 rounded ${gameState.turn === 'player' ? 'bg-green-600' : 'bg-red-600'}`}>
            <span className="text-white font-bold">
              {gameState.turn === 'player' ? 'Your Turn' : "Bot's Turn"}
            </span>
          </div>

          <button
            onClick={endTurn}
            disabled={gameState.turn !== 'player'}
            className="bg-gold text-black px-4 py-1 rounded font-bold disabled:opacity-50"
          >
            End Turn
          </button>
        </div>

        {/* Player Area */}
        <div className="flex-1 p-2">
          {/* Player Field */}
          <div className="flex space-x-2 justify-center min-h-[100px] mb-2">
            {gameState.playerField.map((card, index) => (
              <motion.div
                key={`player-${card.id}-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="w-20 h-24 bg-gray-800 rounded-lg p-1 border-2 border-green-500 cursor-pointer"
                onClick={() => attackWithUnit(card, 'face')}
              >
                <div className="relative h-12 rounded">
                  <Image src={card.image} alt={card.name} fill className="object-cover rounded" />
                </div>
                <div className="text-xs text-center text-white mt-1">{card.name}</div>
                <div className="flex justify-between text-xs">
                  <span className="text-yellow-400">{card.damage}</span>
                  <span className="text-red-400">{card.health}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Player Info */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-white font-bold">{gameState.playerHealth}/30</span>
            </div>
            <span className="text-gray-400">You</span>
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold">{gameState.playerMana}/10</span>
            </div>
          </div>

          {/* Player Hand */}
          <div className="flex space-x-2 justify-center">
            {gameState.playerHand.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ y: -10 }}
                className={`w-24 h-32 bg-gray-800 rounded-lg p-1 cursor-pointer border-2 ${
                  selectedCard?.id === card.id ? 'border-gold' : 'border-gray-600'
                } ${card.cost > gameState.playerMana ? 'opacity-50' : ''}`}
                onClick={() => {
                  if (selectedCard?.id === card.id) {
                    playCard(card)
                  } else {
                    setSelectedCard(card)
                  }
                }}
              >
                <div className="relative h-16 rounded">
                  <Image src={card.image} alt={card.name} fill className="object-cover rounded" />
                </div>
                <div className="text-xs text-center text-white mt-1">{card.name}</div>
                <div className="text-xs text-center text-blue-400">Cost: {card.cost}</div>
                {card.type === 'unit' ? (
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-yellow-400">⚔ {card.damage}</span>
                    <span className="text-red-400">❤ {card.health}</span>
                  </div>
                ) : (
                  <div className="text-xs text-center text-purple-400 mt-1">
                    {card.effect}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}