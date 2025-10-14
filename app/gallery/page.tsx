'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play, Grid, Film } from 'lucide-react'

const albumsData = [
  {
    id: 'eboard-2025',
    title: 'Executive Board 2025-2026',
    date: '2025-09-01',
    coverImage: '/gallery/eboard/2025-2026/eboardGroup_Smile.JPG',
    images: [
      '/gallery/eboard/2025-2026/eboardGroup.JPG',
      '/gallery/eboard/2025-2026/eboardGroup_Smile.JPG',
      '/gallery/eboard/2025-2026/jen_sab.JPG',
      '/gallery/eboard/2025-2026/theBoys.JPG',
      '/gallery/eboard/2025-2026/threeStack.JPG',
    ],
  },
  {
    id: 'eboard-2018',
    title: 'Executive Board 2018-2019',
    date: '2019-04-01',
    coverImage: '/gallery/eboard/2018-2019/outdoor_photo_1.jpg',
    images: [
      '/gallery/eboard/2018-2019/outdoor_photo_1.jpg',
      '/gallery/eboard/2018-2019/outdoor_photo_2.jpg',
      '/gallery/eboard/2018-2019/outdoor_photo_3.jpg',
    ],
  },
  {
    id: 'eboard-archived',
    title: 'E-Board Memories',
    date: '2016-06-01',
    coverImage: '/gallery/eboard/archived/eboard_2016.jpg',
    images: [
      '/gallery/eboard/archived/eboard_2016.jpg',
      '/gallery/eboard/archived/eboard_bonding_2019.jpg',
    ],
  },
  {
    id: 'mascot-dong',
    title: 'VSA Mascot - Dong',
    date: '2024-08-25',
    coverImage: '/gallery/dong/dongKawaii.JPG',
    images: [
      '/gallery/dong/dongKawaii.JPG',
      '/gallery/dong/dongKawaii_Closeup.JPG',
      '/gallery/dong/dongScream.JPG',
      '/gallery/dong/dongHead.png',
    ],
  },
  {
    id: 'group-portraits',
    title: 'Group Portraits Through the Years',
    date: '2023-09-01',
    coverImage: '/gallery/groupPhoto/vsa_2023.jpeg',
    images: [
      '/gallery/groupPhoto/vsa_2023.jpeg',
      '/gallery/groupPhoto/vsa_2020.jpg',
      '/gallery/groupPhoto/vsa_2019.jpg',
      '/gallery/groupPhoto/vsa_2018.jpg',
      '/gallery/groupPhoto/vsa_2017.jpg',
      '/gallery/groupPhoto/vsa_2016.jpg',
    ],
  },
  {
    id: 'group-2019',
    title: 'Group Adventures 2019-2020',
    date: '2020-02-15',
    coverImage: '/gallery/groupPhoto/2019-20/group_restaurant_1.jpg',
    images: [
      '/gallery/groupPhoto/2019-20/1+1_restaurant.jpg',
      '/gallery/groupPhoto/2019-20/adventure_awaits.jpg',
      '/gallery/groupPhoto/2019-20/bowling.jpg',
      '/gallery/groupPhoto/2019-20/dodgeball.jpg',
      '/gallery/groupPhoto/2019-20/group_restaurant_1.jpg',
      '/gallery/groupPhoto/2019-20/group_restaurant_2.jpg',
      '/gallery/groupPhoto/2019-20/volleyball_oct.jpg',
    ],
  },
  {
    id: 'group-2018',
    title: 'Group Adventures 2018-2019',
    date: '2019-01-20',
    coverImage: '/gallery/groupPhoto/2018-19/group_1.jpg',
    images: ['/gallery/groupPhoto/2018-19/group_1.jpg'],
  },
  {
    id: 'tet-2019',
    title: 'Chinese New Year 2019',
    date: '2019-02-04',
    coverImage: '/gallery/groupPhoto/chinese_new_year/uIowa_tet_vsa_2019.jpg',
    images: ['/gallery/groupPhoto/chinese_new_year/uIowa_tet_vsa_2019.jpg'],
  },
  {
    id: 'conference-2019',
    title: 'VSA Conference 2019',
    date: '2019-11-01',
    coverImage: '/gallery/groupPhoto/conference/vsa_conference_2019.jpg',
    images: ['/gallery/groupPhoto/conference/vsa_conference_2019.jpg'],
  },
  {
    id: 'acce-halloween',
    title: 'ACCE Halloween 2019-2020',
    date: '2019-10-31',
    coverImage: '/gallery/ACCE_Family/2019-20/hallowe_group_1.jpg',
    images: [
      '/gallery/ACCE_Family/2019-20/hallowe_group_1.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_group_2.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_1.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_2.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_3.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_4.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_6.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_7.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_trio_8.jpg',
      '/gallery/ACCE_Family/2019-20/hallowe_duo_1.jpg',
    ],
  },
  {
    id: 'acce-wintermelon',
    title: 'ACCE Winter Melon 2024-2025',
    date: '2025-01-15',
    coverImage: '/gallery/ACCE_Family/2024-25/wintermelon.jpg',
    images: ['/gallery/ACCE_Family/2024-25/wintermelon.jpg'],
  },
  {
    id: 'friends',
    title: 'Friends & Fun',
    date: '2024-07-01',
    coverImage: '/gallery/others/aram.jpeg',
    images: ['/gallery/others/aram.jpeg'],
  },
] as const

type AlbumData = (typeof albumsData)[number]
type Album = AlbumData & { imageCount: number }

const albums: Album[] = albumsData.map((album) => ({
  ...album,
  imageCount: album.images.length,
}))

const videos = [
  {
    id: 1,
    title: 'Running Man Performance',
    thumbnail: '/images/groupPhoto/vsa_2023.jpeg',
    duration: '1:32',
    views: 542,
    src: '/videos/runningMan.mp4',
  },
  {
    id: 2,
    title: '2016 Year Recap',
    thumbnail: '/images/groupPhoto/vsa_2016.jpg',
    duration: '4:05',
    views: 980,
    src: '/videos/recap_2016.mp4',
  },
  {
    id: 3,
    title: 'Lake Day 2025',
    thumbnail: '/gallery/groupPhoto/2019-20/volleyball_oct.jpg',
    duration: '2:48',
    views: 312,
    src: '/videos/lakeday_2025.mp4',
  },
]

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'photos' | 'videos'>('photos')
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; index: number } | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
      <section className="relative py-16 px-4 bg-cardinal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={isMounted ? { opacity: 0, y: 20 } : false}
            animate={isMounted ? { opacity: 1, y: 0 } : undefined}
            transition={isMounted ? { duration: 0.8 } : undefined}
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
                  {albums.map((album, index) => {
                    const Card = (
                      <div className="card overflow-hidden">
                        <div className="relative h-64 -m-6 mb-4">
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0" />
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
                    )

                    if (!isMounted) {
                      return (
                        <div
                          key={album.id}
                          onClick={() => setSelectedAlbum(album)}
                          className="cursor-pointer group"
                        >
                          {Card}
                        </div>
                      )
                    }

                    return (
                      <motion.div
                        key={album.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        onClick={() => setSelectedAlbum(album)}
                        className="cursor-pointer group"
                      >
                        {Card}
                      </motion.div>
                    )
                  })}
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
                  {selectedAlbum.images.map((image, index) => {
                    const Card = (
                      <div
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
                      </div>
                    )

                    if (!isMounted) {
                      return <div key={index}>{Card}</div>
                    }

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        {Card}
                      </motion.div>
                    )
                  })}
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
              {videos.map((video, index) => {
                const Card = (
                  <div
                    className="cursor-pointer group"
                    onClick={() => {
                      if (video.src) {
                        window.open(video.src, '_blank')
                      }
                    }}
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
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
                  </div>
                )

                if (!isMounted) {
                  return <div key={video.id}>{Card}</div>
                }

                return (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {Card}
                  </motion.div>
                )
              })}
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
