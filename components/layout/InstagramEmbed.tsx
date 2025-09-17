'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Plus, X, Edit } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

interface InstagramPost {
  id: string
  embedCode: string
  caption?: string
  date?: string
}

// Default empty state - Instagram posts should be added via admin panel
const DEFAULT_POSTS: InstagramPost[] = []

export default function InstagramEmbed() {
  const [posts, setPosts] = useState<InstagramPost[]>(() => {
    // Load posts from localStorage if available
    if (typeof window !== 'undefined') {
      const savedPosts = localStorage.getItem('vsa-instagram-posts')
      if (savedPosts) {
        return JSON.parse(savedPosts)
      }
    }
    return DEFAULT_POSTS
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newPost, setNewPost] = useState({ embedCode: '', caption: '' })

  // Check if user is admin
  useState(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('vsa-admin-auth')
      setIsAdmin(auth === 'authenticated')
    }
  })

  const addPost = () => {
    if (newPost.embedCode) {
      const post: InstagramPost = {
        id: Date.now().toString(),
        embedCode: newPost.embedCode,
        caption: newPost.caption,
        date: new Date().toISOString().split('T')[0],
      }
      const updatedPosts = [post, ...posts].slice(0, 6) // Keep only 6 most recent
      setPosts(updatedPosts)
      localStorage.setItem('vsa-instagram-posts', JSON.stringify(updatedPosts))
      setNewPost({ embedCode: '', caption: '' })
      setIsEditing(false)

      // Reload Instagram embeds
      if (window.instgrm) {
        window.instgrm.Embeds.process()
      }
    }
  }

  const removePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id)
    setPosts(updatedPosts)
    localStorage.setItem('vsa-instagram-posts', JSON.stringify(updatedPosts))
  }

  // Load Instagram embed script
  useState(() => {
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
  })

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

        {/* Admin Controls */}
        {isAdmin && (
          <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Manage Instagram Posts</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-primary flex items-center"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Post
                  </>
                )}
              </button>
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Embed Code
                  </label>
                  <textarea
                    value={newPost.embedCode}
                    onChange={(e) => setNewPost({ ...newPost, embedCode: e.target.value })}
                    placeholder='Paste the Instagram embed code here (e.g., <blockquote class="instagram-media"...)'
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal"
                    rows={4}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Go to Instagram post → Click ··· menu → Select "Embed" → Copy embed code
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption (optional)
                  </label>
                  <input
                    type="text"
                    value={newPost.caption}
                    onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                    placeholder="Brief description of the post"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal"
                  />
                </div>
                <button
                  onClick={addPost}
                  disabled={!newPost.embedCode}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Instagram Post
                </button>
              </motion.div>
            )}

            {/* Current Posts List */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Current Posts ({posts.length})</h4>
              <div className="space-y-2">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium">{post.caption || 'Instagram Post'}</p>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                    <button
                      onClick={() => removePost(post.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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
            <p className="text-gray-500">No Instagram posts added yet.</p>
            {isAdmin && (
              <p className="text-sm text-gray-400 mt-2">
                Click "Add Post" above to add Instagram embeds
              </p>
            )}
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