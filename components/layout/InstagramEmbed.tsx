'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Plus, X, Edit } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, orderBy as firestoreOrderBy } from 'firebase/firestore'

interface InstagramPost {
  id: string
  embedCode: string
  caption?: string
  date?: string
  timestamp?: any
}

// Default empty state - Instagram posts should be added via admin panel
const DEFAULT_POSTS: InstagramPost[] = []

export default function InstagramEmbed() {
  const [posts, setPosts] = useState<InstagramPost[]>(DEFAULT_POSTS)
  const [loading, setLoading] = useState(true)

  // Load posts from Firestore
  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'instagramPosts'), firestoreOrderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      const loadedPosts: InstagramPost[] = []

      querySnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data()
        loadedPosts.push({
          id: docSnapshot.id,
          embedCode: data.embedCode,
          caption: data.caption,
          date: data.date,
          timestamp: data.timestamp
        })
      })

      setPosts(loadedPosts.slice(0, 6)) // Keep only 6 most recent

      // Process Instagram embeds after loading
      setTimeout(() => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
        }
      }, 100)
    } catch (error) {
      console.error('Error loading Instagram posts:', error)
      // Fallback to localStorage if Firestore fails
      const savedPosts = localStorage.getItem('vsa-instagram-posts')
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      }
    } finally {
      setLoading(false)
    }
  }

  // Load Instagram embed script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.instgrm) {
      const script = document.createElement('script')
      script.src = '//www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process()
        }
      }
      document.body.appendChild(script)
    }
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cardinal mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Instagram posts...</p>
        </div>
      </section>
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
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cardinal hover:text-cardinal-dark transition-colors font-semibold mt-2"
          >
            View on Instagram
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </motion.div>

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.embedCode }}
                className="instagram-embed-container"
              />
              {post.caption && (
                <div className="p-4">
                  <p className="text-sm text-gray-700">{post.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Fallback Message */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <Instagram className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Follow us on Instagram for the latest updates!</p>
            <p className="text-sm text-gray-400 mt-2">
              New posts coming soon
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow ISU VSA on Instagram
          </a>
        </div>
      </div>

      <style jsx global>{`
        .instagram-embed-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }
        .instagram-media {
          margin: 0 auto !important;
          max-width: 100% !important;
          width: 100% !important;
        }
      `}</style>
    </section>
  )
}

// Type declaration for Instagram embed
declare global {
  interface Window {
    instgrm: any
  }
}