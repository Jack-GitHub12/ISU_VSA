export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  timestamp: string
  level: LogLevel
  message: string
  data?: unknown
  userId?: string
  sessionId?: string
  source?: string
  stack?: string
}

class Logger {
  private logLevel: LogLevel
  private sessionId: string
  private enableConsole: boolean
  private enableRemote: boolean
  private logs: LogEntry[] = []
  private maxLocalLogs = 1000

  constructor() {
    this.logLevel = process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.INFO
    this.sessionId = this.generateSessionId()
    this.enableConsole =
      process.env.NODE_ENV === 'development' ||
      process.env.NEXT_PUBLIC_ENABLE_CONSOLE_LOGS === 'true'
    this.enableRemote =
      process.env.NODE_ENV === 'production' &&
      process.env.NEXT_PUBLIC_ENABLE_REMOTE_LOGGING === 'true'
  }

  private generateSessionId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString()
    const levelName = LogLevel[level]
    return `[${timestamp}] [${levelName}] ${message}`
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    data?: unknown,
    source?: string
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      sessionId: this.sessionId,
      source,
      stack: level === LogLevel.ERROR ? new Error().stack : undefined,
    }
  }

  private storeLog(entry: LogEntry) {
    this.logs.push(entry)

    // Keep only the most recent logs
    if (this.logs.length > this.maxLocalLogs) {
      this.logs = this.logs.slice(-this.maxLocalLogs)
    }

    // Store in localStorage for debugging (development only)
    if (this.enableConsole && typeof window !== 'undefined') {
      try {
        const storedLogs = JSON.parse(localStorage.getItem('vsa_logs') || '[]')
        storedLogs.push(entry)
        const recentLogs = storedLogs.slice(-100) // Keep last 100 logs
        localStorage.setItem('vsa_logs', JSON.stringify(recentLogs))
      } catch {
        // Ignore localStorage errors
      }
    }
  }

  private async sendToRemote(entry: LogEntry) {
    if (!this.enableRemote) return

    try {
      // In production, you would send logs to your logging service
      // Example: Datadog, LogRocket, Sentry, etc.
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      })
    } catch (error) {
      // Fail silently to avoid infinite loops
      if (this.enableConsole) {
        console.warn('Failed to send log to remote service:', error)
      }
    }
  }

  private log(level: LogLevel, message: string, data?: unknown, source?: string) {
    if (!this.shouldLog(level)) return

    const entry = this.createLogEntry(level, message, data, source)
    this.storeLog(entry)

    // Console logging
    if (this.enableConsole) {
      const formattedMessage = this.formatMessage(level, message)
      const consoleMethod = this.getConsoleMethod(level)

      if (data) {
        consoleMethod(formattedMessage, data)
      } else {
        consoleMethod(formattedMessage)
      }
    }

    // Remote logging (async, non-blocking)
    if (this.enableRemote) {
      this.sendToRemote(entry).catch(() => {
        // Ignore remote logging failures
      })
    }
  }

  private getConsoleMethod(level: LogLevel): typeof console.log {
    switch (level) {
      case LogLevel.ERROR:
        return console.error
      case LogLevel.WARN:
        return console.warn
      case LogLevel.INFO:
        return console.info
      case LogLevel.DEBUG:
        return console.debug
      default:
        return console.log
    }
  }

  // Public logging methods
  error(message: string, data?: unknown, source?: string) {
    this.log(LogLevel.ERROR, message, data, source)
  }

  warn(message: string, data?: unknown, source?: string) {
    this.log(LogLevel.WARN, message, data, source)
  }

  info(message: string, data?: unknown, source?: string) {
    this.log(LogLevel.INFO, message, data, source)
  }

  debug(message: string, data?: unknown, source?: string) {
    this.log(LogLevel.DEBUG, message, data, source)
  }

  // Utility methods
  setUserId(userId: string) {
    // This can be called after user authentication
    this.info('User session started', { userId }, 'auth')
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level
    this.info('Log level changed', { level: LogLevel[level] }, 'logger')
  }

  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count)
  }

  clearLogs() {
    this.logs = []
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('vsa_logs')
      } catch {
        // Ignore localStorage errors
      }
    }
    this.info('Logs cleared', undefined, 'logger')
  }

  // Performance logging
  startTimer(label: string): () => void {
    const startTime = performance.now()
    this.debug(`Timer started: ${label}`, { startTime }, 'performance')

    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      this.info(`Timer ended: ${label}`, { duration: `${duration.toFixed(2)}ms` }, 'performance')
    }
  }

  // Error tracking
  trackError(error: Error, context?: string, additionalData?: Record<string, unknown>) {
    this.error(
      `${context ? `[${context}] ` : ''}${error.message}`,
      {
        name: error.name,
        stack: error.stack,
        ...additionalData,
      },
      context || 'error'
    )
  }

  // User interaction logging
  trackUserAction(action: string, data?: Record<string, unknown>) {
    this.info(`User action: ${action}`, data, 'user-interaction')
  }

  // API call logging
  trackApiCall(
    method: string,
    url: string,
    status?: number,
    duration?: number,
    data?: Record<string, unknown>
  ) {
    const message = `API ${method} ${url}`
    const logData = {
      method,
      url,
      status,
      duration: duration ? `${duration}ms` : undefined,
      ...data,
    }

    if (status && status >= 400) {
      this.error(message, logData, 'api')
    } else {
      this.info(message, logData, 'api')
    }
  }

  // Component lifecycle logging
  trackComponentMount(componentName: string, props?: Record<string, unknown>) {
    this.debug(`Component mounted: ${componentName}`, { props }, 'react')
  }

  trackComponentUnmount(componentName: string) {
    this.debug(`Component unmounted: ${componentName}`, undefined, 'react')
  }

  // Form logging
  trackFormSubmit(formName: string, success: boolean, errors?: Record<string, unknown>) {
    const message = `Form ${formName} ${success ? 'submitted successfully' : 'failed'}`
    const logData = { formName, success, errors }

    if (success) {
      this.info(message, logData, 'form')
    } else {
      this.warn(message, logData, 'form')
    }
  }

  // Navigation logging
  trackPageView(path: string, referrer?: string) {
    this.info(`Page view: ${path}`, { path, referrer }, 'navigation')
  }
}

// Create singleton instance
const logger = new Logger()

// Export logger instance
export default logger

// Convenience exports
export const log = logger
export const {
  error,
  warn,
  info,
  debug,
  trackError,
  trackUserAction,
  trackApiCall,
  trackComponentMount,
  trackComponentUnmount,
  trackFormSubmit,
  trackPageView,
  startTimer,
  setUserId,
  setLogLevel,
  getLogs,
  getRecentLogs,
  clearLogs,
} = logger

// React hooks for logging
export function useLogger() {
  return logger
}

export function usePerformanceLogger() {
  return {
    startTimer: logger.startTimer.bind(logger),
    trackApiCall: logger.trackApiCall.bind(logger),
  }
}

export function useErrorLogger() {
  return {
    trackError: logger.trackError.bind(logger),
    error: logger.error.bind(logger),
  }
}

// Global error handler setup
if (typeof window !== 'undefined') {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logger.error(
      'Unhandled promise rejection',
      {
        reason: event.reason,
        promise: event.promise,
      },
      'global'
    )
  })

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logger.error(
      'Uncaught error',
      {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
      },
      'global'
    )
  })
}
