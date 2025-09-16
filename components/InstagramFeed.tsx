'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'

interface InstagramPost {
  id: string
  media_url: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  caption: string
  permalink: string
  timestamp: string
  likes?: number
  comments?: number
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In production, you would fetch from Instagram Graph API
    // For now, we'll use mock data that simulates ISU VSA posts
    const fetchInstagramPosts = async () => {
      try {
        // Mock data simulating ISU VSA Instagram posts
        const mockPosts: InstagramPost[] = [
          {
            id: '1',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: '🎉 Tết Festival 2025 is coming! Join us on February 8th for an unforgettable celebration of Vietnamese New Year! 🧧🎊 #ISUVSA #Tet2025 #VietnameseCulture #IowaState',
            permalink: 'https://www.instagram.com/p/example1',
            timestamp: '2025-01-10T12:00:00Z',
            likes: 234,
            comments: 45
          },
          {
            id: '2',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: 'Thank you to everyone who came out to our Phở Night! 🍜 Nothing beats homemade phở on a cold Iowa evening! #ISUVSA #PhoNight #VietnameseFood',
            permalink: 'https://www.instagram.com/p/example2',
            timestamp: '2025-01-08T18:30:00Z',
            likes: 189,
            comments: 23
          },
          {
            id: '3',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: 'VSA Royale Tournament was a huge success! 🎮🏆 Congrats to our champion! Play the game on our website! #ISUVSA #VSARoyale #Gaming',
            permalink: 'https://www.instagram.com/p/example3',
            timestamp: '2025-01-05T20:00:00Z',
            likes: 156,
            comments: 34
          },
          {
            id: '4',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: 'Welcome back Cyclones! 🌪️ Join us for our first general meeting of the semester this Thursday at 7 PM! #ISUVSA #IowaState #SpringSemester',
            permalink: 'https://www.instagram.com/p/example4',
            timestamp: '2025-01-03T14:00:00Z',
            likes: 278,
            comments: 52
          },
          {
            id: '5',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: 'Community service day at the Food Bank of Iowa! 💪 VSA members making a difference! #ISUVSA #CommunityService #GiveBack',
            permalink: 'https://www.instagram.com/p/example5',
            timestamp: '2024-12-28T10:00:00Z',
            likes: 312,
            comments: 41
          },
          {
            id: '6',
            media_url: '/placeholder.svg',
            media_type: 'IMAGE',
            caption: 'Mid-Autumn Festival celebration was magical! 🏮🥮 Thanks to everyone who joined us! #ISUVSA #MidAutumn #VietnameseCulture',
            permalink: 'https://www.instagram.com/p/example6',
            timestamp: '2024-12-20T19:00:00Z',
            likes: 445,
            comments: 67
          }
        ]

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setPosts(mockPosts)
        setLoading(false)
      } catch {
        setError('Failed to load Instagram posts')
        setLoading(false)
      }
    }

    fetchInstagramPosts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cardinal" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{error}</p>
      </div>
    )
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-600 mr-3" />
            <h2 className="section-title mb-0">Follow @isuvsa</h2>
          </div>
          <p className="section-subtitle">Stay connected with our latest updates and events</p>
          <a
            href="https://www.instagram.com/isuvsa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cardinal hover:text-cardinal-dark transition-colors font-semibold mt-2"
          >
            View on Instagram
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-square">
                  <Image
                    src={post.media_url}
                    alt={post.caption.substring(0, 50)}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex items-center space-x-6 text-white">
                      <div className="flex items-center">
                        <Heart className="w-6 h-6 mr-2" fill="white" />
                        <span className="font-bold">{post.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2" fill="white" />
                        <span className="font-bold">{post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-700 line-clamp-3">
                    {post.caption}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(post.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com/isuvsa/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow ISU VSA on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}