'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Eye, Instagram, Award, ArrowRight, Activity, Settings } from 'lucide-react'
import useEventStore from '@/lib/stores/eventStore'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function AdminDashboard() {
  const { events, getUpcomingEvents, getPastEvents } = useEventStore()
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalMembers: 0,
    boardMembers: 0,
    instagramPosts: 0,
    publishedEvents: 0,
  })

  useEffect(() => {
    loadStats()
  }, [events])

  const loadStats = async () => {
    const upcoming = getUpcomingEvents()
    const past = getPastEvents()
    const published = events.filter((e) => e.isPublished)

    // Get board member count from Firestore
    let boardCount = 0
    try {
      const boardSnapshot = await getDocs(collection(db, 'boardMembers'))
      boardCount = boardSnapshot.size
    } catch (error) {
      console.error('Error loading board members:', error)
      // Fallback to localStorage
      const boardData = localStorage.getItem('vsa-board-members')
      boardCount = boardData ? JSON.parse(boardData).length : 0
    }

    // Get Instagram posts count from Firestore
    let instagramCount = 0
    try {
      const instagramSnapshot = await getDocs(collection(db, 'instagramPosts'))
      instagramCount = instagramSnapshot.size
    } catch (error) {
      console.error('Error loading Instagram posts:', error)
      // Fallback to localStorage
      const instagramData = localStorage.getItem('vsa-instagram-posts')
      instagramCount = instagramData ? JSON.parse(instagramData).length : 0
    }

    // Get member count from localStorage (or Firestore if you want to migrate this too)
    const membersData = localStorage.getItem('vsa-members')
    const memberCount = membersData ? JSON.parse(membersData).length : 0

    setStats({
      totalEvents: events.length,
      upcomingEvents: upcoming.length,
      pastEvents: past.length,
      totalMembers: memberCount,
      boardMembers: boardCount,
      instagramPosts: instagramCount,
      publishedEvents: published.length,
    })
  }

  const recentEvents = getUpcomingEvents().slice(0, 5)

  const statCards = [
    {
      title: 'Board Members',
      value: stats.boardMembers,
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/board',
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/events',
    },
    {
      title: 'Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'from-green-500 to-green-600',
      link: '/admin/members',
    },
    {
      title: 'Instagram Posts',
      value: stats.instagramPosts,
      icon: Instagram,
      color: 'from-pink-500 to-pink-600',
      link: '/admin/content',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to VSA Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <Link href={stat.link}>
                <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
            <Link href="/admin/events" className="text-cardinal hover:underline text-sm">
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentEvents.length > 0 ? (
              recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} • {event.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-cardinal">
                      {event.attendees}/{event.maxAttendees}
                    </p>
                    <p className="text-xs text-gray-500">Registered</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No upcoming events</p>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/board" className="block">
              <button className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center">
                <Award className="w-5 h-5 mr-2" />
                Manage Board Members
              </button>
            </Link>
            <Link href="/admin/events/new" className="block">
              <button className="w-full bg-cardinal text-white py-3 px-4 rounded-lg hover:bg-cardinal-dark transition-colors flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Create New Event
              </button>
            </Link>
            <Link href="/admin/content" className="block">
              <button className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center">
                <Instagram className="w-5 h-5 mr-2" />
                Add Instagram Posts
              </button>
            </Link>
            <Link href="/admin/settings" className="block">
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Settings className="w-5 h-5 mr-2" />
                Site Settings
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">System Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Website Status</span>
            </div>
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Instagram Integration</span>
            </div>
            <span className="text-green-600 font-medium">Ready (Embed Mode)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Database</span>
            </div>
            <span className="text-yellow-600 font-medium">Local Storage (Temporary)</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Email Service</span>
            </div>
            <span className="text-yellow-600 font-medium">Pending Setup</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> Data is stored in browser localStorage. For production, integrate with a database service.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
