'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const variants = {
    up: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    down: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 },
    },
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
