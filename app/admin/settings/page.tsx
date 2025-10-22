'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, Globe, Mail, Lock, Bell, Shield, Eye, EyeOff } from 'lucide-react'

interface SiteSettings {
  siteName: string
  contactEmail: string
  instagramHandle: string
  discordUrl: string
  meetingTime: string
  meetingLocation: string
  enableEvents: boolean
  enableGallery: boolean
  enableVSARoyale: boolean
  maintenanceMode: boolean
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'ISU VSA',
    contactEmail: 'info@isuvsa.org',
    instagramHandle: '@isuvsa',
    discordUrl: 'https://discord.com/invite/Yg7We4pECw',
    meetingTime: 'Thursdays 6:00-7:30 PM',
    meetingLocation: 'Pearson Hall 2105',
    enableEvents: false,
    enableGallery: true,
    enableVSARoyale: true,
    maintenanceMode: false
  })

  const [showPassword, setShowPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      return
    }

    // In production, this would make an API call to update the password
    alert('Password change functionality will be implemented with backend integration')
    setNewPassword('')
    setConfirmPassword('')
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
                  checked={settings.enableVSARoyale}
                  onChange={(e) => setSettings({ ...settings, enableVSARoyale: e.target.checked })}
                  className="w-4 h-4 text-cardinal border-gray-300 rounded focus:ring-cardinal"
                />
                <span className="ml-2 text-sm text-gray-700">Enable VSA Royale Game</span>
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

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
              placeholder="Confirm new password"
            />
          </div>

          <button
            onClick={handlePasswordChange}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Lock className="w-5 h-5 mr-2" />
            Change Password
          </button>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Password changes require backend integration to be functional.
              For now, update the ADMIN_PASSWORD environment variable to change the admin password.
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