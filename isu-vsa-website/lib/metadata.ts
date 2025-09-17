import { Metadata } from 'next'
import { SITE_CONFIG } from './constants'

interface GenerateMetadataProps {
  title: string
  description: string
  path?: string
  image?: string
  keywords?: string[]
  type?: 'website' | 'article' | 'event'
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image = '/images/eboard/eboardGroup.JPG',
  keywords = [],
  type = 'website',
}: GenerateMetadataProps): Metadata {
  const url = `${SITE_CONFIG.url}${path}`
  const fullTitle = `${title} | ${SITE_CONFIG.name}`

  return {
    title: fullTitle,
    description,
    keywords: [
      'ISU VSA',
      'Iowa State University',
      'Vietnamese Student Association',
      ...keywords,
    ].join(', '),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

// Pre-defined metadata for common pages
export const pageMetadata = {
  home: {
    title: SITE_CONFIG.fullName,
    description: SITE_CONFIG.description,
    keywords: ['Vietnamese culture', 'student organization', 'Iowa State', 'cultural events', 'Tet festival'],
  },
  about: {
    title: 'About ISU VSA',
    description: 'Learn about the Iowa State University Vietnamese Student Association, our mission, history, and executive board.',
    keywords: ['about VSA', 'mission', 'history', 'executive board', 'Vietnamese community'],
  },
  events: {
    title: 'Events & Activities',
    description: 'Join ISU VSA for cultural celebrations, Tet festivals, social gatherings, and educational workshops throughout the year.',
    keywords: ['VSA events', 'Tet festival', 'cultural shows', 'Vietnamese celebrations', 'student activities'],
  },
  membership: {
    title: 'Become a Member',
    description: 'Join ISU VSA to connect with the Vietnamese community, participate in cultural events, and develop leadership skills.',
    keywords: ['VSA membership', 'join VSA', 'student organization', 'member benefits', 'how to join'],
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with ISU VSA. We welcome students, faculty, alumni, and community members interested in Vietnamese culture.',
    keywords: ['contact VSA', 'email', 'location', 'Memorial Union', 'get involved'],
  },
  gallery: {
    title: 'Photo Gallery',
    description: 'Browse photos from ISU VSA events, cultural celebrations, and community gatherings.',
    keywords: ['VSA photos', 'event gallery', 'Vietnamese culture', 'student activities', 'Iowa State'],
  },
  vsaRoyale: {
    title: 'VSA Royale Game',
    description: 'Play VSA Royale - a strategic card game featuring Vietnamese culture, ISU traditions, and exciting gameplay!',
    keywords: ['VSA Royale', 'card game', 'online game', 'Vietnamese game', 'strategy game'],
  },
  resources: {
    title: 'Resources',
    description: 'Access Vietnamese language resources, cultural guides, recipes, and study materials for ISU students.',
    keywords: ['Vietnamese resources', 'language learning', 'cultural library', 'recipes', 'study resources'],
  },
}