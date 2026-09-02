import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import AnimatedPageWrapper from '@/components/layout/AnimatedPageWrapper'
import StructuredData from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL('https://isuvsa.org'),
  title: 'Vietnamese Student Association at Iowa State University',
  description:
    'Uniting the Iowa State University community with Vietnamese culture. Join VSA at Iowa State for cultural events, Tet festivals, community building, and academic support.',
  keywords: 'VSA at Iowa State, Iowa State University, Vietnamese Student Association, Vietnamese culture, Tet festival, cultural events, student organization, Ames Iowa, Vietnamese community',
  authors: [{ name: 'VSA at Iowa State' }],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Vietnamese Student Association at Iowa State University',
    description: 'Uniting the Iowa State University community with Vietnamese culture. Join us for cultural events, community building, and more!',
    url: 'https://isuvsa.org',
    siteName: 'VSA at Iowa State',
    images: [
      {
        url: '/images/eboard/eboardGroup.JPG',
        width: 1200,
        height: 630,
        alt: 'Vietnamese Student Association at Iowa State University',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vietnamese Student Association at Iowa State University',
    description: 'Uniting the Iowa State University community with Vietnamese culture',
    images: ['/images/eboard/eboardGroup.JPG'],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#CE1126',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-quicksand">
        <Script src="/scroll-optimize.js" strategy="afterInteractive" />
        <StructuredData type="Organization" />
        <StructuredData type="Website" />
        <Navbar />
        <main className="flex-grow">
          <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  )
}
