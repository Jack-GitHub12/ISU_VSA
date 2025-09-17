'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
  glow?: boolean
}

export default function AnimatedCard({
  children,
  className = '',
  delay = 0,
  hover = true,
  glow = false,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        hover
          ? {
              y: -5,
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : {}
      }
      className={cn(
        'bg-white rounded-xl shadow-md p-6 transition-all duration-300',
        hover && 'hover:shadow-2xl',
        glow && 'hover:shadow-[0_0_30px_rgba(206,17,38,0.3)]',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
