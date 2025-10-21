'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Send, Instagram } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
    <path d="M20.317 4.369a18.933 18.933 0 0 0-4.885-1.515.07.07 0 0 0-.073.035 13.226 13.226 0 0 0-.58 1.19 18.61 18.61 0 0 0-5.585 0 12.63 12.63 0 0 0-.593-1.19.077.077 0 0 0-.073-.035 18.87 18.87 0 0 0-4.885 1.515.064.064 0 0 0-.03.025C2.178 9.283 1.292 14.047 1.712 18.739a.082.082 0 0 0 .031.057 18.992 18.992 0 0 0 5.625 2.861.08.08 0 0 0 .086-.027 13.35 13.35 0 0 0 1.156-1.875.077.077 0 0 0-.041-.105 12.356 12.356 0 0 1-1.793-.863.077.077 0 0 1-.008-.129c.12-.09.238-.183.351-.277a.074.074 0 0 1 .077-.01c3.747 1.71 7.807 1.71 11.5 0a.074.074 0 0 1 .078.009 8.1 8.1 0 0 0 .352.278.077.077 0 0 1-.006.129 11.67 11.67 0 0 1-1.794.862.077.077 0 0 0-.041.106c.34.65.73 1.285 1.155 1.874a.078.078 0 0 0 .086.028 18.97 18.97 0 0 0 5.637-2.861.078.078 0 0 0 .031-.056c.47-4.884-.788-9.613-3.447-13.214a.063.063 0 0 0-.03-.025ZM8.12 15.348c-1.137 0-2.067-1.009-2.067-2.249 0-1.24.915-2.262 2.068-2.262 1.152 0 2.082 1.01 2.068 2.262 0 1.24-.916 2.249-2.069 2.249Zm7.816 0c-1.137 0-2.067-1.009-2.067-2.249 0-1.24.915-2.262 2.067-2.262 1.153 0 2.082 1.01 2.068 2.262 0 1.24-.915 2.249-2.068 2.249Z" />
  </svg>
)

export default function ContactPage() {
  const recipients = useMemo(
    () =>
      [
        { label: 'Dong Nguyen – President', email: 'dong0603@iastate.edu' },
        { label: 'Trish Nguyen – Vice President', email: 'phuong@iastate.edu' },
        { label: 'Dylan Topic – Treasurer', email: 'dylan004@iastate.edu' },
        { label: 'Kaylee Rianto – Secretary', email: 'comet15@iastate.edu' },
        { label: 'Anh Le – Student Advisor', email: 'anhnle@iastate.edu' },
        { label: 'Sabyn Jones – Public Relations', email: 'sabynaj@iastate.edu' },
        { label: 'Jenna Le – Education Chair', email: 'jennale@iastate.edu' },
        { label: 'Andrew Sinnorai – Fundraising', email: 'andsin17@iastate.edu' },
        { label: 'Winson Vetsavong – Event Planner', email: 'wvetsa1@iastate.edu' },
        { label: 'Andrew Pham – Event Planner', email: 'phama23@iastate.edu' },
        { label: 'Ethan Pham – Developer', email: 'phame20@iastate.edu' },
        { label: 'Jack Lau – Developer', email: 'jacklau@iastate.edu' },
      ] as const,
    []
  )

  const defaultRecipient = recipients[0]?.email ?? ''

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    recipient: defaultRecipient,
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Message sent successfully!',
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          recipient: defaultRecipient,
          subject: '',
          message: '',
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-cardinal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Have questions? Want to get involved? We&apos;d love to hear from you!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="card">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
                        placeholder="netid@iastate.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="recipient"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Send To *
                    </label>
                    <select
                      id="recipient"
                      name="recipient"
                      required
                      value={formData.recipient}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
                    >
                      {recipients.map((recipient) => (
                        <option key={recipient.email} value={recipient.email}>
                          {recipient.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
                      placeholder="Let us know what this is about"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors resize-none"
                      placeholder="Tell us what's on your mind..."
                    />
                  </div>

                  {submitStatus.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        submitStatus.type === 'success'
                          ? 'bg-green-50 text-green-800 border border-green-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary w-full flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Quick Contact */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">General Body Meeting</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">
                        Pearson Hall 2105, Ames, IA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Meetings</p>
                      <p className="text-sm">Bi-weekly during fall and spring semesters</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm">6:00–7:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Additional Links</h3>
                <div className="space-y-3">
                  <a
                    href={SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity w-full"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-medium">Follow @isuvsa</span>
                  </a>

                  <a
                    href={SITE_CONFIG.social.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#5865F2] text-white py-3 px-4 rounded-lg hover:bg-[#4752C4] transition-colors w-full"
                  >
                    <DiscordIcon className="w-5 h-5" />
                    <span className="font-medium">Join Discord</span>
                  </a>

                  <a
                    href="https://linktr.ee/isuvsa?fbclid=PAZXh0bgNhZW0CMTEAAae1zpAeSR04oxMb0arSbhFNu9mf3nWAfn_kzi86hq3ebn5959EjFhDwqzuA2A_aem_jk7pwiWpiHCqVOgdr5JoTQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-[#32a852] text-white py-3 px-4 rounded-lg hover:bg-[#2a8e44] transition-colors w-full"
                  >
                    <span className="font-medium">Visit Our Linktree</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Quick answers to common questions</p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'Do I need to be Vietnamese to join?',
                answer:
                  'Not at all! ISU VSA welcomes everyone with all interests, regardless of background.',
              },
              {
                question: 'Do I need to pay dues to participate in GBMs?',
                answer:
                  'Again, not at all! While you can attend any GBM for free, becoming a member allows you to waive certain activity fees and enjoy additional benefits.',
              },
              {
                question: 'How can I stay updated on upcoming events?',
                answer:
                  'Stay in touch with us for frequent updates on upcoming events through our Instagram (@isu.vsa) and Discord server! You can also ask questions or connect with members directly on Discord.',
              },
              {
                question: 'How do I join a leadership position?',
                answer:
                  'We offer a variety of leadership positions throughout the year! Internship applications typically open about two months into each new term, while executive board positions become available at the end of every semester.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
