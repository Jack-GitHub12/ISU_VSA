// Animation Performance Configuration
// Centralized animation settings to prevent lag

export const animationConfig = {
  // Framer Motion optimized variants
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
  },

  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },

  scale: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' }
  },

  // Reduced motion settings
  reducedMotion: {
    initial: {},
    animate: {},
    exit: {},
    transition: { duration: 0.01 }
  }
}

// Performance optimizations
export const performanceSettings = {
  // Use GPU acceleration
  transform: 'translateZ(0)',
  willChange: 'auto',
  backfaceVisibility: 'hidden' as const,
  perspective: 1000,

  // Smooth scrolling
  scrollBehavior: 'smooth' as const,
  overscrollBehavior: 'contain' as const,

  // Animation frame throttling
  maxFPS: 60,
  throttleMs: 16.67, // 60fps

  // Debounce settings for resize/scroll events
  debounceDelay: 150,
  throttleDelay: 100
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Optimized animation wrapper
export const getAnimationProps = (type: keyof typeof animationConfig) => {
  if (prefersReducedMotion()) {
    return animationConfig.reducedMotion
  }
  return animationConfig[type]
}

// Intersection Observer settings for lazy animations
export const observerConfig = {
  threshold: 0.1,
  rootMargin: '50px',
  triggerOnce: true
}

// CSS animation durations (in ms)
export const animationDurations = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  verySlow: 1000
}

// Easing functions
export const easings = {
  easeOut: [0.4, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55]
}

// Animation delays for staggered effects
export const staggerConfig = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15
}

// Performance monitoring
export const measureAnimation = (name: string, callback: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${name}-start`)
    callback()
    performance.mark(`${name}-end`)
    performance.measure(name, `${name}-start`, `${name}-end`)

    const measure = performance.getEntriesByName(name)[0]
    if (measure && measure.duration > 16.67) { // More than one frame
      console.warn(`Animation "${name}" took ${measure.duration}ms`)
    }
  } else {
    callback()
  }
}