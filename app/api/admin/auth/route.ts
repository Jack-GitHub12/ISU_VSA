import { NextResponse } from 'next/server'
import crypto from 'crypto'

// Admin credentials (fallback when Firebase is not available)
const ADMIN_EMAIL = 'admin@isuvsa.org'
const ADMIN_PASSWORD = 'vsaadmin2025'

// Simple session storage (in production, use proper session management)
const sessions = new Map<string, { authenticated: boolean; email: string; expiresAt: number }>()

// Session duration: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000

// Dynamic import to avoid build-time errors
async function tryFirebaseAuth(email: string, password: string) {
  try {
    const { signInAdmin, createAdminUser } = await import('@/lib/auth-helpers')

    // Try to create the admin user (in case it doesn't exist)
    await createAdminUser(email, password)

    // Now try to sign in with Firebase
    return await signInAdmin(email, password)
  } catch (error: any) {
    console.error('Firebase auth error:', error)
    // Return null to fall back to simple auth
    return null
  }
}

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json()

    if (action === 'login') {
      // Use provided email or default to admin email
      const loginEmail = email || ADMIN_EMAIL

      let authenticated = false
      let userEmail = loginEmail

      // Try Firebase authentication first
      const firebaseResult = await tryFirebaseAuth(loginEmail, password)

      if (firebaseResult && firebaseResult.success) {
        authenticated = true
        userEmail = firebaseResult.user?.email || loginEmail
      } else {
        // Fallback to simple authentication
        if (loginEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
          authenticated = true
          userEmail = ADMIN_EMAIL
        }
      }

      if (authenticated) {
        // Generate session token
        const sessionToken = crypto.randomBytes(32).toString('hex')

        // Store session
        sessions.set(sessionToken, {
          authenticated: true,
          email: userEmail,
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
          email: userEmail,
          message: 'Authentication successful'
        })
      } else {
        return NextResponse.json({
          success: false,
          message: 'Invalid credentials'
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
        email: session.email,
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