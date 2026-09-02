// Site-wide constants and configuration
export const SITE_CONFIG = {
  name: 'VSA',
  affiliation: 'at Iowa State University',
  fullName: 'Vietnamese Student Association at Iowa State University',
  // Name exactly as listed in the ISU Student Organization Database
  officialName: 'Vietnamese Student Association (VSA)',
  description:
    'Est. 2015 @ Iowa State. Bi-weekly GBMs on Thursdays from 6:00–7:30 PM in Pearson Hall 2105.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://isuvsa.org',

  // Contact Information
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@isuvsa.org',
  gmail: 'info@isuvsa.org', // Legacy placeholder
  location: 'Pearson Hall 2105, Ames, IA',

  // Social Media
  social: {
    instagram: 'https://www.instagram.com/isuvsa/',
    instagram_handle: '@isuvsa',
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.com/invite/Yg7We4pECw',
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@isuvsa.org',
  },
} as const

// Image paths and defaults
export const IMAGES = {
  // Default placeholders
  logo: '/images/logo.png',
  placeholder: {
    general: '/images/placeholder.jpg',
    board: '/images/board/placeholder.jpg',
    event: '/images/events/placeholder.jpg',
    gallery: '/images/gallery/placeholder.jpg',
    recipe: '/images/recipes/placeholder.jpg',
  },

  // Fallbacks for missing images
  fallbacks: {
    board: '/images/board/default-profile.jpg',
    event: '/images/events/default-event.jpg',
    user: '/images/default-user.jpg',
  },
} as const

// Color scheme
export const COLORS = {
  cardinal: '#8B0000',
  cardinalDark: '#660000',
  gold: '#FFD700',
  goldDark: '#DAA520',
  charcoal: '#2D3748',
  cream: '#F7FAFC',
} as const

// University branding
export const UNIVERSITY = {
  name: 'Iowa State University',
  abbreviation: 'ISU',
  colors: {
    cardinal: '#C8102E',
    gold: '#F1BE48',
  },
} as const

// Required statements (ISU Student Engagement constitution guidelines, Articles III & IV)
export const LEGAL = {
  nonDiscrimination:
    'Iowa State University and Vietnamese Student Association do not discriminate on the basis of genetic information, pregnancy, physical or mental disability, race, ethnicity, sex, color, religion, national origin, age, marital status, sexual orientation, or status as a U.S. Veteran.',
  compliance:
    'Vietnamese Student Association abides by and supports established Iowa State University policies, State and Federal Laws and follows local ordinances and regulations. Vietnamese Student Association agrees to annually complete President\'s and Treasurer\'s Training.',
  disclaimer:
    'The views and opinions expressed on this site are strictly those of the Vietnamese Student Association, a registered student organization at Iowa State University. The contents of this site have not been reviewed or approved by Iowa State University.',
  sodbUrl: 'https://www.stuorg.iastate.edu/vsaisu',
} as const

// Event categories
export const EVENT_CATEGORIES = [
  'cultural',
  'culinary',
  'educational',
  'gaming',
  'academic',
  'social',
  'workshop',
] as const

// Member interests
export const MEMBER_INTERESTS = [
  'Cultural Events',
  'Social Activities',
  'Community Service',
  'Professional Development',
  'Sports',
  'Cooking',
  'Dance',
  'Music',
  'Language Learning',
] as const

// Academic years
export const ACADEMIC_YEARS = [
  { value: 'freshman', label: 'Freshman' },
  { value: 'sophomore', label: 'Sophomore' },
  { value: 'junior', label: 'Junior' },
  { value: 'senior', label: 'Senior' },
  { value: 'graduate', label: 'Graduate Student' },
] as const

// Navigation structure
type NavigationItem = {
  name: string;
  href: string;
  icon: string;
  hidden?: boolean;
  special?: boolean;
}

export const NAVIGATION: readonly NavigationItem[] = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'E-Board', href: '/about/board', icon: '🧑‍🤝‍🧑' },
  { name: 'ACCE', href: '/acce', icon: '🌏' },
  { name: 'Events', href: '/events/upcoming', icon: '🎉', hidden: true },
  { name: 'Gallery', href: '/gallery', icon: '📸' },
  { name: 'Contact', href: '/contact', icon: '📧' },
] as const

// SEO defaults
export const SEO = {
  defaultTitle: `${SITE_CONFIG.name} - ${SITE_CONFIG.fullName}`,
  titleTemplate: `%s | ${SITE_CONFIG.name}`,
  description: SITE_CONFIG.description,
  keywords: [
    'Vietnamese Student Association',
    'Iowa State University',
    'ISU',
    'Vietnamese culture',
    'student organization',
    'cultural events',
    'Vietnamese community',
    'Ames',
    'Iowa',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
      },
    ],
  },
} as const

// Feature flags
export const FEATURES = {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableRemoteLogging: process.env.NEXT_PUBLIC_ENABLE_REMOTE_LOGGING === 'true',
  enableConsoleLogging:
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGS === 'true',
  enableTestMode: process.env.NODE_ENV === 'test',
} as const

// API endpoints
export const API_ENDPOINTS = {
  instagram: '/api/instagram',
  events: '/api/events',
  membership: '/api/membership',
  contact: '/api/contact',
  logs: '/api/logs',
} as const
