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
  executiveBoard: {
    title: 'Executive Board',
    description: 'Meet the leaders of ISU VSA and learn how they support Vietnamese culture on campus.',
    keywords: ['executive board', 'student leadership', 'ISU VSA officers'],
  },
  events: {
    title: 'Upcoming Events',
    description: 'Stay up to date with ISU VSA activities, from cultural celebrations to community gatherings.',
    keywords: ['VSA events', 'Vietnamese culture events', 'Iowa State student activities'],
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with ISU VSA. We welcome students, faculty, alumni, and community members interested in Vietnamese culture.',
    keywords: ['contact VSA', 'email', 'location', 'Memorial Union', 'Ames Iowa'],
  },
  gallery: {
    title: 'Photo Gallery',
    description: 'Browse photos from ISU VSA events, cultural celebrations, and community gatherings.',
    keywords: ['VSA photos', 'event gallery', 'Vietnamese culture', 'student activities', 'Iowa State'],
  },
}
