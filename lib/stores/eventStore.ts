import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Event {
  id: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  location: string
  category: 'cultural' | 'culinary' | 'educational' | 'gaming' | 'academic' | 'social' | 'workshop'
  featured: boolean
  attendees: number
  maxAttendees: number
  image: string
  price: string
  highlights: string[]
  rsvpDeadline: string
  createdAt: string
  updatedAt: string
  isPublished: boolean
  organizerName?: string
  organizerEmail?: string
  tags?: string[]
  registrationLink?: string
  instagramEmbed?: string
}

interface EventStore {
  events: Event[]
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  getEvent: (id: string) => Event | undefined
  getUpcomingEvents: () => Event[]
  getPastEvents: () => Event[]
  getFeaturedEvents: () => Event[]
  getEventsByCategory: (category: Event['category']) => Event[]
  togglePublishStatus: (id: string) => void
  incrementAttendees: (id: string) => void
  decrementAttendees: (id: string) => void
}

const useEventStore = create<EventStore>()(
  persist(
    (set, get) => ({
      events: [],

      addEvent: (eventData) =>
        set((state) => ({
          events: [
            ...state.events,
            {
              ...eventData,
              id: Date.now().toString(),
              attendees: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),

      updateEvent: (id, eventData) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...eventData, updatedAt: new Date().toISOString() }
              : event
          ),
        })),

      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        })),

      getEvent: (id) => {
        return get().events.find((event) => event.id === id)
      },

      getUpcomingEvents: () => {
        const now = new Date()
        return get()
          .events.filter((event) => {
            const eventDate = new Date(event.date)
            return eventDate >= now && event.isPublished
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      },

      getPastEvents: () => {
        const now = new Date()
        return get()
          .events.filter((event) => {
            const eventDate = new Date(event.date)
            return eventDate < now && event.isPublished
          })
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      },

      getFeaturedEvents: () => {
        return get().events.filter((event) => event.featured && event.isPublished)
      },

      getEventsByCategory: (category) => {
        return get().events.filter((event) => event.category === category && event.isPublished)
      },

      togglePublishStatus: (id) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, isPublished: !event.isPublished, updatedAt: new Date().toISOString() }
              : event
          ),
        })),

      incrementAttendees: (id) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id && event.attendees < event.maxAttendees
              ? { ...event, attendees: event.attendees + 1, updatedAt: new Date().toISOString() }
              : event
          ),
        })),

      decrementAttendees: (id) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id && event.attendees > 0
              ? { ...event, attendees: event.attendees - 1, updatedAt: new Date().toISOString() }
              : event
          ),
        })),
    }),
    {
      name: 'vsa-events-storage',
    }
  )
)

export default useEventStore
