'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Eye, Clock, Award, ArrowRight, Activity } from 'lucide-react'
import useEventStore from '@/lib/stores/eventStore'

export default function AdminDashboard() {
  const { events, getUpcomingEvents, getPastEvents } = useEventStore()
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    pastEvents: 0,
    totalAttendees: 0,
    avgAttendance: 0,
    publishedEvents: 0,
  })

  useEffect(() => {
    const upcoming = getUpcomingEvents()
    const past = getPastEvents()
    const published = events.filter((e) => e.isPublished)
    const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0)

    setStats({
      totalEvents: events.length,
      upcomingEvents: upcoming.length,
      pastEvents: past.length,
      totalAttendees,
      avgAttendance: events.length > 0 ? Math.round(totalAttendees / events.length) : 0,
      publishedEvents: published.length,
    })
  }, [events, getUpcomingEvents, getPastEvents])

  const recentEvents = getUpcomingEvents().slice(0, 5)

  const statCards = [
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/events',
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: Clock,
      color: 'from-green-500 to-green-600',
      link: '/admin/events',
    },
    {
      title: 'Total Attendees',
      value: stats.totalAttendees,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/members',
    },
    {
      title: 'Published Events',
      value: stats.publishedEvents,
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
      link: '/admin/events',
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
            <Link href="/admin/events/new" className="block">
              <button className="w-full bg-cardinal text-white py-3 px-4 rounded-lg hover:bg-cardinal-dark transition-colors flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Create New Event
              </button>
            </Link>
            <Link href="/admin/content" className="block">
              <button className="w-full bg-gold text-charcoal py-3 px-4 rounded-lg hover:bg-gold-dark transition-colors flex items-center justify-center">
                <Activity className="w-5 h-5 mr-2" />
                Manage Social Media
              </button>
            </Link>
            <Link href="/admin/members" className="block">
              <button className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                <Users className="w-5 h-5 mr-2" />
                View Members
              </button>
            </Link>
            <Link href="/admin/settings" className="block">
              <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Award className="w-5 h-5 mr-2" />
                Site Settings
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Event &ldquo;Tết Festival 2025&rdquo; was updated</span>
            <span className="text-gray-400 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">New member registration</span>
            <span className="text-gray-400 ml-auto">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600">
              Event &ldquo;Phở Night&rdquo; reached 75% capacity
            </span>
            <span className="text-gray-400 ml-auto">1 day ago</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
