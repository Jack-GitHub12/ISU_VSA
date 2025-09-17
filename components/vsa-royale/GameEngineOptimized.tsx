'use client'

import { useState, useEffect, useCallback, useRef, memo } from 'react'
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

// Memoized card component for better performance
const GameCard = memo(({
  card,
  isSelected,
  isPlayable,
  onClick,
  variant = 'hand'
}: {
  card: Card
  isSelected?: boolean
  isPlayable?: boolean
  onClick?: () => void
  variant?: 'hand' | 'field' | 'bot'
}) => {
  const borderColor = variant === 'bot' ? 'border-red-500' : variant === 'field' ? 'border-green-500' :
                      isSelected ? 'border-gold' : 'border-gray-600'

  return (
    <div
      className={`relative w-20 h-24 bg-gray-800 rounded-lg p-1 cursor-pointer border-2 ${borderColor}
                  transition-transform duration-200 hover:scale-105 ${!isPlayable ? 'opacity-50' : ''}`}
      onClick={onClick}
    >
      <div className="relative h-12 rounded overflow-hidden">
        <Image
          src={card.image}
          alt={card.name}
          width={80}
          height={48}
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="text-[10px] text-center text-white mt-0.5 truncate">{card.name}</div>
      {card.type === 'unit' ? (
        <div className="flex justify-between text-[10px] mt-0.5">
          <span className="text-yellow-400">⚔{card.damage}</span>
          <span className="text-red-400">❤{card.health}</span>
        </div>
      ) : (
        <div className="text-[9px] text-center text-purple-400 truncate">
          {card.effect?.substring(0, 10)}...
        </div>
      )}
      {variant === 'hand' && (
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
          {card.cost}
        </div>
      )}
    </div>
  )
})

GameCard.displayName = 'GameCard'

const INITIAL_CARDS: Card[] = [
  { id: '1', name: 'Dong Warrior', cost: 2, damage: 3, health: 2, type: 'unit', image: '/images/dong/dongKawaii.JPG' },
  { id: '2', name: 'Banh Mi Fighter', cost: 3, damage: 4, health: 3, type: 'unit', image: '/images/dong/dongScream.JPG' },
  { id: '3', name: 'Pho Master', cost: 4, damage: 5, health: 4, type: 'unit', image: '/images/dong/dongKawaii_Closeup.JPG' },
  { id: '4', name: 'Spring Roll', cost: 2, effect: 'Block 3 damage', type: 'spell', image: '/images/eboard/eboardGroup.JPG' },
  { id: '5', name: 'Tet Blessing', cost: 3, effect: 'Heal 5 HP', type: 'spell', image: '/images/eboard/theBoys.JPG' },
  { id: '6', name: 'VSA Spirit', cost: 5, damage: 7, health: 5, type: 'unit', image: '/images/eboard/jen_sab.JPG' },
]

export default function GameEngineOptimized({
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
  const [notification, setNotification] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize game
  useEffect(() => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5)
    setGameState(prev => ({
      ...prev,
      playerHand: shuffled.slice(0, 3),
    }))
  }, [])

  // Turn timer - simplified
  useEffect(() => {
    if (gameState.gameStatus === 'playing' && gameState.turn === 'player') {
      const timer = setInterval(() => {
        setGameState(prev => {
          if (prev.turnTimer <= 1) {
            endTurn()
            return { ...prev, turnTimer: 30 }
          }
          return { ...prev, turnTimer: prev.turnTimer - 1 }
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameState.turn, gameState.gameStatus])

  // Bot turn - simplified AI
  useEffect(() => {
    if (gameState.turn === 'bot' && gameState.gameStatus === 'playing') {
      const timer = setTimeout(() => {
        executeBotTurn()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [gameState.turn])

  const executeBotTurn = useCallback(() => {
    const botStrength = { easy: 0.3, normal: 0.5, hard: 0.7, expert: 0.85, legendary: 0.95 }[difficulty]

    setGameState(prev => {
      const newState = { ...prev }

      // Bot plays a card if possible
      const playableCards = INITIAL_CARDS.filter(c => c.cost <= newState.botMana)
      if (playableCards.length > 0 && Math.random() < botStrength) {
        const card = playableCards[Math.floor(Math.random() * playableCards.length)]
        newState.botMana -= card.cost

        if (card.type === 'unit' && newState.botField.length < 5) {
          newState.botField = [...newState.botField, card]
          showNotification(`Bot played ${card.name}`)
        }
      }

      // Bot attacks with units
      newState.botField.forEach(unit => {
        newState.playerHealth -= unit.damage || 0
      })

      if (newState.playerHealth <= 0) {
        newState.gameStatus = 'defeat'
        onGameEnd?.('defeat')
      }

      return newState
    })

    setTimeout(endTurn, 500)
  }, [difficulty, onGameEnd])

  const playCard = useCallback((card: Card) => {
    if (card.cost > gameState.playerMana) {
      showNotification('Not enough mana!')
      return
    }

    setGameState(prev => {
      const newState = { ...prev }
      newState.playerMana -= card.cost
      newState.playerHand = prev.playerHand.filter(c => c.id !== card.id)

      if (card.type === 'unit' && newState.playerField.length < 5) {
        newState.playerField = [...prev.playerField, card]
        showNotification(`Played ${card.name}`)
      } else if (card.type === 'spell') {
        // Simple spell effects
        if (card.effect?.includes('Heal')) {
          newState.playerHealth = Math.min(30, newState.playerHealth + 5)
          showNotification('Healed 5 HP!')
        }
      }

      return newState
    })

    setSelectedCard(null)
  }, [gameState.playerMana])

  const attackWithUnit = useCallback((attacker: Card) => {
    setGameState(prev => {
      const newState = { ...prev }
      newState.botHealth -= attacker.damage || 0

      if (newState.botHealth <= 0) {
        newState.gameStatus = 'victory'
        onGameEnd?.('victory')
      }

      return newState
    })

    showNotification(`${attacker.name} attacks!`)
  }, [onGameEnd])

  const endTurn = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      turn: prev.turn === 'player' ? 'bot' : 'player',
      playerMana: prev.turn === 'bot' ? Math.min(10, prev.playerMana + 1) : prev.playerMana,
      botMana: prev.turn === 'player' ? Math.min(10, prev.botMana + 1) : prev.botMana,
      turnTimer: 30,
    }))

    // Draw card for player
    if (gameState.turn === 'bot' && gameState.playerHand.length < 6) {
      const availableCards = INITIAL_CARDS.filter(c =>
        !gameState.playerHand.some(h => h.id === c.id)
      )
      if (availableCards.length > 0) {
        const newCard = availableCards[Math.floor(Math.random() * availableCards.length)]
        setGameState(prev => ({
          ...prev,
          playerHand: [...prev.playerHand, newCard]
        }))
      }
    }
  }, [gameState.turn, gameState.playerHand])

  const showNotification = (text: string) => {
    setNotification(text)
    setTimeout(() => setNotification(''), 2000)
  }

  const resetGame = () => {
    const shuffled = [...INITIAL_CARDS].sort(() => Math.random() - 0.5)
    setGameState({
      playerHealth: 30,
      botHealth: 30,
      playerMana: 3,
      botMana: 3,
      playerField: [],
      botField: [],
      playerHand: shuffled.slice(0, 3),
      turn: 'player',
      gameStatus: 'playing',
      turnTimer: 30,
    })
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl p-3 h-[600px] relative">
      {/* Game Over Overlay */}
      {gameState.gameStatus !== 'playing' && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center rounded-xl">
          <div className="bg-gray-900 rounded-xl p-6 text-center">
            {gameState.gameStatus === 'victory' ? (
              <>
                <Trophy className="w-12 h-12 text-gold mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-gold mb-2">Victory!</h2>
              </>
            ) : (
              <>
                <Swords className="w-12 h-12 text-red-500 mx-auto mb-3" />
                <h2 className="text-3xl font-bold text-red-500 mb-2">Defeat</h2>
              </>
            )}
            <button
              onClick={resetGame}
              className="bg-gold text-black px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4 inline mr-1" />
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                        bg-gold/90 text-black px-4 py-2 rounded-full font-bold z-40 pointer-events-none">
          {notification}
        </div>
      )}

      {/* Game Board */}
      <div className="h-full flex flex-col">
        {/* Bot Area */}
        <div className="flex-1 border-b border-gray-700 pb-1">
          <div className="flex justify-between items-center mb-1 px-2">
            <div className="flex items-center space-x-1 text-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-white font-bold">{gameState.botHealth}</span>
            </div>
            <span className="text-gray-400 text-xs">AI ({difficulty})</span>
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-white font-bold">{gameState.botMana}</span>
            </div>
          </div>

          {/* Bot Field */}
          <div className="flex justify-center space-x-1 min-h-[100px] px-2">
            {gameState.botField.slice(0, 5).map((card, index) => (
              <GameCard key={`bot-${card.id}-${index}`} card={card} variant="bot" />
            ))}
          </div>
        </div>

        {/* Center Controls */}
        <div className="py-2 bg-gray-800/50 flex justify-center items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-white text-sm font-bold">{gameState.turnTimer}s</span>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            gameState.turn === 'player' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}>
            {gameState.turn === 'player' ? 'Your Turn' : "Bot's Turn"}
          </div>

          <button
            onClick={endTurn}
            disabled={gameState.turn !== 'player'}
            className="bg-gold text-black px-3 py-1 rounded-full text-sm font-bold disabled:opacity-50
                       hover:scale-105 transition-transform disabled:hover:scale-100"
          >
            End Turn
          </button>
        </div>

        {/* Player Area */}
        <div className="flex-1 pt-1">
          {/* Player Field */}
          <div className="flex justify-center space-x-1 min-h-[100px] mb-1 px-2">
            {gameState.playerField.slice(0, 5).map((card, index) => (
              <GameCard
                key={`field-${card.id}-${index}`}
                card={card}
                variant="field"
                onClick={() => attackWithUnit(card)}
              />
            ))}
          </div>

          {/* Player Stats */}
          <div className="flex justify-between items-center mb-1 px-2">
            <div className="flex items-center space-x-1 text-sm">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-white font-bold">{gameState.playerHealth}</span>
            </div>
            <span className="text-gray-400 text-xs">You</span>
            <div className="flex items-center space-x-1 text-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-white font-bold">{gameState.playerMana}</span>
            </div>
          </div>

          {/* Player Hand */}
          <div className="flex justify-center space-x-1 px-2">
            {gameState.playerHand.slice(0, 6).map((card) => (
              <GameCard
                key={card.id}
                card={card}
                isSelected={selectedCard?.id === card.id}
                isPlayable={card.cost <= gameState.playerMana}
                onClick={() => {
                  if (selectedCard?.id === card.id) {
                    playCard(card)
                  } else {
                    setSelectedCard(card)
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}