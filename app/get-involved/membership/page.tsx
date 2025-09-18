'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  CheckCircle,
  Star,
  Gift,
  Calendar,
  CreditCard,
  Mail,
  User,
  School,
} from 'lucide-react'

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<'semester' | 'annual'>('semester')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    major: '',
    year: '',
    dietary: '',
    interests: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const membershipTiers = [
    {
      id: 'semester',
      name: 'Semester Membership',
      price: '$10',
      duration: 'One Semester',
      benefits: [
        'Attend all general meetings',
        'Participate in cultural events',
        'Join social activities',
        'Access to study groups',
        'Learn about Vietnamese culture',
        'Build community connections',
        'Member-only events and discounts',
        'VSA merchandise discounts',
      ],
      popular: false,
    },
    {
      id: 'annual',
      name: 'Annual Membership',
      price: '$15',
      duration: 'Full Academic Year',
      benefits: [
        'All semester member benefits',
        'Save $5 compared to semester pricing',
        'Voting rights in elections',
        'Run for leadership positions',
        'Priority event registration',
        'Year-round community access',
        'Special recognition at events',
        'Exclusive annual member activities',
      ],
      popular: true,
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tier: selectedTier }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Registration successful!',
        })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          major: '',
          year: '',
          dietary: '',
          interests: [],
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to register. Please try again.',
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-cardinal via-gold to-cardinal text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Become a Member</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Join the ISU VSA family and connect with Vietnamese culture at Iowa State
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Member Benefits</h2>
            <p className="section-subtitle">Why join ISU VSA?</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: 'Community',
                description: 'Connect with fellow students who share your interests and heritage',
              },
              {
                icon: Calendar,
                title: 'Exclusive Events',
                description:
                  'Access member-only events and priority registration for all activities',
              },
              {
                icon: Gift,
                title: 'Discounts',
                description: 'Save on event tickets, merchandise, and partner restaurants',
              },
              {
                icon: Star,
                title: 'Leadership',
                description: 'Opportunity to run for executive board and committee positions',
              },
              {
                icon: School,
                title: 'Academic Support',
                description: 'Join study groups and get mentorship from upperclassmen',
              },
              {
                icon: CheckCircle,
                title: 'Voting Rights',
                description: 'Have a say in VSA decisions and elect your representatives',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Choose Your Membership</h2>
            <p className="section-subtitle">Select the plan that works best for you</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membershipTiers.map((tier) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`relative ${tier.popular ? 'transform scale-105' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gold text-charcoal px-4 py-1 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                <div
                  className={`card ${
                    selectedTier === tier.id
                      ? 'ring-4 ring-cardinal bg-gradient-to-br from-white to-cream'
                      : ''
                  } cursor-pointer transition-all hover:shadow-xl`}
                  onClick={() => setSelectedTier(tier.id as 'semester' | 'annual')}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-4xl font-bold text-cardinal mb-1">{tier.price}</div>
                    <p className="text-gray-600">{tier.duration}</p>
                  </div>
                  <ul className="space-y-3">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full mt-6 ${
                      selectedTier === tier.id ? 'btn-primary' : 'btn-outline'
                    }`}
                  >
                    {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="card"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Your Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-cardinal" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-cardinal" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ISU Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="netid@iastate.edu"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <School className="w-5 h-5 mr-2 text-cardinal" />
                  Academic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Major *</label>
                    <input
                      type="text"
                      name="major"
                      required
                      value={formData.major}
                      onChange={handleChange}
                      placeholder="e.g., Computer Science"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                    <select
                      name="year"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal"
                    >
                      <option value="">Select Year</option>
                      <option value="freshman">Freshman</option>
                      <option value="sophomore">Sophomore</option>
                      <option value="junior">Junior</option>
                      <option value="senior">Senior</option>
                      <option value="graduate">Graduate Student</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <fieldset>
                <legend className="text-xl font-semibold mb-4">
                  Interests (Select all that apply)
                </legend>
                <div
                  className="grid grid-cols-2 md:grid-cols-3 gap-3"
                  role="group"
                  aria-label="Interest selection"
                >
                  {[
                    'Cultural Events',
                    'Social Activities',
                    'Community Service',
                    'Professional Development',
                    'Sports',
                    'Cooking',
                    'Dance',
                    'Music',
                    'Language Learning',
                  ].map((interest) => (
                    <label
                      key={interest}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.interests.includes(interest)
                          ? 'border-cardinal bg-cardinal/10 text-cardinal'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                      />
                      <span className="text-sm font-medium">{interest}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Payment */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-cardinal" />
                  Payment Information
                </h3>
                <div className="mb-4">
                  <p className="text-lg font-semibold">
                    Selected Plan: {membershipTiers.find((t) => t.id === selectedTier)?.name}
                  </p>
                  <p className="text-2xl font-bold text-cardinal">
                    Total: {membershipTiers.find((t) => t.id === selectedTier)?.price}
                  </p>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  You will be redirected to a secure payment page after submitting this form.
                </p>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">* Required fields</p>
                <button type="submit" className="btn-primary">
                  Complete Registration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
