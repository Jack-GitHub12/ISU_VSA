import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About ISU VSA',
  description: 'Learn about the Iowa State University Vietnamese Student Association, our mission to unite the community with Vietnamese culture, and meet our executive board.',
  path: '/about',
  keywords: ['about VSA', 'mission', 'Vietnamese culture', 'Iowa State', 'student organization', 'executive board'],
})