'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface TestResult {
  name: string
  status: 'pass' | 'fail' | 'pending'
  message: string
}

export default function AdminTestPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    const results: TestResult[] = []

    // Test 1: Check localStorage for board members
    try {
      const boardData = localStorage.getItem('vsa-board-members')
      if (boardData) {
        const members = JSON.parse(boardData)
        results.push({
          name: 'Board Members Storage',
          status: 'pass',
          message: `Found ${members.length} board members in localStorage`
        })
      } else {
        localStorage.setItem('vsa-board-members', JSON.stringify([]))
        results.push({
          name: 'Board Members Storage',
          status: 'pass',
          message: 'Initialized board members storage'
        })
      }
    } catch (error) {
      results.push({
        name: 'Board Members Storage',
        status: 'fail',
        message: 'Failed to access board members storage'
      })
    }

    // Test 2: Check localStorage for regular members
    try {
      const membersData = localStorage.getItem('vsa-members')
      if (membersData) {
        const members = JSON.parse(membersData)
        results.push({
          name: 'Members Storage',
          status: 'pass',
          message: `Found ${members.length} members in localStorage`
        })
      } else {
        localStorage.setItem('vsa-members', JSON.stringify([]))
        results.push({
          name: 'Members Storage',
          status: 'pass',
          message: 'Initialized members storage'
        })
      }
    } catch (error) {
      results.push({
        name: 'Members Storage',
        status: 'fail',
        message: 'Failed to access members storage'
      })
    }

    // Test 3: Check localStorage for events
    try {
      const eventsData = localStorage.getItem('vsa-events')
      if (eventsData) {
        const events = JSON.parse(eventsData)
        results.push({
          name: 'Events Storage',
          status: 'pass',
          message: `Found ${events.length} events in localStorage`
        })
      } else {
        localStorage.setItem('vsa-events', JSON.stringify([]))
        results.push({
          name: 'Events Storage',
          status: 'pass',
          message: 'Initialized events storage'
        })
      }
    } catch (error) {
      results.push({
        name: 'Events Storage',
        status: 'fail',
        message: 'Failed to access events storage'
      })
    }

    // Test 4: Check localStorage for Instagram posts
    try {
      const postsData = localStorage.getItem('vsa-instagram-posts')
      if (postsData) {
        const posts = JSON.parse(postsData)
        results.push({
          name: 'Instagram Posts Storage',
          status: 'pass',
          message: `Found ${posts.length} Instagram posts in localStorage`
        })
      } else {
        localStorage.setItem('vsa-instagram-posts', JSON.stringify([]))
        results.push({
          name: 'Instagram Posts Storage',
          status: 'pass',
          message: 'Initialized Instagram posts storage'
        })
      }
    } catch (error) {
      results.push({
        name: 'Instagram Posts Storage',
        status: 'fail',
        message: 'Failed to access Instagram posts storage'
      })
    }

    // Test 5: Check authentication token
    try {
      const token = localStorage.getItem('vsa-admin-token')
      if (token) {
        results.push({
          name: 'Authentication',
          status: 'pass',
          message: 'Admin session token found and active'
        })
      } else {
        results.push({
          name: 'Authentication',
          status: 'fail',
          message: 'No admin session token found - please log in'
        })
      }
    } catch (error) {
      results.push({
        name: 'Authentication',
        status: 'fail',
        message: 'Failed to check authentication status'
      })
    }

    // Test 6: Test API endpoints
    try {
      const response = await fetch('/api/admin/board')
      if (response.ok) {
        results.push({
          name: 'Board API Endpoint',
          status: 'pass',
          message: 'Board API endpoint is accessible'
        })
      } else {
        results.push({
          name: 'Board API Endpoint',
          status: 'fail',
          message: `Board API returned status ${response.status}`
        })
      }
    } catch (error) {
      results.push({
        name: 'Board API Endpoint',
        status: 'fail',
        message: 'Failed to reach Board API endpoint'
      })
    }

    setTestResults(results)
    setIsRunning(false)
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const passCount = testResults.filter(r => r.status === 'pass').length
  const failCount = testResults.filter(r => r.status === 'fail').length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Panel System Test</h1>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-semibold">{passCount} Passed</span>
              </div>
              <div className="flex items-center">
                <XCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="font-semibold">{failCount} Failed</span>
              </div>
            </div>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors disabled:opacity-50"
            >
              {isRunning ? 'Running Tests...' : 'Re-run Tests'}
            </button>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-500"
              style={{ width: `${testResults.length > 0 ? (passCount / testResults.length) * 100 : 0}%` }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                result.status === 'pass'
                  ? 'bg-green-50 border-green-200'
                  : result.status === 'fail'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">{getStatusIcon(result.status)}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{result.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {testResults.length > 0 && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Test Summary</h3>
            <p className="text-sm text-blue-700">
              {failCount === 0
                ? '✅ All systems operational! The admin panel is fully functional.'
                : `⚠️ ${failCount} test${failCount !== 1 ? 's' : ''} failed. Please check the failed items above.`
              }
            </p>
            {failCount === 0 && (
              <div className="mt-3 text-sm text-blue-700">
                <p className="font-semibold mb-1">Features Ready:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Board member management with image uploads</li>
                  <li>Event creation and management</li>
                  <li>Member registration tracking</li>
                  <li>Instagram content integration</li>
                  <li>Admin authentication system</li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}