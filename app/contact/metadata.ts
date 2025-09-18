import { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us',
  description: 'Get in touch with ISU VSA. Email us at isuvsa@gmail.com or visit us at Memorial Union. We welcome all students interested in Vietnamese culture.',
  path: '/contact',
  keywords: ['contact VSA', 'email', 'Memorial Union', 'Ames Iowa', 'get involved', 'Vietnamese student association'],
})