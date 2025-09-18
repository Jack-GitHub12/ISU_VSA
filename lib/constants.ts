// Site-wide constants and configuration
export const SITE_CONFIG = {
  name: 'ISU VSA',
  fullName: 'Iowa State University Vietnamese Student Association',
  description:
    'Uniting the Iowa State University community with the local Vietnamese community. Creating awareness about Vietnamese culture and history.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://isuvsa.org',

  // Contact Information
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'isuvsa@gmail.com',
  gmail: 'isuvsa@gmail.com', // Primary contact email
  location: 'Memorial Union, Ames, IA',

  // Social Media
  social: {
    instagram: 'https://www.instagram.com/isuvsa/',
    instagram_handle: '@isuvsa',
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || '#', // To be updated with actual Discord server
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'isuvsa@gmail.com',
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
  motto: 'Go Cyclones! 🌪️',
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
export const NAVIGATION = [
  { name: 'Home', href: '/', icon: '🏠' },
  {
    name: 'About',
    href: '/about',
    icon: '📖',
    subItems: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Executive Board', href: '/about/board' },
      { name: 'History', href: '/about/history' },
      { name: 'Constitution', href: '/about/constitution' },
    ],
  },
  {
    name: 'Events',
    href: '/events',
    icon: '🎉',
    subItems: [
      { name: 'Upcoming Events', href: '/events/upcoming' },
      { name: 'Past Events', href: '/events/past' },
      { name: 'Tết Celebration', href: '/events/tet' },
      { name: 'Cultural Shows', href: '/events/cultural-shows' },
    ],
  },
  { name: 'ACCE', href: '/acce', icon: '🌏', highlight: true },
  {
    name: 'Get Involved',
    href: '/get-involved',
    icon: '🤝',
    subItems: [
      { name: 'Membership', href: '/get-involved/membership' },
      { name: 'Committees', href: '/get-involved/committees' },
      { name: 'Volunteer', href: '/get-involved/volunteer' },
      { name: 'Newsletter', href: '/get-involved/newsletter' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    icon: '📚',
    subItems: [
      { name: 'Cultural Library', href: '/resources/cultural-library' },
      { name: 'Language Learning', href: '/resources/language' },
      { name: 'Recipes', href: '/resources/recipes' },
      { name: 'Study Resources', href: '/resources/study' },
    ],
  },
  { name: 'Gallery', href: '/gallery', icon: '📸' },
  { name: 'VSA Royale', href: '/vsa-royale', special: true, icon: '🎮' },
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
