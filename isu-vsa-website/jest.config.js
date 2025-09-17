// @ts-check
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Test match patterns
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/*.(test|spec).(ts|tsx|js|jsx)'],

  // Module name mapping for CSS modules and static assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Coverage settings
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'lib/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!jest.setup.js',
  ],

  // Coverage thresholds
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Transform ignore patterns
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$)|(react-icons|lucide-react)/)'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
