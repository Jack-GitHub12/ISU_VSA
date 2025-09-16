'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Users, Target, Heart, Globe, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-cardinal-gold text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About ISU VSA</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Building bridges between Vietnamese culture and the Iowa State community since 1985
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                The Iowa State University Vietnamese Student Association (ISU VSA) is dedicated to promoting Vietnamese culture, 
                fostering community connections, and supporting the academic and personal growth of our members.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                We strive to create an inclusive environment where students can explore their heritage, 
                build lasting friendships, and develop leadership skills that will serve them throughout their lives.
              </p>
              <Link href="/about/mission" className="btn-primary inline-flex items-center">
                Learn More About Our Mission
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="ISU VSA Mission"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Heart,
                title: 'Community',
                description: 'Building strong bonds and supporting each other through our journey at ISU'
              },
              {
                icon: Globe,
                title: 'Culture',
                description: 'Preserving and sharing Vietnamese traditions with the broader community'
              },
              {
                icon: Users,
                title: 'Leadership',
                description: 'Developing future leaders through hands-on experience and mentorship'
              },
              {
                icon: Target,
                title: 'Excellence',
                description: 'Striving for excellence in academics, events, and personal growth'
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-cardinal-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="section-title">Learn More</h2>
            <p className="section-subtitle">Explore different aspects of our organization</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Executive Board',
                description: 'Meet the dedicated leaders who guide our organization',
                link: '/about/board',
                image: '/placeholder.svg'
              },
              {
                title: 'Our History',
                description: 'Discover our journey from 1985 to today',
                link: '/about/history',
                image: '/placeholder.svg'
              },
              {
                title: 'Constitution',
                description: 'Read our governing documents and bylaws',
                link: '/about/constitution',
                image: '/placeholder.svg'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={item.link} className="block group">
                  <div className="card h-full">
                    <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-cardinal transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}