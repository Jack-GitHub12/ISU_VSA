/**
 * Instagram API Configuration
 * 
 * To connect to the real Instagram API:
 * 1. Create a Facebook App at https://developers.facebook.com/
 * 2. Add Instagram Basic Display product
 * 3. Get your Instagram Access Token
 * 4. Add the token to your environment variables
 */

interface InstagramPost {
  id: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption?: string
  permalink: string
  timestamp: string
  username?: string
}

interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

/**
 * Fetches Instagram posts from the ISU VSA account
 * @param limit Number of posts to fetch
 * @returns Array of Instagram posts
 */
export async function fetchInstagramPosts(limit: number = 6): Promise<InstagramPost[]> {
  // Check if we have an Instagram access token
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN
  const instagramAccountId = process.env.NEXT_PUBLIC_INSTAGRAM_ACCOUNT_ID || 'isuvsa'

  if (!accessToken) {
    console.warn('Instagram access token not found. Using mock data.')
    return getMockInstagramPosts()
  }

  try {
    // Instagram Graph API endpoint
    const fields = 'id,media_type,media_url,caption,permalink,timestamp,username'
    const url = `https://graph.instagram.com/v18.0/${instagramAccountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    const data: InstagramApiResponse = await response.json()
    return data.data
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error)
    return getMockInstagramPosts()
  }
}

/**
 * Returns mock Instagram posts for development/fallback
 */
function getMockInstagramPosts(): InstagramPost[] {
  return [
    {
      id: '1',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: '🎉 Tết Festival 2025 is coming! Join us on February 8th for an unforgettable celebration of Vietnamese New Year! 🧧🎊 #ISUVSA #Tet2025 #VietnameseCulture #IowaState',
      permalink: 'https://www.instagram.com/p/example1',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    },
    {
      id: '2',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: 'Thank you to everyone who came out to our Phở Night! 🍜 Nothing beats homemade phở on a cold Iowa evening! #ISUVSA #PhoNight #VietnameseFood',
      permalink: 'https://www.instagram.com/p/example2',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    },
    {
      id: '3',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: 'VSA Royale Tournament was a huge success! 🎮🏆 Congrats to our champion! Play the game on our website! #ISUVSA #VSARoyale #Gaming',
      permalink: 'https://www.instagram.com/p/example3',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    },
    {
      id: '4',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: 'Welcome back Cyclones! 🌪️ Join us for our first general meeting of the semester this Thursday at 7 PM! #ISUVSA #IowaState #SpringSemester',
      permalink: 'https://www.instagram.com/p/example4',
      timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    },
    {
      id: '5',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: 'Community service day at the Food Bank of Iowa! 💪 VSA members making a difference! #ISUVSA #CommunityService #GiveBack',
      permalink: 'https://www.instagram.com/p/example5',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    },
    {
      id: '6',
      media_url: '/placeholder.svg',
      media_type: 'IMAGE',
      caption: 'Mid-Autumn Festival celebration was magical! 🏮🥮 Thanks to everyone who joined us! #ISUVSA #MidAutumn #VietnameseCulture',
      permalink: 'https://www.instagram.com/p/example6',
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      username: 'isuvsa'
    }
  ]
}

/**
 * Refreshes the Instagram access token (long-lived tokens last 60 days)
 * This should be called periodically to keep the token valid
 */
export async function refreshInstagramToken(): Promise<boolean> {
  const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN

  if (!accessToken) {
    return false
  }

  try {
    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${accessToken}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.access_token) {
      // In production, save the new token to your database or environment
      console.log('Instagram token refreshed successfully')
      return true
    }

    return false
  } catch (error) {
    console.error('Failed to refresh Instagram token:', error)
    return false
  }
}