// Jest setup file
import '@testing-library/jest-dom'

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

jest.mock('next/image', () => {
  const MockedImage = (props) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />
  }
  MockedImage.displayName = 'MockedNextImage'
  return MockedImage
})

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null
  }
  disconnect() {
    return null
  }
  unobserve() {
    return null
  }
}

// Mock performance.now
Object.defineProperty(global, 'performance', {
  writable: true,
  value: {
    now: jest.fn(() => Date.now()),
  },
})

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
})

// Suppress console warnings in tests
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

beforeAll(() => {
  console.error = jest.fn()
  console.warn = jest.fn()
})

afterAll(() => {
  console.error = originalConsoleError
  console.warn = originalConsoleWarn
})
