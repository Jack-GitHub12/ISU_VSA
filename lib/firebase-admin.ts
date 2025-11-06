import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin SDK
// Note: You'll need to add FIREBASE_SERVICE_ACCOUNT environment variable
// containing the service account JSON string or use a service account key file

if (!getApps().length) {
  // For development, you can use the default credentials when running locally
  // For production, use service account credentials
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) as ServiceAccount
    initializeApp({
      credential: cert(serviceAccount),
      projectId: 'isuvsa-7423e'
    })
  } else {
    // Initialize without credentials for now
    // This will work for client-side operations but not server-side admin operations
    initializeApp({
      projectId: 'isuvsa-7423e'
    })
  }
}

const adminAuth = getAuth()
const adminDb = getFirestore()

export { adminAuth, adminDb }