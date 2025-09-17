'use client'

import { motion } from 'framer-motion'
import { BookOpen, Music, Film, Camera, Archive, Search, Download, Star } from 'lucide-react'
import AnimatedSection from '@/components/animations/AnimatedSection'

export default function CulturalLibraryPage() {
  const collections = [
    {
      title: 'Vietnamese Literature',
      description: 'Classic and contemporary Vietnamese literature, poetry, and folklore',
      icon: BookOpen,
      items: 45,
      color: 'from-blue-500 to-blue-700',
      featured: ['The Tale of Kiều', 'The Sorrow of War', 'Paradise of the Blind'],
    },
    {
      title: 'Traditional Music',
      description: 'Audio recordings of traditional Vietnamese music and instruments',
      icon: Music,
      items: 32,
      color: 'from-green-500 to-green-700',
      featured: ['Ca Trù performances', 'Đàn bầu music', 'Folk songs from regions'],
    },
    {
      title: 'Documentary Films',
      description: 'Educational films about Vietnamese history, culture, and traditions',
      icon: Film,
      items: 28,
      color: 'from-purple-500 to-purple-700',
      featured: ['Vietnam War documentaries', 'Cultural traditions', 'Modern Vietnam'],
    },
    {
      title: 'Photo Archives',
      description: 'Historical and cultural photographs documenting Vietnamese heritage',
      icon: Camera,
      items: 150,
      color: 'from-orange-500 to-orange-700',
      featured: ['Historical photos', 'Cultural festivals', 'Traditional crafts'],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Cultural Library</h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto">
              Explore our curated collection of Vietnamese cultural resources, literature, and
              multimedia content
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection direction="up">
            <div className="card">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search our cultural library..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-transparent"
                  />
                </div>
                <button className="btn-primary px-6">Search</button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Our Collections</h2>
            <p className="section-subtitle">
              Discover Vietnamese culture through diverse media and resources
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collections.map((collection, index) => (
              <AnimatedSection
                key={collection.title}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 0.1}
              >
                <div className="card h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${collection.color} rounded-full flex items-center justify-center mr-4`}
                    >
                      <collection.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{collection.title}</h3>
                      <span className="text-gray-600">{collection.items} items</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{collection.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Featured Items:</h4>
                    <ul className="space-y-2">
                      {collection.featured.map((item) => (
                        <li key={item} className="flex items-center text-sm text-gray-700">
                          <Star className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="btn-primary w-full">Explore Collection</button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center mb-12">
            <h2 className="section-title">Featured This Month</h2>
            <p className="section-subtitle">Highlighted cultural resources and new additions</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={0.1}>
              <div className="card">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg mb-4">
                  <BookOpen className="w-8 h-8 mb-2" />
                  <h3 className="font-bold">The Tale of Kiều</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Vietnam&apos;s national epic poem by Nguyễn Du, exploring themes of love,
                  sacrifice, and virtue.
                </p>
                <button className="btn-outline w-full">Read Online</button>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.2}>
              <div className="card">
                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-lg mb-4">
                  <Music className="w-8 h-8 mb-2" />
                  <h3 className="font-bold">Ca Trù Collection</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  UNESCO-recognized traditional Vietnamese music featuring our archived recordings.
                </p>
                <button className="btn-outline w-full">Listen Now</button>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={0.3}>
              <div className="card">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 rounded-lg mb-4">
                  <Film className="w-8 h-8 mb-2" />
                  <h3 className="font-bold">Vietnam Today</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Documentary series exploring modern Vietnam&apos;s culture, economy, and society.
                </p>
                <button className="btn-outline w-full">Watch Video</button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Digital Archive */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="section-title">Digital Archive Project</h2>
              <p className="text-lg text-gray-700 mb-6">
                We&apos;re digitizing and preserving Vietnamese cultural artifacts, documents, and
                media to ensure future generations can access and learn from our rich heritage.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Archive className="w-6 h-6 text-cardinal mr-3" />
                  <span>Over 500 items digitized and catalogued</span>
                </div>
                <div className="flex items-center">
                  <Download className="w-6 h-6 text-cardinal mr-3" />
                  <span>Free access to all community members</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-6 h-6 text-cardinal mr-3" />
                  <span>Continuously growing collection</span>
                </div>
              </div>

              <button className="btn-primary">Contribute to Archive</button>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-gradient-to-r from-cardinal/10 to-gold/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Archive Statistics</h3>

                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cardinal">500+</div>
                    <div className="text-sm text-gray-600">Digital Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold">15TB</div>
                    <div className="text-sm text-gray-600">Data Preserved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">25</div>
                    <div className="text-sm text-gray-600">Categories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">1,200+</div>
                    <div className="text-sm text-gray-600">Monthly Views</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-cardinal/10 to-gold/10">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection direction="up" className="text-center">
            <h2 className="section-title">Contribute to Our Library</h2>
            <p className="section-subtitle mb-8">
              Help us preserve Vietnamese culture by sharing your family&apos;s stories, photos, or
              cultural artifacts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center"
              >
                <Archive className="w-5 h-5 mr-2" />
                Submit Content
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline inline-flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Library
              </motion.button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
