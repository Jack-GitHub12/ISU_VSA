'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ReactNode, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const AnimatedButton = React.memo<AnimatedButtonProps>(function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) {
  const variants = useMemo(
    () => ({
      primary: 'bg-cardinal text-white hover:bg-cardinal-dark',
      secondary: 'bg-gold text-charcoal hover:bg-gold-dark',
      outline: 'border-2 border-cardinal text-cardinal hover:bg-cardinal hover:text-white',
    }),
    []
  )

  const sizes = useMemo(
    () => ({
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    }),
    []
  )

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-lg font-semibold transition-all duration-300',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      <motion.span
        className="flex items-center justify-center"
        whileHover={{ x: [0, -2, 2, -2, 2, 0] }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    </motion.button>
  )
})

export default AnimatedButton
