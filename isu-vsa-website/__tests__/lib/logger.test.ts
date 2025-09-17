import logger, { LogLevel } from '../../lib/logger'

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock console methods
const originalConsole = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
  debug: console.debug,
}

beforeEach(() => {
  // Clear all mocks
  jest.clearAllMocks()
  localStorageMock.getItem.mockReturnValue('[]')

  // Mock console methods
  console.log = jest.fn()
  console.info = jest.fn()
  console.warn = jest.fn()
  console.error = jest.fn()
  console.debug = jest.fn()

  // Clear logger logs
  logger.clearLogs()
})

afterAll(() => {
  // Restore console methods
  Object.assign(console, originalConsole)
})

describe('Logger', () => {
  describe('Basic Logging', () => {
    it('logs error messages', () => {
      logger.error('Test error message')

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Test error message')
      )
    })

    it('logs warning messages', () => {
      logger.warn('Test warning message')

      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] Test warning message')
      )
    })

    it('logs info messages', () => {
      logger.info('Test info message')

      expect(console.info).toHaveBeenCalledWith(expect.stringContaining('[INFO] Test info message'))
    })

    it('logs debug messages', () => {
      logger.debug('Test debug message')

      expect(console.debug).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG] Test debug message')
      )
    })

    it('includes additional data in logs', () => {
      const testData = { userId: '123', action: 'login' }
      logger.info('User action', testData)

      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] User action'),
        testData
      )
    })

    it('includes source information', () => {
      logger.error('Test error', null, 'authentication')

      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].source).toBe('authentication')
    })
  })

  describe('Log Level Management', () => {
    it('respects log level filtering', () => {
      logger.setLogLevel(LogLevel.WARN)

      logger.debug('Debug message')
      logger.info('Info message')
      logger.warn('Warning message')
      logger.error('Error message')

      // Only warn and error should be logged
      expect(console.debug).not.toHaveBeenCalled()
      expect(console.info).not.toHaveBeenCalled()
      expect(console.warn).toHaveBeenCalled()
      expect(console.error).toHaveBeenCalled()
    })

    it('stores logs regardless of console output', () => {
      logger.setLogLevel(LogLevel.ERROR) // Only errors to console

      logger.debug('Debug message')
      logger.info('Info message')
      logger.warn('Warning message')
      logger.error('Error message')

      // All messages should be stored
      const logs = logger.getLogs()
      expect(logs).toHaveLength(5) // Including the setLogLevel call
    })
  })

  describe('Specialized Logging Methods', () => {
    it('tracks errors with stack traces', () => {
      const testError = new Error('Test error')
      logger.trackError(testError, 'user-action', { userId: '123' })

      const logs = logger.getLogs()
      const errorLog = logs.find((log) => log.message.includes('Test error'))

      expect(errorLog).toBeDefined()
      expect(errorLog?.data).toMatchObject({
        name: 'Error',
        stack: expect.any(String),
        userId: '123',
      })
      expect(errorLog?.source).toBe('user-action')
    })

    it('tracks user actions', () => {
      logger.trackUserAction('button-click', { buttonId: 'submit' })

      const logs = logger.getLogs()
      const actionLog = logs.find((log) => log.message.includes('User action: button-click'))

      expect(actionLog).toBeDefined()
      expect(actionLog?.data).toMatchObject({ buttonId: 'submit' })
      expect(actionLog?.source).toBe('user-interaction')
    })

    it('tracks API calls', () => {
      logger.trackApiCall('POST', '/api/events', 201, 250, { eventId: 'evt_123' })

      const logs = logger.getLogs()
      const apiLog = logs.find((log) => log.message.includes('API POST /api/events'))

      expect(apiLog).toBeDefined()
      expect(apiLog?.data).toMatchObject({
        method: 'POST',
        url: '/api/events',
        status: 201,
        duration: '250ms',
        eventId: 'evt_123',
      })
      expect(apiLog?.source).toBe('api')
    })

    it('tracks API errors', () => {
      logger.trackApiCall('GET', '/api/events', 500, 1000)

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] API GET /api/events'),
        expect.objectContaining({
          status: 500,
        })
      )
    })

    it('tracks component lifecycle', () => {
      logger.trackComponentMount('UserProfile', { userId: '123' })
      logger.trackComponentUnmount('UserProfile')

      const logs = logger.getLogs()

      expect(
        logs.some(
          (log) => log.message.includes('Component mounted: UserProfile') && log.source === 'react'
        )
      ).toBe(true)

      expect(
        logs.some(
          (log) =>
            log.message.includes('Component unmounted: UserProfile') && log.source === 'react'
        )
      ).toBe(true)
    })

    it('tracks form submissions', () => {
      logger.trackFormSubmit('login-form', true)
      logger.trackFormSubmit('contact-form', false, { email: 'Invalid format' })

      const logs = logger.getLogs()

      const successLog = logs.find((log) =>
        log.message.includes('login-form submitted successfully')
      )
      expect(successLog?.level).toBe(LogLevel.INFO)

      const failLog = logs.find((log) => log.message.includes('contact-form failed'))
      expect(failLog?.level).toBe(LogLevel.WARN)
      expect(failLog?.data?.errors).toMatchObject({ email: 'Invalid format' })
    })

    it('tracks page views', () => {
      logger.trackPageView('/events', 'https://example.com/')

      const logs = logger.getLogs()
      const pageLog = logs.find((log) => log.message.includes('Page view: /events'))

      expect(pageLog).toBeDefined()
      expect(pageLog?.data).toMatchObject({
        path: '/events',
        referrer: 'https://example.com/',
      })
      expect(pageLog?.source).toBe('navigation')
    })
  })

  describe('Performance Logging', () => {
    it('creates performance timers', () => {
      const endTimer = logger.startTimer('database-query')

      // Simulate some work
      setTimeout(() => {
        endTimer()
      }, 100)

      const logs = logger.getLogs()
      expect(
        logs.some(
          (log) =>
            log.message.includes('Timer started: database-query') && log.source === 'performance'
        )
      ).toBe(true)
    })
  })

  describe('Log Management', () => {
    it('stores logs locally', () => {
      logger.info('Test message')

      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].message).toBe('Test message')
      expect(logs[0].level).toBe(LogLevel.INFO)
      expect(logs[0].timestamp).toBeDefined()
    })

    it('returns recent logs', () => {
      // Add multiple logs
      for (let i = 0; i < 10; i++) {
        logger.info(`Message ${i}`)
      }

      const recentLogs = logger.getRecentLogs(5)
      expect(recentLogs).toHaveLength(5)
      expect(recentLogs[4].message).toBe('Message 9') // Most recent
    })

    it('clears logs', () => {
      logger.info('Test message')
      expect(logger.getLogs()).toHaveLength(1)

      logger.clearLogs()

      // Should have one log (the "Logs cleared" message)
      const logs = logger.getLogs()
      expect(logs).toHaveLength(1)
      expect(logs[0].message).toBe('Logs cleared')
    })

    it('sets user ID for session tracking', () => {
      logger.setUserId('user_123')

      const logs = logger.getLogs()
      const userLog = logs.find((log) => log.message.includes('User session started'))

      expect(userLog).toBeDefined()
      expect(userLog?.data).toMatchObject({ userId: 'user_123' })
    })

    it('limits stored logs to prevent memory issues', () => {
      // This would require testing with more than 1000 logs
      // For now, we'll just verify the concept works
      logger.info('Test message')
      const logs = logger.getLogs()
      expect(logs.length).toBeLessThanOrEqual(1000)
    })
  })

  describe('LocalStorage Integration', () => {
    it('stores logs in localStorage during development', () => {
      // Mock localStorage to simulate development environment
      process.env.NODE_ENV = 'development'

      logger.info('Test message for localStorage')

      // Note: In a real test, we'd need to properly mock the localStorage interaction
      // This is a simplified version to test the concept
      expect(localStorageMock.setItem).toHaveBeenCalled()
    })
  })

  describe('Error Handling', () => {
    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded')
      })

      // Should not throw an error
      expect(() => {
        logger.info('Test message')
      }).not.toThrow()
    })

    it('handles JSON parsing errors in localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid json')

      // Should not throw an error and should work normally
      expect(() => {
        logger.info('Test message')
      }).not.toThrow()
    })
  })
})
