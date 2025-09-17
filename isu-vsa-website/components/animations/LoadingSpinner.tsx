'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export default function LoadingSpinner({ size = 'md', color = 'cardinal' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className={`absolute inset-0 border-4 border-${color}/20 rounded-full`} />
        <motion.div
          className={`absolute inset-0 border-4 border-${color} rounded-full border-t-transparent`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
    </div>
  )
}
