'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef(null)
  const motionValue = useMotionValue(from)
  const rounded = useTransform(motionValue, (latest) => {
    return decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString()
  })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const animation = animate(motionValue, to, {
        duration,
        ease: 'easeOut',
      })
      return animation.stop
    }
  }, [isInView, motionValue, to, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
