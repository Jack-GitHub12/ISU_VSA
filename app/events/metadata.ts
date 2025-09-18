import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Events & Activities',
  description: 'Join ISU VSA for Tet festivals, cultural celebrations, BBQ cookouts, study nights, and volleyball tournaments throughout the year.',
  path: '/events',
  keywords: ['VSA events', 'Tet festival', 'cultural shows', 'BBQ cookout', 'study nights', 'volleyball', 'Vietnamese celebrations'],
  type: 'website',
})