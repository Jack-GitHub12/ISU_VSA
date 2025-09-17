'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import { SITE_CONFIG, IMAGES } from '@/lib/constants'

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

// Memoized individual post component for better performance
const InstagramPostCard = React.memo<{ post: InstagramPost; index: number }>(
  function InstagramPostCard({ post, index }) {
    const altText = useMemo(() => {
      return post.caption
        ? `ISU VSA Instagram post: ${post.caption.substring(0, 100).replace(/[#@]/g, '').trim()}${post.caption.length > 100 ? '...' : ''}`
        : 'ISU VSA Instagram post'
    }, [post.caption])

    const formattedDate = useMemo(() => {
      return new Date(post.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    }, [post.timestamp])

    return (
      <motion.div
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
          aria-label={`View Instagram post: ${post.caption?.substring(0, 50) || 'ISU VSA post'}`}
        >
          <div className="relative aspect-square">
            <Image
              src={post.media_url}
              alt={altText}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center" aria-label={`${post.likes} likes`}>
                  <Heart className="w-6 h-6 mr-2" fill="white" aria-hidden="true" />
                  <span className="font-bold">{post.likes}</span>
                </div>
                <div className="flex items-center" aria-label={`${post.comments} comments`}>
                  <MessageCircle className="w-6 h-6 mr-2" fill="white" aria-hidden="true" />
                  <span className="font-bold">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700 line-clamp-3">{post.caption}</p>
            <p className="text-xs text-gray-500 mt-2">{formattedDate}</p>
          </div>
        </a>
      </motion.div>
    )
  }
)

const InstagramFeed = React.memo(function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Instagram posts should be fetched from the API or loaded from localStorage
  // No mock data - only real VSA Instagram content
  const mockPosts = useMemo(() => [] as InstagramPost[], [])

  const fetchInstagramPosts = useCallback(async () => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setPosts(mockPosts)
      setLoading(false)
    } catch {
      setError('Failed to load Instagram posts')
      setLoading(false)
    }
  }, [mockPosts])

  useEffect(() => {
    fetchInstagramPosts()
  }, [fetchInstagramPosts])

  if (loading) {
    return (
      <div
        className="flex justify-center items-center py-12"
        role="status"
        aria-label="Loading Instagram posts"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-cardinal" />
        <span className="sr-only">Loading Instagram posts...</span>
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
    <section className="py-16 px-4 bg-gray-50" role="region" aria-labelledby="instagram-section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-600 mr-3" aria-hidden="true" />
            <h2 id="instagram-section" className="section-title mb-0">
              Follow @isuvsa
            </h2>
          </div>
          <p className="section-subtitle">Stay connected with our latest updates and events</p>
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cardinal hover:text-cardinal-dark transition-colors font-semibold mt-2"
            aria-label="View ISU VSA on Instagram (opens in new tab)"
          >
            View on Instagram
            <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
          </a>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="grid"
          aria-label="Instagram posts"
        >
          {posts.map((post, index) => (
            <InstagramPostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
            aria-label="Follow ISU VSA on Instagram (opens in new tab)"
          >
            <Instagram className="w-5 h-5 mr-2" aria-hidden="true" />
            Follow {SITE_CONFIG.name} on Instagram
          </a>
        </div>
      </div>
    </section>
  )
})

export default InstagramFeed
