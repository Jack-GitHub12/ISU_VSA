'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Clock, Send, Instagram, MessageSquare } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
      <section className="relative py-16 px-4 bg-gradient-to-br from-cardinal to-gold text-white">
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
                        placeholder="John Doe"
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
                        placeholder="john@iastate.edu"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="events">Event Information</option>
                      <option value="sponsorship">Sponsorship Opportunity</option>
                      <option value="volunteer">Volunteer Interest</option>
                      <option value="general">General Question</option>
                    </select>
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
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:isuvsa@gmail.com"
                    className="flex items-start space-x-3 text-gray-600 hover:text-cardinal transition-colors"
                  >
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm">isuvsa@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm">
                        Memorial Union
                        <br />
                        2229 Lincoln Way
                        <br />
                        Ames, IA 50011
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 text-gray-600">
                    <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Meetings</p>
                      <p className="text-sm">
                        Bi-weekly during fall and spring semesters
                        <br />
                        Check Instagram for latest updates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="space-y-3">
                  <a
                    href="https://instagram.com/isuvsa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-opacity w-full"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="font-medium">Follow @isuvsa</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center space-x-2 bg-[#5865F2] text-white py-3 px-4 rounded-lg hover:bg-[#4752C4] transition-colors w-full"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">Join Discord</span>
                  </a>
                </div>
              </div>

              {/* Office Location */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Find Us</h3>
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2976.0385471987697!2d-93.64999068456021!3d42.02596017921183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87ee70624e7b9b73%3A0x8a8f2d3b0f0f0f0f!2sMemorial%20Union%2C%20Ames%2C%20IA%2050011!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
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
                question: 'How do I become a member of ISU VSA?',
                answer:
                  'ISU VSA membership is open to all Iowa State students, faculty, alumni, and community members. Simply attend our meetings and events! To be a voting member, you must attend 51% of events/meetings.',
              },
              {
                question: 'Do I need to be Vietnamese to join?',
                answer:
                  'Not at all! ISU VSA welcomes everyone interested in Vietnamese culture and community, regardless of background.',
              },
              {
                question: 'When are general meetings held?',
                answer:
                  'General meetings are held bi-weekly during fall and spring semesters. Check our Instagram @isuvsa for the latest meeting times and locations.',
              },
              {
                question: 'How can I get involved in planning events?',
                answer:
                  'We have various committee positions including Event Managers, PR Chair, Education Chair, and Fundraising roles. Elections are held yearly at the end of spring semester.',
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
