import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Get admin password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vsaadmin2025'

// Simple session storage (in production, use proper session management)
const sessions = new Map<string, { authenticated: boolean; expiresAt: number }>()

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000

export async function POST(request: Request) {
  try {
    const { password, action } = await request.json()

    if (action === 'login') {
      // Verify password
      if (password === ADMIN_PASSWORD) {
        // Generate session token
        const sessionToken = crypto.randomBytes(32).toString('hex')

        // Store session
        sessions.set(sessionToken, {
          authenticated: true,
          expiresAt: Date.now() + SESSION_DURATION
        })

        // Clean up expired sessions
        for (const [token, session] of sessions.entries()) {
          if (session.expiresAt < Date.now()) {
            sessions.delete(token)
          }
        }

        return NextResponse.json({
          success: true,
          sessionToken,
          message: 'Authentication successful'
        })
      } else {
        return NextResponse.json({
          success: false,
          message: 'Invalid password'
        }, { status: 401 })
      }
    }

    if (action === 'verify') {
      const sessionToken = request.headers.get('x-session-token')

      if (!sessionToken) {
        return NextResponse.json({
          success: false,
          message: 'No session token provided'
        }, { status: 401 })
      }

      const session = sessions.get(sessionToken)

      if (!session || session.expiresAt < Date.now()) {
        sessions.delete(sessionToken!)
        return NextResponse.json({
          success: false,
          message: 'Session expired or invalid'
        }, { status: 401 })
      }

      return NextResponse.json({
        success: true,
        authenticated: true,
        message: 'Session valid'
      })
    }

    if (action === 'logout') {
      const sessionToken = request.headers.get('x-session-token')

      if (sessionToken) {
        sessions.delete(sessionToken)
      }

      return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
      })
    }

    return NextResponse.json({
      success: false,
      message: 'Invalid action'
    }, { status: 400 })

  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({
      success: false,
      message: 'Authentication error'
    }, { status: 500 })
  }
}