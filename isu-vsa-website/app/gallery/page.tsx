'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play, Grid, Film } from 'lucide-react'

const albums = [
  {
    id: 1,
    title: 'Executive Board 2024',
    date: '2024-09-01',
    coverImage: '/images/eboard/eboardGroup.JPG',
    imageCount: 5,
    images: [
      '/images/eboard/eboardGroup.JPG',
      '/images/eboard/eboardGroup_Smile.JPG',
      '/images/eboard/theBoys.JPG',
      '/images/eboard/jen_sab.JPG',
      '/images/eboard/threeStack.JPG',
      '/images/dong/dongKawaii.JPG',
      '/images/dong/dongKawaii_Closeup.JPG',
      '/images/dong/dongScream.JPG',
      '/images/eboard/eboardGroup.JPG',
      '/images/eboard/eboardGroup_Smile.JPG',
      '/images/eboard/theBoys.JPG',
      '/images/eboard/jen_sab.JPG',
    ],
  },
  {
    id: 2,
    title: 'VSA Mascot - Dong',
    date: '2024-08-25',
    coverImage: '/images/dong/dongKawaii.JPG',
    imageCount: 3,
    images: [
      '/images/dong/dongKawaii.JPG',
      '/images/dong/dongKawaii_Closeup.JPG',
      '/images/dong/dongScream.JPG',
      '/images/dong/dongKawaii.JPG',
      '/images/dong/dongKawaii_Closeup.JPG',
      '/images/dong/dongScream.JPG',
      '/images/dong/dongKawaii.JPG',
      '/images/dong/dongKawaii_Closeup.JPG',
      '/images/dong/dongScream.JPG',
      '/images/dong/dongKawaii.JPG',
      '/images/dong/dongKawaii_Closeup.JPG',
      '/images/dong/dongScream.JPG',
    ],
  },
  {
    id: 3,
    title: 'Team Photos',
    date: '2024-09-17',
    coverImage: '/images/eboard/theBoys.JPG',
    imageCount: 28,
    images: Array(12).fill('/images/eboard/theBoys.JPG'),
  },
  {
    id: 4,
    title: 'VSA Activities',
    date: '2024-04-20',
    coverImage: '/images/eboard/jen_sab.JPG',
    imageCount: 56,
    images: Array(12).fill('/images/eboard/jen_sab.JPG'),
  },
  {
    id: 5,
    title: 'Community Events',
    date: '2024-03-15',
    coverImage: '/images/eboard/threeStack.JPG',
    imageCount: 24,
    images: Array(12).fill('/images/eboard/threeStack.JPG'),
  },
  {
    id: 6,
    title: 'Cultural Celebrations',
    date: '2024-11-08',
    coverImage: '/images/dong/dongScream.JPG',
    imageCount: 67,
    images: Array(12).fill('/images/dong/dongScream.JPG'),
  },
]

const videos = [
  {
    id: 1,
    title: 'Tết 2024 Highlights',
    thumbnail: '/images/eboard/eboardGroup_Smile.JPG',
    duration: '3:45',
    views: 1234,
  },
  {
    id: 2,
    title: 'VSA Dance Performance',
    thumbnail: '/images/dong/dongKawaii.JPG',
    duration: '5:20',
    views: 876,
  },
  {
    id: 3,
    title: 'Welcome to ISU VSA',
    thumbnail: '/images/eboard/theBoys.JPG',
    duration: '2:15',
    views: 2103,
  },
]

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'photos' | 'videos'>('photos')
  const [selectedAlbum, setSelectedAlbum] = useState<(typeof albums)[0] | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; index: number } | null>(null)

  const openLightbox = (src: string, index: number) => {
    setLightboxImage({ src, index })
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxImage || !selectedAlbum) return

    const currentIndex = lightboxImage.index
    const totalImages = selectedAlbum.images.length
    let newIndex = currentIndex

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1
    } else {
      newIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0
    }

    setLightboxImage({
      src: selectedAlbum.images[newIndex],
      index: newIndex,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-br from-gold via-gold-light to-cardinal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Gallery</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Relive our favorite moments and memories from VSA events
            </p>
          </motion.div>
        </div>
      </section>

      {/* View Mode Toggle */}
      <section className="py-8 px-4 bg-white sticky top-20 z-30 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setViewMode('photos')}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
                viewMode === 'photos'
                  ? 'bg-cardinal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
              <span>Photo Albums</span>
            </button>
            <button
              onClick={() => setViewMode('videos')}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
                viewMode === 'videos'
                  ? 'bg-cardinal text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Film className="w-5 h-5" />
              <span>Videos</span>
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      {viewMode === 'photos' ? (
        <>
          {/* Album Grid or Selected Album */}
          {!selectedAlbum ? (
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {albums.map((album, index) => (
                    <motion.div
                      key={album.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => setSelectedAlbum(album)}
                      className="cursor-pointer group"
                    >
                      <div className="card overflow-hidden">
                        <div className="relative h-64 -m-6 mb-4">
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-4 left-6 right-6 text-white">
                            <h3 className="text-2xl font-bold mb-1">{album.title}</h3>
                            <p className="text-sm opacity-90">
                              {new Date(album.date).toLocaleDateString()} • {album.imageCount}{' '}
                              photos
                            </p>
                          </div>
                        </div>
                        <p className="text-center text-cardinal font-semibold">View Album →</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="mb-6 flex items-center text-cardinal hover:text-cardinal-dark transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back to Albums
                </button>

                <h2 className="text-3xl font-bold mb-2">{selectedAlbum.title}</h2>
                <p className="text-gray-600 mb-8">
                  {new Date(selectedAlbum.date).toLocaleDateString()} • {selectedAlbum.imageCount}{' '}
                  photos
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedAlbum.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => openLightbox(image, index)}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={image}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Videos Section */
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="cursor-pointer group"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-cardinal ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg group-hover:text-cardinal transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600">{video.views.toLocaleString()} views</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('prev')
              }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            <div className="relative max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightboxImage.src}
                alt="Lightbox image"
                width={1200}
                height={800}
                className="object-contain"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('next')
              }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {lightboxImage.index + 1} / {selectedAlbum?.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
