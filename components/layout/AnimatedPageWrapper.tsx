'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface AnimatedPageWrapperProps {
  children: ReactNode
}

export default function AnimatedPageWrapper({ children }: AnimatedPageWrapperProps) {
  const pathname = usePathname()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: 'blur(10px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const childVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen"
      >
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
