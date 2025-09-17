'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { sanitizeInstagramEmbed } from '@/lib/sanitize'
import DatePicker from 'react-datepicker'
import {
  ArrowLeft,
  MapPin,
  Users,
  DollarSign,
  Tag,
  Instagram,
  Link as LinkIcon,
  Save,
  Eye,
} from 'lucide-react'
import Link from 'next/link'
import useEventStore, { Event } from '@/lib/stores/eventStore'
import 'react-datepicker/dist/react-datepicker.css'

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.enum([
    'cultural',
    'culinary',
    'educational',
    'gaming',
    'academic',
    'social',
    'workshop',
  ]),
  location: z.string().min(3, 'Location is required'),
  maxAttendees: z.number().min(1, 'Must allow at least 1 attendee'),
  price: z.string().min(1, 'Price information is required'),
  organizerName: z.string().optional(),
  organizerEmail: z
    .string()
    .min(1, 'Organizer email is required')
    .email('Please enter a valid email address'),
  registrationLink: z.string().url().optional().or(z.literal('')),
  instagramEmbed: z.string().optional(),
})

type EventFormData = z.infer<typeof eventSchema>

export default function NewEventPage() {
  const router = useRouter()
  const { addEvent } = useEventStore()
  const [date, setDate] = useState<Date>(new Date())
  const [startTime, setStartTime] = useState<Date>(new Date())
  const [endTime, setEndTime] = useState<Date>(new Date())
  const [rsvpDeadline, setRsvpDeadline] = useState<Date>(new Date())
  const [highlights, setHighlights] = useState<string[]>([''])
  const [tags, setTags] = useState<string[]>([''])
  const [featured, setFeatured] = useState(false)
  const [isPublished, setIsPublished] = useState(false)
  const [previewEmbed, setPreviewEmbed] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      maxAttendees: 50,
      price: 'Free',
    },
  })

  const instagramEmbedValue = watch('instagramEmbed')

  const onSubmit = async (data: EventFormData) => {
    const eventData: Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'attendees'> = {
      ...data,
      date: date.toISOString().split('T')[0],
      startTime: startTime.toTimeString().slice(0, 5),
      endTime: endTime.toTimeString().slice(0, 5),
      rsvpDeadline: rsvpDeadline.toISOString().split('T')[0],
      highlights: highlights.filter((h) => h.trim() !== ''),
      tags: tags.filter((t) => t.trim() !== ''),
      featured,
      isPublished,
      image: '/images/eboard/eboardGroup.JPG',
    }

    addEvent(eventData)
    router.push('/admin/events')
  }

  const addHighlight = () => setHighlights([...highlights, ''])
  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index))
  }
  const updateHighlight = (index: number, value: string) => {
    const updated = [...highlights]
    updated[index] = value
    setHighlights(updated)
  }

  const addTag = () => setTags([...tags, ''])
  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index))
  }
  const updateTag = (index: number, value: string) => {
    const updated = [...tags]
    updated[index] = value
    setTags(updated)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center text-gray-600 hover:text-cardinal mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-2">Fill in the details to create a new event</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                {...register('title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                placeholder="e.g., Tết Festival 2025"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                placeholder="Provide a detailed description of the event..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                {...register('category')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
              >
                <option value="">Select a category</option>
                <option value="cultural">Cultural</option>
                <option value="culinary">Culinary</option>
                <option value="educational">Educational</option>
                <option value="gaming">Gaming</option>
                <option value="academic">Academic</option>
                <option value="social">Social</option>
                <option value="workshop">Workshop</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('location')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="e.g., Memorial Union Great Hall"
                />
              </div>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Date and Time */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Date & Time</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Date *</label>
              <DatePicker
                selected={date}
                onChange={(date: Date | null) => date && setDate(date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                RSVP Deadline *
              </label>
              <DatePicker
                selected={rsvpDeadline}
                onChange={(date: Date | null) => date && setRsvpDeadline(date)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                dateFormat="MMMM d, yyyy"
                maxDate={date}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
              <DatePicker
                selected={startTime}
                onChange={(date: Date | null) => date && setStartTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
              <DatePicker
                selected={endTime}
                onChange={(date: Date | null) => date && setEndTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
              />
            </div>
          </div>
        </div>

        {/* Capacity and Pricing */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Capacity & Pricing</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Attendees *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('maxAttendees', { valueAsNumber: true })}
                  type="number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="50"
                />
              </div>
              {errors.maxAttendees && (
                <p className="text-red-500 text-sm mt-1">{errors.maxAttendees.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register('price')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="e.g., Free, $10 Students, $15 General"
                />
              </div>
              {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
            </div>
          </div>
        </div>

        {/* Social Media Integration */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Social Media Integration</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Instagram className="inline w-4 h-4 mr-1" />
              Instagram Embed Code
            </label>
            <textarea
              {...register('instagramEmbed')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal font-mono text-sm"
              placeholder='Paste Instagram embed code here (e.g., <blockquote class="instagram-media"...></blockquote>)'
            />
            <p className="text-sm text-gray-500 mt-2">
              To get the embed code: Open Instagram post → Click ··· → Embed → Copy Embed Code
            </p>
            {instagramEmbedValue && (
              <button
                type="button"
                onClick={() => setPreviewEmbed(!previewEmbed)}
                className="mt-2 text-cardinal hover:underline flex items-center gap-1"
              >
                <Eye className="w-4 h-4" />
                {previewEmbed ? 'Hide' : 'Show'} Preview
              </button>
            )}
            {previewEmbed && instagramEmbedValue && (
              <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizeInstagramEmbed(instagramEmbedValue) }}
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <LinkIcon className="inline w-4 h-4 mr-1" />
              Registration Link
            </label>
            <input
              {...register('registrationLink')}
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
              placeholder="https://example.com/register"
            />
            {errors.registrationLink && (
              <p className="text-red-500 text-sm mt-1">{errors.registrationLink.message}</p>
            )}
          </div>
        </div>

        {/* Highlights and Tags */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Highlights & Tags</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Highlights</label>
            {highlights.map((highlight, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={highlight}
                  onChange={(e) => updateHighlight(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="e.g., Lion Dance Performance"
                />
                {highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addHighlight}
              className="text-cardinal hover:underline text-sm"
            >
              + Add Highlight
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="inline w-4 h-4 mr-1" />
              Tags
            </label>
            {tags.map((tag, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                  placeholder="e.g., cultural, festival"
                />
                {tags.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addTag}
              className="text-cardinal hover:underline text-sm"
            >
              + Add Tag
            </button>
          </div>
        </div>

        {/* Organizer Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Organizer Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organizer Name</label>
              <input
                {...register('organizerName')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                placeholder="e.g., VSA Executive Board"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organizer Email *
              </label>
              <input
                {...register('organizerEmail')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                placeholder="e.g., vsa@iastate.edu"
              />
              {errors.organizerEmail && (
                <p className="text-red-500 text-sm mt-1">{errors.organizerEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Publishing Options */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>

          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="mr-3 w-4 h-4 text-cardinal focus:ring-cardinal"
              />
              <span className="font-medium">Feature this event</span>
              <span className="ml-2 text-gray-500 text-sm">
                (Shows prominently on the homepage)
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="mr-3 w-4 h-4 text-cardinal focus:ring-cardinal"
              />
              <span className="font-medium">Publish immediately</span>
              <span className="ml-2 text-gray-500 text-sm">(Make visible to users)</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/events">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-cardinal text-white rounded-lg hover:bg-cardinal-dark transition-colors flex items-center disabled:opacity-50"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
