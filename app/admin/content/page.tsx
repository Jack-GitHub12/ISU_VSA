'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Plus, X, Copy, CheckCircle, Info } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

interface InstagramPost {
  id: string
  embedCode: string
  caption?: string
  date?: string
}

export default function ContentManagementPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [newPost, setNewPost] = useState({ embedCode: '', caption: '' })
  const [isAdding, setIsAdding] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('vsa-instagram-posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    }
  }, [])

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
      setIsAdding(false)
    }
  }

  const removePost = (id: string) => {
    const updatedPosts = posts.filter(p => p.id !== id)
    setPosts(updatedPosts)
    localStorage.setItem('vsa-instagram-posts', JSON.stringify(updatedPosts))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-2">Manage Instagram posts and social media content</p>
      </div>

      {/* Instagram Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Instagram className="w-6 h-6 text-pink-600 mr-2" />
            <h2 className="text-xl font-bold">Instagram Posts</h2>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="btn-primary flex items-center"
          >
            {isAdding ? (
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

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-2">How to add Instagram posts:</p>
              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                <li>Go to the Instagram post you want to embed</li>
                <li>Click the three dots (···) menu in the top right</li>
                <li>Select "Embed" from the menu</li>
                <li>Click "Copy embed code"</li>
                <li>Paste the code in the field below</li>
              </ol>
              <p className="mt-2 text-blue-700">
                Instagram handle:{' '}
                <button
                  onClick={() => copyToClipboard('@isuvsa')}
                  className="font-semibold hover:underline inline-flex items-center"
                >
                  @isuvsa
                  {copied ? (
                    <CheckCircle className="w-3 h-3 ml-1" />
                  ) : (
                    <Copy className="w-3 h-3 ml-1" />
                  )}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Add Post Form */}
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram Embed Code *
                </label>
                <textarea
                  value={newPost.embedCode}
                  onChange={(e) => setNewPost({ ...newPost, embedCode: e.target.value })}
                  placeholder='<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/..."'
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal"
                  rows={4}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption (optional)
                </label>
                <input
                  type="text"
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  placeholder="Brief description for accessibility and preview"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={addPost}
                  disabled={!newPost.embedCode}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Post
                </button>
                <button
                  onClick={() => {
                    setNewPost({ embedCode: '', caption: '' })
                    setIsAdding(false)
                  }}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Current Posts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-700">
              Current Posts ({posts.length}/6)
            </h3>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cardinal hover:underline flex items-center"
            >
              View Instagram Profile
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          {posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {post.caption || `Instagram Post #${index + 1}`}
                    </p>
                    <p className="text-sm text-gray-500">Added on {post.date}</p>
                  </div>
                  <button
                    onClick={() => removePost(post.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove post"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <Instagram className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No Instagram posts added yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Click "Add Post" to embed Instagram content
              </p>
            </div>
          )}
        </div>

        {/* Preview Link */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Posts will appear on the homepage Instagram section
            </p>
            <a
              href="/"
              target="_blank"
              className="text-sm text-cardinal hover:underline flex items-center"
            >
              Preview on website
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Social Media Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold mb-4">Social Media Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Instagram</p>
            <a
              href={SITE_CONFIG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cardinal hover:underline flex items-center"
            >
              @isuvsa
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-cardinal hover:underline"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}