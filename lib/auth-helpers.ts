import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  getAuth
} from 'firebase/auth'
import { app } from './firebase'

// Get auth instance
const auth = getAuth(app)

// Admin email and default password
const ADMIN_EMAIL = 'admin@isuvsa.org'
const DEFAULT_PASSWORD = 'vsaadmin2025' // Will be changed on first login

// Sign in admin
export const signInAdmin = async (email: string, password: string) => {
  try {
    if (!auth) {
      console.error('Firebase Auth not initialized')
      return { success: false, error: 'Authentication service not available' }
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error('Sign in error:', error)
    return { success: false, error: error.message || 'Failed to sign in' }
  }
}

// Create admin user (only for initial setup)
export const createAdminUser = async (email: string, password: string) => {
  try {
    if (!auth) {
      console.error('Firebase Auth not initialized')
      return { success: false, error: 'Authentication service not available' }
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: any) {
    console.error('Create user error:', error)
    // If user already exists, try to sign in
    if (error.code === 'auth/email-already-in-use') {
      return signInAdmin(email, password)
    }
    return { success: false, error: error.message || 'Failed to create user' }
  }
}

// Sign out
export const signOutAdmin = async () => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser
}

// Auth state observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback)
}