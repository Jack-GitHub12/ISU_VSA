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
    // console.warn('Instagram access token not found. Using mock data.')
    return getMockInstagramPosts()
  }

  try {
    // Instagram Graph API endpoint
    const fields = 'id,media_type,media_url,caption,permalink,timestamp,username'
    const url = `https://graph.instagram.com/v18.0/${instagramAccountId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`)
    }

    const data: InstagramApiResponse = await response.json()
    return data.data
  } catch {
    // console.error('Failed to fetch Instagram posts')
    return getMockInstagramPosts()
  }
}

/**
 * Returns empty array when no Instagram posts are available
 * Real posts should be fetched from the Instagram API or managed through the admin panel
 */
function getMockInstagramPosts(): InstagramPost[] {
  // No mock data - only real VSA Instagram content should be displayed
  return []
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
      // console.log('Instagram token refreshed successfully')
      return true
    }

    return false
  } catch {
    // console.error('Failed to refresh Instagram token')
    return false
  }
}
