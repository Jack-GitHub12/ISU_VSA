'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Play, Grid, Film } from 'lucide-react'
import { createPortal } from 'react-dom'

const SHOW_VIDEO_SECTION = false as const

const photoCollections = [
  {
    id: 'eboard-2018',
    label: 'Executive Board 2018-2019',
    photos: [
      { src: '/gallery/eboard/2018-2019/outdoor_photo_1.jpg', date: '2019-04-01' },
      { src: '/gallery/eboard/2018-2019/outdoor_photo_2.jpg', date: '2019-04-01' },
      { src: '/gallery/eboard/2018-2019/outdoor_photo_3.jpg', date: '2019-04-01' },
    ],
  },
  {
    id: 'eboard-archived',
    label: 'E-Board Memories',
    photos: [
      { src: '/gallery/eboard/archived/eboard_2016.jpg', date: '2016-06-01' },
      { src: '/gallery/eboard/archived/eboard_bonding_2019.jpg', date: '2019-03-01' },
    ],
  },
  {
    id: 'group-portraits',
    label: 'Group Portraits Through the Years',
    photos: [
      { src: '/gallery/groupPhoto/vsa_2023.jpeg', date: '2023-09-01' },
      { src: '/gallery/groupPhoto/vsa_2020.jpg', date: '2020-09-01' },
      { src: '/gallery/groupPhoto/vsa_2019.jpg', date: '2019-09-01' },
      { src: '/gallery/groupPhoto/vsa_2018.jpg', date: '2018-09-01' },
      { src: '/gallery/groupPhoto/vsa_2017.jpg', date: '2017-09-01' },
      { src: '/gallery/groupPhoto/vsa_2016.jpg', date: '2016-09-01' },
    ],
  },
  {
    id: 'group-2019',
    label: 'Group Adventures 2019-2020',
    photos: [
      { src: '/gallery/groupPhoto/2019-20/1+1_restaurant.jpg', date: '2020-02-15' },
      { src: '/gallery/groupPhoto/2019-20/adventure_awaits.jpg', date: '2020-02-15' },
      { src: '/gallery/groupPhoto/2019-20/bowling.jpg', date: '2019-11-10' },
      { src: '/gallery/groupPhoto/2019-20/dodgeball.jpg', date: '2019-10-20' },
      { src: '/gallery/groupPhoto/2019-20/group_restaurant_1.jpg', date: '2020-01-25' },
      { src: '/gallery/groupPhoto/2019-20/group_restaurant_2.jpg', date: '2020-01-25' },
      { src: '/gallery/groupPhoto/2019-20/volleyball_oct.jpg', date: '2019-10-05' },
    ],
  },
  {
    id: 'group-2018',
    label: 'Group Adventures 2018-2019',
    photos: [{ src: '/gallery/groupPhoto/2018-19/group_1.jpg', date: '2019-01-20' }],
  },
  {
    id: 'tet-2019',
    label: 'Chinese New Year 2019',
    photos: [{ src: '/gallery/groupPhoto/chinese_new_year/uIowa_tet_vsa_2019.jpg', date: '2019-02-04' }],
  },
  {
    id: 'conference-2019',
    label: 'VSA Conference 2019',
    photos: [{ src: '/gallery/groupPhoto/conference/vsa_conference_2019.jpg', date: '2019-11-01' }],
  },
  {
    id: 'acce-halloween',
    label: 'ACCE Halloween 2019-2020',
    photos: [
      { src: '/gallery/ACCE_Family/2019-20/hallowe_group_1.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_group_2.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_1.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_2.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_3.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_4.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_6.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_7.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_trio_8.jpg', date: '2019-10-31' },
      { src: '/gallery/ACCE_Family/2019-20/hallowe_duo_1.jpg', date: '2019-10-31' },
    ],
  },
  {
    id: 'acce-2024-2025',
    label: 'ACCE 2024-2025',
    photos: [
      { src: '/gallery/ACCE_Family/2024-25/wintermelon.jpg', date: '2025-01-15' },
      { src: '/gallery/ACCE_Family/2024-25/lychee.jpg', date: '2025-01-15' },
      { src: '/gallery/ACCE_Family/2024-25/mango.jpg', date: '2025-01-15' },
      { src: '/gallery/ACCE_Family/2024-25/strawberry.jpg', date: '2025-01-15' },
    ],
  },
] as const

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [lightboxScrollY, setLightboxScrollY] = useState(0)
  const [lightboxDocHeight, setLightboxDocHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)
  const portalWasCreatedRef = useRef(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!SHOW_VIDEO_SECTION && viewMode === 'videos') {
      setViewMode('photos')
    }
  }, [viewMode])

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleScroll = () => {
      setLightboxScrollY(window.scrollY)
    }

    const handleResize = () => {
      setViewportHeight(window.innerHeight)
      setLightboxDocHeight(document.documentElement.scrollHeight)
    }

    handleScroll()
    handleResize()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [lightboxIndex])

  useEffect(() => {
    if (!portalElement) return

    portalElement.style.pointerEvents = lightboxIndex !== null ? 'auto' : 'none'
  }, [portalElement, lightboxIndex])

  useEffect(() => {
    let portal = document.getElementById('gallery-lightbox-root')
    if (!portal) {
      portal = document.createElement('div')
      portal.setAttribute('id', 'gallery-lightbox-root')
      portal.style.position = 'absolute'
      portal.style.inset = '0'
      portal.style.zIndex = '9999'
      portal.style.pointerEvents = 'none'
      document.body.appendChild(portal)
      portalWasCreatedRef.current = true
    } else {
      portalWasCreatedRef.current = false
    }
    setPortalElement(portal)

    return () => {
      if (portal && portalWasCreatedRef.current) {
        portal.remove()
      }
    }
  }, [])

  const photoList = useMemo(() => {
    const entries = photoCollections.flatMap((collection) =>
      collection.photos.map((photo, index) => ({
        src: photo.src,
        date: photo.date,
        collectionId: collection.id,
        collectionIndex: index,
      }))
    )

    entries.sort((a, b) => {
      const aTime = new Date(a.date).getTime()
      const bTime = new Date(b.date).getTime()
      return sortOrder === 'newest' ? bTime - aTime : aTime - bTime
    })

    return entries
  }, [sortOrder])

  const totalPhotos = photoList.length
  const lightboxPhoto = lightboxIndex !== null ? photoList[lightboxIndex] : null

  const openLightbox = useCallback((index: number) => {
    setLightboxScrollY(window.scrollY)
    setViewportHeight(window.innerHeight)
    setLightboxDocHeight(document.documentElement.scrollHeight)
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setLightboxDocHeight(0)
    setViewportHeight(0)
  }, [])

  const navigateLightbox = useCallback(
    (direction: 'prev' | 'next') => {
      if (totalPhotos === 0) return

      setLightboxIndex((prev) => {
        if (prev === null) return prev
        const delta = direction === 'next' ? 1 : -1
        return (prev + delta + totalPhotos) % totalPhotos
      })
    },
    [totalPhotos]
  )

  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeLightbox()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        navigateLightbox('next')
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault()
        navigateLightbox('prev')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, closeLightbox, navigateLightbox])

  const fallbackViewportHeight =
    viewportHeight || (typeof window !== 'undefined' ? window.innerHeight : 0)
  const contentTop = lightboxScrollY + fallbackViewportHeight / 2

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
                  <span>Photos</span>
                </button>
                {SHOW_VIDEO_SECTION && (
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
                )}
              </div>
            </div>
          </section>

          {/* Content Section */}
          {viewMode === 'photos' || !SHOW_VIDEO_SECTION ? (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-end">
              <label className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                <span>Sort by</span>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as 'newest' | 'oldest')}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm focus:border-cardinal focus:outline-none focus:ring-2 focus:ring-cardinal/40"
                >
                  <option value="newest">Newest to Oldest</option>
                  <option value="oldest">Oldest to Newest</option>
                </select>
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photoList.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">More photos coming soon.</p>
              ) : (
                photoList.map((photo, photoIndex) => {
                  const key = `${photo.collectionId}-${photo.collectionIndex}`
                  const formattedDate = new Date(photo.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                  const Card = (
                    <div
                      data-photo-date={photo.date}
                      onClick={() => openLightbox(photoIndex)}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={photo.src}
                        alt={`Gallery photo ${photoIndex + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                      <span className="sr-only">Captured on {formattedDate}</span>
                    </div>
                  )

                  if (!isMounted) {
                    return <div key={key}>{Card}</div>
                  }

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: photoIndex * 0.03 }}
                    >
                      {Card}
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </section>
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
      {portalElement &&
        createPortal(
          <AnimatePresence>
            {lightboxPhoto && lightboxIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-black/95 backdrop-blur-sm"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: lightboxDocHeight > 0 ? `${lightboxDocHeight}px` : '100vh',
                  transition: 'top 120ms ease-out',
                  pointerEvents: 'auto',
                }}
                onClick={closeLightbox}
              >
                <div
                  className="absolute left-1/2 w-full max-w-5xl px-4"
                  style={{ top: contentTop, transform: 'translate(-50%, -50%)' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={closeLightbox}
                    className="absolute -right-6 -top-14 text-white hover:text-gray-300 transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>

                  <div className="flex items-center justify-center gap-6">
                    {totalPhotos > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateLightbox('prev')
                        }}
                        className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                      >
                        <ChevronLeft className="w-8 h-8" />
                      </button>
                    )}

                    <div className="max-h-[90vh] w-full rounded-xl bg-black/40 p-4 shadow-2xl">
                      <Image
                        src={lightboxPhoto.src}
                        alt="Lightbox image"
                        width={1200}
                        height={800}
                        className="h-auto w-full rounded-lg object-contain shadow-xl"
                        priority
                      />
                    </div>

                    {totalPhotos > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigateLightbox('next')
                        }}
                        className="rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                      >
                        <ChevronRight className="w-8 h-8" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 text-center text-sm font-semibold text-white">
                    {lightboxIndex + 1} / {totalPhotos}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          portalElement
        )}
    </div>
  )
}
