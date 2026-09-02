import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Upcoming Events',
  description:
    'Explore upcoming VSA at Iowa State events including cultural celebrations, workshops, socials, and more.',
  path: '/events/upcoming',
  keywords: ['VSA events', 'upcoming events', 'Iowa State', 'Vietnamese culture', 'student organization'],
})
