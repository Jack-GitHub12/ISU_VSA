'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, Globe, Bell, Shield, Info } from 'lucide-react'

interface SiteSettings {
  siteName: string
  contactEmail: string
  instagramHandle: string
  discordUrl: string
  meetingTime: string
  meetingLocation: string
  enableEvents: boolean
  enableGallery: boolean
  maintenanceMode: boolean
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'VSA at Iowa State',
    contactEmail: 'info@isuvsa.org',
    instagramHandle: '@isuvsa',
    discordUrl: 'https://discord.com/invite/Yg7We4pECw',
    meetingTime: 'Thursdays 6:00-7:30 PM',
    meetingLocation: 'Pearson Hall 2105',
    enableEvents: false,
    enableGallery: true,
    maintenanceMode: false
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const storedSettings = localStorage.getItem('vsa-site-settings')
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('vsa-site-settings', JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }


  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Settings className="w-8 h-8 text-cardinal mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
        </div>

        {saved && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            Settings saved successfully!
          </div>
        )}

        {/* General Settings */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              General Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={settings.instagramHandle}
                  onChange={(e) => setSettings({ ...settings, instagramHandle: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discord URL
                </label>
                <input
                  type="url"
                  value={settings.discordUrl}
                  onChange={(e) => setSettings({ ...settings, discordUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Time
                </label>
                <input
                  type="text"
                  value={settings.meetingTime}
                  onChange={(e) => setSettings({ ...settings, meetingTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Location
                </label>
                <input
                  type="text"
                  value={settings.meetingLocation}
                  onChange={(e) => setSettings({ ...settings, meetingLocation: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                />
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Feature Settings
            </h2>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableEvents}
                  onChange={(e) => setSettings({ ...settings, enableEvents: e.target.checked })}
                  className="w-4 h-4 text-cardinal border-gray-300 rounded focus:ring-cardinal"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Events Section</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableGallery}
                  onChange={(e) => setSettings({ ...settings, enableGallery: e.target.checked })}
                  className="w-4 h-4 text-cardinal border-gray-300 rounded focus:ring-cardinal"
                />
                <span className="ml-2 text-sm text-gray-700">Enable Gallery</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="w-4 h-4 text-cardinal border-gray-300 rounded focus:ring-cardinal"
                />
                <span className="ml-2 text-sm text-gray-700">Maintenance Mode (Site offline)</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </button>
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Information
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">Admin Password Management</p>
                <p className="mb-2">
                  The admin password is securely managed through environment variables for maximum security.
                </p>
                <p className="font-medium">To change the admin password:</p>
                <ol className="list-decimal list-inside mt-1 space-y-1">
                  <li>Update the <code className="bg-blue-100 px-1 py-0.5 rounded">ADMIN_PASSWORD</code> environment variable</li>
                  <li>Restart the application</li>
                  <li>Use the new password to login</li>
                </ol>
                <p className="mt-2 text-xs">
                  Default password: <code className="bg-blue-100 px-1 py-0.5 rounded">vsaadmin2025</code> (change immediately in production)
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Session Management:</strong> Admin sessions expire after 24 hours for security.
              You will need to login again after session expiration.
            </p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-200">
        <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
        <p className="text-sm text-gray-600 mb-4">
          These actions are irreversible. Please be certain before proceeding.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all member data?')) {
                localStorage.removeItem('vsa-members')
                alert('Member data cleared')
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Clear All Member Data
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all event data?')) {
                localStorage.removeItem('vsa-events')
                alert('Event data cleared')
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-3"
          >
            Clear All Event Data
          </button>
        </div>
      </div>
    </div>
  )
}