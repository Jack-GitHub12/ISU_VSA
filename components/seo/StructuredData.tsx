import Script from 'next/script'
import { SITE_CONFIG } from '@/lib/constants'

interface StructuredDataProps {
  type?: 'Organization' | 'Event' | 'Article' | 'Website'
  data?: any
}

export default function StructuredData({ type = 'Organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_CONFIG.fullName,
          alternateName: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
          logo: `${SITE_CONFIG.url}/images/logo.png`,
          description: SITE_CONFIG.description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2229 Lincoln Way',
            addressLocality: 'Ames',
            addressRegion: 'IA',
            postalCode: '50011',
            addressCountry: 'US',
          },
          contactPoint: {
            '@type': 'ContactPoint',
            email: SITE_CONFIG.email,
            contactType: 'customer service',
            availableLanguage: ['English', 'Vietnamese'],
          },
          sameAs: [
            SITE_CONFIG.social.instagram,
            'https://www.iastate.edu/student-organizations',
          ],
          memberOf: {
            '@type': 'EducationalOrganization',
            name: 'Iowa State University',
            url: 'https://www.iastate.edu',
          },
          foundingDate: '1998',
          areaServed: {
            '@type': 'City',
            name: 'Ames',
            containedInPlace: {
              '@type': 'State',
              name: 'Iowa',
            },
          },
        }

      case 'Event':
        return {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: data?.name || 'ISU VSA Event',
          description: data?.description || 'Join us for an exciting cultural event',
          startDate: data?.startDate,
          endDate: data?.endDate,
          location: {
            '@type': 'Place',
            name: data?.location || 'Memorial Union',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '2229 Lincoln Way',
              addressLocality: 'Ames',
              addressRegion: 'IA',
              postalCode: '50011',
              addressCountry: 'US',
            },
          },
          organizer: {
            '@type': 'Organization',
            name: SITE_CONFIG.fullName,
            url: SITE_CONFIG.url,
          },
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          isAccessibleForFree: data?.isFree !== false,
          ...data,
        }

      case 'Website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_CONFIG.name,
          alternateName: SITE_CONFIG.fullName,
          url: SITE_CONFIG.url,
          description: SITE_CONFIG.description,
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.fullName,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_CONFIG.url}/images/logo.png`,
            },
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        }

      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.title,
          description: data?.description,
          image: data?.image,
          datePublished: data?.datePublished,
          dateModified: data?.dateModified,
          author: {
            '@type': 'Organization',
            name: SITE_CONFIG.fullName,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.fullName,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_CONFIG.url}/images/logo.png`,
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url || SITE_CONFIG.url,
          },
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
      strategy="afterInteractive"
    />
  )
}