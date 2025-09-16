'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface AnimatedPageWrapperProps {
  children: ReactNode
}

export default function AnimatedPageWrapper({ children }: AnimatedPageWrapperProps) {
  const pathname = usePathname()

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      x: -20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut" as const
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}