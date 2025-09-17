'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
}

export default function LazyImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isInView, setIsInView] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  // Generate a simple blur data URL if not provided
  const defaultBlurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjwvc3ZnPg=='

  return (
    <div ref={imageRef} className={`relative ${className}`}>
      {/* Loading skeleton */}
      {isLoading && !priority && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer rounded-lg"
        />
      )}

      {/* Actual image */}
      {(isInView || priority) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          {fill ? (
            <Image
              src={src}
              alt={alt}
              fill
              className={className}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              onLoad={handleLoad}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 500}
              height={height || 500}
              className={className}
              quality={quality}
              priority={priority}
              placeholder={placeholder}
              blurDataURL={blurDataURL || defaultBlurDataURL}
              onLoad={handleLoad}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </motion.div>
      )}
    </div>
  )
}