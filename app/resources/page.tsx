'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  BookOpen,
  Utensils,
  Languages,
  GraduationCap,
  FileText,
  Video,
  Music,
  Map,
} from 'lucide-react'

const resourceCategories = [
  {
    id: 'cultural-library',
    title: 'Cultural Library',
    description: 'Learn about Vietnamese history, traditions, and customs',
    icon: BookOpen,
    color: 'bg-purple-600',
    link: '/resources/cultural-library',
    items: [
      'Vietnamese History',
      'Traditional Holidays',
      'Cultural Etiquette',
      'Folk Stories & Legends',
    ],
  },
  {
    id: 'language',
    title: 'Language Learning',
    description: 'Resources to learn and practice Vietnamese',
    icon: Languages,
    color: 'bg-blue-600',
    link: '/resources/language',
    items: ['Basic Phrases', 'Pronunciation Guide', 'Writing System', 'Practice Materials'],
  },
  {
    id: 'recipes',
    title: 'Vietnamese Recipes',
    description: 'Authentic recipes from our members and families',
    icon: Utensils,
    color: 'bg-green-600',
    link: '/resources/recipes',
    items: ['Phở & Soups', 'Rice & Noodle Dishes', 'Appetizers & Snacks', 'Desserts & Drinks'],
  },
  {
    id: 'study',
    title: 'Study Resources',
    description: 'Academic support and study materials',
    icon: GraduationCap,
    color: 'bg-cardinal',
    link: '/resources/study',
    items: ['Study Groups', 'Tutoring Resources', 'Course Reviews', 'Academic Tips'],
  },
]

const featuredResources = [
  {
    title: 'Tết Nguyên Đán Guide',
    type: 'Article',
    icon: FileText,
    description: 'Everything you need to know about Vietnamese New Year',
    link: '#',
  },
  {
    title: 'Vietnamese 101 Video Series',
    type: 'Video',
    icon: Video,
    description: 'Learn basic Vietnamese with our video tutorials',
    link: '#',
  },
  {
    title: 'Traditional Music Playlist',
    type: 'Audio',
    icon: Music,
    description: 'Curated playlist of Vietnamese traditional and modern music',
    link: '#',
  },
  {
    title: 'Vietnam Travel Guide',
    type: 'Guide',
    icon: Map,
    description: 'Planning a trip to Vietnam? Start here!',
    link: '#',
  },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-gold via-cardinal to-deepRed text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Resources</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Explore our collection of cultural, educational, and community resources
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Resource Categories</h2>
            <p className="section-subtitle">Find what you&apos;re looking for</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={category.link}>
                  <div className="card hover:shadow-2xl transition-all group cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <category.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-cardinal transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <ul className="space-y-1">
                          {category.items.map((item) => (
                            <li key={item} className="text-sm text-gray-500 flex items-center">
                              <span className="w-2 h-2 bg-gold rounded-full mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Featured Resources</h2>
            <p className="section-subtitle">Popular and recently added content</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={resource.link}>
                  <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <resource.icon className="w-8 h-8 text-cardinal" />
                      <span className="text-xs font-semibold text-gold bg-gold/20 px-2 py-1 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-charcoal">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Quick Links</h2>
            <p className="section-subtitle">Helpful external resources</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">ISU Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.iastate.edu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cardinal hover:text-cardinal-dark transition-colors"
                  >
                    Iowa State University →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Student Organizations →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    International Students →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Memorial Union →
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">Vietnamese Community</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    UVSA Midwest →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Vietnamese Embassy →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Viet News →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Cultural Centers →
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card"
            >
              <h3 className="text-xl font-bold mb-4">Learning Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Duolingo Vietnamese →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Vietnamese Pod 101 →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Learn Vietnamese →
                  </a>
                </li>
                <li>
                  <a href="#" className="text-cardinal hover:text-cardinal-dark transition-colors">
                    Cultural Workshops →
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8">
              Get the latest resources and updates delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-charcoal flex-1"
                required
              />
              <button
                type="submit"
                className="bg-white text-cardinal px-8 py-3 rounded-lg font-semibold hover:bg-cream transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
