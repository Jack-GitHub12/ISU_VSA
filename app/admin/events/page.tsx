'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, momentLocalizer, View } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  Calendar as CalendarIcon,
  List,
  Grid,
  Instagram,
  Copy,
  Check,
} from 'lucide-react'
import useEventStore from '@/lib/stores/eventStore'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = momentLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date()),
  getDay,
  locales,
})

export default function EventsManagementPage() {
  const { events, deleteEvent, togglePublishStatus } = useEventStore()
  const [view, setView] = useState<'calendar' | 'list' | 'grid'>('calendar')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [calendarView, setCalendarView] = useState<View>('month')
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const calendarEvents = useMemo(() => {
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      start: new Date(`${event.date} ${event.startTime}`),
      end: new Date(`${event.date} ${event.endTime}`),
      resource: event,
    }))
  }, [events])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [events, searchQuery, selectedCategory])

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id)
    }
  }

  const copyEmbedCode = (event: (typeof events)[0]) => {
    const embedCode = event.instagramEmbed || ''
    navigator.clipboard.writeText(embedCode)
    setCopiedId(event.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const eventStyleGetter = (event: { resource: (typeof events)[0] }) => {
    const isPublished = event.resource.isPublished
    const isFeatured = event.resource.featured

    let backgroundColor = '#a21e24' // cardinal
    if (!isPublished) backgroundColor = '#6b7280' // gray for unpublished
    if (isFeatured) backgroundColor = '#f9c74f' // gold for featured

    return {
      style: {
        backgroundColor,
        borderRadius: '8px',
        opacity: isPublished ? 1 : 0.7,
        color: 'white',
        border: '0',
        padding: '2px 5px',
      },
    }
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
          <p className="text-gray-600 mt-2">Manage all VSA events and activities</p>
        </div>
        <Link href="/admin/events/new">
          <button className="bg-cardinal text-white px-6 py-2 rounded-lg hover:bg-cardinal-dark transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            New Event
          </button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
            >
              <option value="all">All Categories</option>
              <option value="cultural">Cultural</option>
              <option value="culinary">Culinary</option>
              <option value="educational">Educational</option>
              <option value="gaming">Gaming</option>
              <option value="academic">Academic</option>
              <option value="social">Social</option>
              <option value="workshop">Workshop</option>
            </select>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('calendar')}
                className={`p-2 rounded ${view === 'calendar' ? 'bg-white shadow' : ''}`}
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar View */}
      {view === 'calendar' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              view={calendarView}
              onView={setCalendarView}
              onSelectEvent={(event) => setSelectedEvent(event.resource)}
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day', 'agenda']}
              popup
              toolbar
            />
          </div>
        </motion.div>
      )}

      {/* Grid View */}
      {view === 'grid' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-48 bg-gradient-to-r from-cardinal to-gold">
                {event.featured && (
                  <div className="absolute top-2 left-2 bg-gold text-charcoal px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => togglePublishStatus(event.id)}
                    className={`p-2 rounded-full ${event.isPublished ? 'bg-green-500' : 'bg-gray-500'} text-white`}
                  >
                    {event.isPublished ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  <p className="text-white/80 text-sm">
                    {new Date(event.date).toLocaleDateString()} • {event.startTime}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r
                    ${event.category === 'cultural' ? 'from-purple-500 to-purple-700' : ''}
                    ${event.category === 'culinary' ? 'from-orange-500 to-red-600' : ''}
                    ${event.category === 'educational' ? 'from-blue-500 to-blue-700' : ''}
                    ${event.category === 'gaming' ? 'from-green-500 to-green-700' : ''}
                    ${event.category === 'academic' ? 'from-indigo-500 to-indigo-700' : ''}
                    ${event.category === 'social' ? 'from-pink-500 to-pink-700' : ''}
                    ${event.category === 'workshop' ? 'from-teal-500 to-teal-700' : ''}
                  `}
                  >
                    {event.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>{event.location}</span>
                  <span>
                    {event.attendees}/{event.maxAttendees} registered
                  </span>
                </div>
                {event.instagramEmbed && (
                  <button
                    onClick={() => copyEmbedCode(event)}
                    className="w-full mb-3 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-4 h-4" />
                    {copiedId === event.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Instagram Embed
                      </>
                    )}
                  </button>
                )}
                <div className="flex gap-2">
                  <Link href={`/admin/events/${event.id}/edit`} className="flex-1">
                    <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                      <Edit2 className="w-4 h-4 mr-1" />
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* List View */}
      {view === 'list' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Social
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {event.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{new Date(event.date).toLocaleDateString()}</div>
                      <div>
                        {event.startTime} - {event.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${event.category === 'cultural' ? 'bg-purple-100 text-purple-800' : ''}
                        ${event.category === 'culinary' ? 'bg-orange-100 text-orange-800' : ''}
                        ${event.category === 'educational' ? 'bg-blue-100 text-blue-800' : ''}
                        ${event.category === 'gaming' ? 'bg-green-100 text-green-800' : ''}
                        ${event.category === 'academic' ? 'bg-indigo-100 text-indigo-800' : ''}
                        ${event.category === 'social' ? 'bg-pink-100 text-pink-800' : ''}
                        ${event.category === 'workshop' ? 'bg-teal-100 text-teal-800' : ''}
                      `}
                      >
                        {event.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {event.attendees}/{event.maxAttendees}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => togglePublishStatus(event.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {event.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.instagramEmbed && (
                        <button
                          onClick={() => copyEmbedCode(event)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          {copiedId === event.id ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Instagram className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/events/${event.id}/edit`}>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit2 className="w-5 h-5" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
            <div className="space-y-3 text-sm">
              <p>
                <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}
              </p>
              <p>
                <strong>Location:</strong> {selectedEvent.location}
              </p>
              <p>
                <strong>Category:</strong> {selectedEvent.category}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Price:</strong> {selectedEvent.price}
              </p>
              <p>
                <strong>Attendees:</strong> {selectedEvent.attendees}/{selectedEvent.maxAttendees}
              </p>
              <p>
                <strong>RSVP Deadline:</strong>{' '}
                {new Date(selectedEvent.rsvpDeadline).toLocaleDateString()}
              </p>
              {selectedEvent.instagramEmbed && (
                <div>
                  <strong>Instagram Embed:</strong>
                  <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono break-all">
                    {selectedEvent.instagramEmbed}
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
              <Link href={`/admin/events/${selectedEvent.id}/edit`}>
                <button className="px-4 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark">
                  Edit Event
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
