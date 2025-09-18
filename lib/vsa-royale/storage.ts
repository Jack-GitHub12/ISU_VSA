import { Player, GameSettings, Achievement } from '@/types/vsa-royale'
import { getStarterDeck } from './cards'

const STORAGE_KEYS = {
  PLAYER: 'vsa_royale_player',
  SETTINGS: 'vsa_royale_settings',
  ACHIEVEMENTS: 'vsa_royale_achievements',
  STATS: 'vsa_royale_stats',
  DECK: 'vsa_royale_deck',
  CAMPAIGN_PROGRESS: 'vsa_royale_campaign',
}

/**
 * Initialize player data if not exists
 */
export function initializePlayer(): Player {
  const defaultPlayer: Player = {
    id: generatePlayerId(),
    username: `Cyclone${Math.floor(Math.random() * 9999)}`,
    level: 1,
    xp: 0,
    wins: 0,
    losses: 0,
    currentArena: 1,
    cardCollection: getStarterDeck(),
    currentDeck: getStarterDeck().slice(0, 8),
  }

  const stored = getPlayer()
  if (!stored) {
    savePlayer(defaultPlayer)
    return defaultPlayer
  }
  return stored
}

/**
 * Get player data from local storage
 */
export function getPlayer(): Player | null {
  if (typeof window === 'undefined') return null

  try {
    const data = localStorage.getItem(STORAGE_KEYS.PLAYER)
    return data ? JSON.parse(data) : null
  } catch {
    // console.error('Failed to load player data')
    return null
  }
}

/**
 * Save player data to local storage
 */
export function savePlayer(player: Player): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEYS.PLAYER, JSON.stringify(player))
  } catch {
    // console.error('Failed to save player data:', error)
  }
}

/**
 * Update player stats after a match
 */
export function updatePlayerStats(won: boolean, xpGained: number = 10): void {
  const player = getPlayer()
  if (!player) return

  player.wins += won ? 1 : 0
  player.losses += won ? 0 : 1
  player.xp += xpGained

  // Level up logic
  const xpNeeded = player.level * 100
  if (player.xp >= xpNeeded) {
    player.level += 1
    player.xp = player.xp - xpNeeded

    // Unlock new arena every 5 levels
    if (player.level % 5 === 0) {
      player.currentArena = Math.min(player.currentArena + 1, 5)
    }
  }

  savePlayer(player)
}

/**
 * Get game settings
 */
export function getSettings(): GameSettings {
  if (typeof window === 'undefined') {
    return getDefaultSettings()
  }

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS)
    return data ? JSON.parse(data) : getDefaultSettings()
  } catch {
    // console.error('Failed to load settings:', error)
    return getDefaultSettings()
  }
}

/**
 * Save game settings
 */
export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings))
  } catch {
    // console.error('Failed to save settings:', error)
  }
}

/**
 * Get default settings
 */
function getDefaultSettings(): GameSettings {
  return {
    soundEnabled: true,
    musicVolume: 0.7,
    sfxVolume: 0.8,
    graphicsQuality: 'medium',
    notifications: true,
  }
}

/**
 * Get achievements
 */
export function getAchievements(): Achievement[] {
  if (typeof window === 'undefined') return []

  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    return data ? JSON.parse(data) : getDefaultAchievements()
  } catch {
    // console.error('Failed to load achievements:', error)
    return getDefaultAchievements()
  }
}

/**
 * Unlock an achievement
 */
export function unlockAchievement(achievementId: string): void {
  const achievements = getAchievements()
  const achievement = achievements.find((a) => a.id === achievementId)

  if (achievement && !achievement.isUnlocked) {
    achievement.isUnlocked = true
    achievement.progress = achievement.maxProgress

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
    }
  }
}

/**
 * Update achievement progress
 */
export function updateAchievementProgress(achievementId: string, progress: number): void {
  const achievements = getAchievements()
  const achievement = achievements.find((a) => a.id === achievementId)

  if (achievement && !achievement.isUnlocked) {
    achievement.progress = Math.min(progress, achievement.maxProgress)

    if (achievement.progress >= achievement.maxProgress) {
      achievement.isUnlocked = true
    }

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
    }
  }
}

/**
 * Get default achievements
 */
function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first_win',
      name: 'First Victory',
      description: 'Win your first battle',
      icon: '🏆',
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
    },
    {
      id: 'tet_champion',
      name: 'Tết Champion',
      description: 'Win 10 battles during Tết season',
      icon: '🧧',
      progress: 0,
      maxProgress: 10,
      isUnlocked: false,
    },
    {
      id: 'executive_board',
      name: 'Executive Board',
      description: 'Collect all executive board cards',
      icon: '👥',
      progress: 0,
      maxProgress: 4,
      isUnlocked: false,
    },
    {
      id: 'eggroll_master',
      name: 'Eggroll Master',
      description: 'Win a battle with perfect eggroll management',
      icon: '🥟',
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
    },
    {
      id: 'cultural_ambassador',
      name: 'Cultural Ambassador',
      description: 'Play 100 matches',
      icon: '🌏',
      progress: 0,
      maxProgress: 100,
      isUnlocked: false,
    },
    {
      id: 'ai_slayer',
      name: 'AI Slayer',
      description: 'Beat Legendary difficulty',
      icon: '🤖',
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
    },
    {
      id: 'puzzle_master',
      name: 'Puzzle Master',
      description: 'Complete all puzzles',
      icon: '🧩',
      progress: 0,
      maxProgress: 100,
      isUnlocked: false,
    },
    {
      id: 'speed_runner',
      name: 'Speed Runner',
      description: 'Win a battle in under 1 minute',
      icon: '⚡',
      progress: 0,
      maxProgress: 1,
      isUnlocked: false,
    },
  ]
}

/**
 * Save current deck
 */
export function saveDeck(deck: string[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEYS.DECK, JSON.stringify(deck))
  } catch {
    // console.error('Failed to save deck:', error)
  }
}

/**
 * Load saved deck
 */
export function loadDeck(): string[] | null {
  if (typeof window === 'undefined') return null

  try {
    const data = localStorage.getItem(STORAGE_KEYS.DECK)
    return data ? JSON.parse(data) : null
  } catch {
    // console.error('Failed to load deck:', error)
    return null
  }
}

/**
 * Save campaign progress
 */
export function saveCampaignProgress(level: number, stars: number): void {
  if (typeof window === 'undefined') return

  try {
    const progress = getCampaignProgress()
    progress[`level_${level}`] = stars
    localStorage.setItem(STORAGE_KEYS.CAMPAIGN_PROGRESS, JSON.stringify(progress))
  } catch {
    // console.error('Failed to save campaign progress:', error)
  }
}

/**
 * Get campaign progress
 */
export function getCampaignProgress(): Record<string, number> {
  if (typeof window === 'undefined') return {}

  try {
    const data = localStorage.getItem(STORAGE_KEYS.CAMPAIGN_PROGRESS)
    return data ? JSON.parse(data) : {}
  } catch {
    // console.error('Failed to load campaign progress:', error)
    return {}
  }
}

/**
 * Clear all game data
 */
export function clearAllData(): void {
  if (typeof window === 'undefined') return

  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key)
  })
}

/**
 * Export game data (for backup)
 */
export function exportGameData(): string {
  const data = {
    player: getPlayer(),
    settings: getSettings(),
    achievements: getAchievements(),
    deck: loadDeck(),
    campaign: getCampaignProgress(),
    exportDate: new Date().toISOString(),
  }

  return JSON.stringify(data, null, 2)
}

/**
 * Import game data (from backup)
 */
export function importGameData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData)

    if (data.player) savePlayer(data.player)
    if (data.settings) saveSettings(data.settings)
    if (data.achievements) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(data.achievements))
    }
    if (data.deck) saveDeck(data.deck)
    if (data.campaign) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGN_PROGRESS, JSON.stringify(data.campaign))
    }

    return true
  } catch {
    // console.error('Failed to import game data:', error)
    return false
  }
}

/**
 * Generate a unique player ID
 */
function generatePlayerId(): string {
  return `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
