export interface Card {
  id: string
  name: string
  type: 'member' | 'spell' | 'building'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  cost: number
  hp?: number
  damage?: number
  attackSpeed?: number
  range?: number
  speed?: number
  description: string
  ability?: string
  imageUrl: string
}

export interface Player {
  id: string
  username: string
  level: number
  xp: number
  wins: number
  losses: number
  currentArena: number
  cardCollection: string[]
  currentDeck: string[]
}

export interface GameState {
  player1: PlayerGameState
  player2: PlayerGameState
  timer: number
  isOvertime: boolean
  winner?: string
}

export interface PlayerGameState {
  id: string
  hp: number
  towers: Tower[]
  eggrolls: number
  currentHand: Card[]
  nextCard: Card
  units: Unit[]
}

export interface Tower {
  id: string
  type: 'king' | 'princess'
  hp: number
  maxHp: number
  position: { x: number; y: number }
  isDestroyed: boolean
}

export interface Unit {
  id: string
  cardId: string
  hp: number
  position: { x: number; y: number }
  target?: { x: number; y: number }
  team: 'player' | 'enemy'
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  isUnlocked: boolean
}

export interface GameSettings {
  soundEnabled: boolean
  musicVolume: number
  sfxVolume: number
  graphicsQuality: 'low' | 'medium' | 'high'
  notifications: boolean
}
