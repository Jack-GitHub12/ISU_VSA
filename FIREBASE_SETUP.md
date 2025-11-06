# Firebase Authentication Setup for ISU VSA Admin Panel

## Overview
The ISU VSA admin panel has been configured to use Firebase Authentication for secure admin access management.

## Firebase Project Details
- **Project ID**: `isuvsa-7423e`
- **Project Name**: ISU VSA
- **Web App ID**: `1:800555563573:web:dfea7587951e504450cf7c`
- **Auth Domain**: `isuvsa-7423e.firebaseapp.com`

## Admin Credentials
- **Email**: `admin@isuvsa.org`
- **Password**: `vsaadmin2025`

## How It Works

### 1. Authentication Flow
When you access `/admin`:
1. The admin panel displays a login form
2. Enter the admin email and password
3. The system authenticates through Firebase
4. If credentials are valid, a session is created
5. You gain access to the admin dashboard

### 2. First-Time Setup
When you first log in with the password `vsaadmin2025`:
- If the admin user doesn't exist in Firebase, it will be automatically created
- The user will be authenticated immediately after creation
- All subsequent logins will validate against Firebase

### 3. Security Features
- **Firebase Authentication**: Industry-standard secure authentication
- **Session Management**: 24-hour session tokens
- **Encrypted Communication**: All auth requests use HTTPS
- **Password Security**: Passwords are never stored in plaintext

## File Structure

```
/lib/
├── firebase.ts          # Firebase client configuration
├── firebase-admin.ts    # Firebase admin SDK setup
└── auth-helpers.ts      # Authentication helper functions

/app/api/admin/auth/
└── route.ts            # API endpoint for authentication

/.env.local             # Environment variables (Firebase config)
```

## Testing the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Access the admin panel**:
   - Open your browser
   - Navigate to `http://localhost:3002/admin` (or the port shown in terminal)
   - You should see the admin login page

3. **Log in**:
   - Enter email: `admin@isuvsa.org`
   - Enter password: `vsaadmin2025`
   - Click "Login to Admin Panel"

4. **Verify access**:
   - After successful login, you should see the admin dashboard
   - You can manage events, members, content, and settings

## Changing the Admin Password

To change the admin password:

1. **Using Firebase Console**:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select project `isuvsa-7423e`
   - Navigate to Authentication > Users
   - Find `admin@isuvsa.org`
   - Click the menu (⋮) and select "Reset password"

2. **Programmatically** (add this feature to admin settings):
   - Can implement a password change feature in the admin settings panel
   - Would use Firebase's `updatePassword()` function

## Security Recommendations

1. **Change the default password** immediately after first setup
2. **Use a strong password** (min 12 characters, mixed case, numbers, symbols)
3. **Consider adding 2FA** through Firebase for additional security
4. **Regularly review access logs** in Firebase Console
5. **Keep Firebase SDK updated** to latest versions

## Troubleshooting

### Cannot log in
- Verify the email and password are correct
- Check browser console for error messages
- Ensure Firebase project is active
- Verify network connection

### Session expires frequently
- Sessions last 24 hours by default
- Can be adjusted in `/app/api/admin/auth/route.ts`
- Check `SESSION_DURATION` constant

### Firebase connection errors
- Verify Firebase configuration in `.env.local`
- Check Firebase project status in console
- Ensure API keys are valid

## Additional Features (Future Enhancements)

Consider implementing:
1. **Multiple admin users** with role-based access
2. **Password reset via email**
3. **Two-factor authentication**
4. **Login attempt limiting**
5. **Audit logs for admin actions**
6. **Automatic session refresh**

## Support

For issues or questions:
1. Check Firebase Console for authentication errors
2. Review server logs for API errors
3. Contact the development team

---
*Setup completed: November 2, 2025*
*Firebase Project: isuvsa-7423e*