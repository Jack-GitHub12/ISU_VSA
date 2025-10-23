'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Image, { type StaticImageData } from 'next/image'

import lycheeImage from '@/assets/ACCE_Family/2024-25/lychee.jpg'
import mangoImage from '@/assets/ACCE_Family/2024-25/mango.jpg'
import strawberryImage from '@/assets/ACCE_Family/2024-25/strawberry.jpg'
import wintermelonImage from '@/assets/ACCE_Family/2024-25/wintermelon.jpg'
import accemonthImage from '@/assets/ACCE_Family/2024-25/acceMonth_example.jpg'

const AUTO_ADVANCE_DELAY = 5000

type FamilySlide = {
  image: StaticImageData
  caption: string
  subcaption?: string
}

export default function ACCEPage() {
  const familySlides = useMemo<FamilySlide[]>(
    () => [
      {
        image: wintermelonImage,
        caption: 'Wintermelon Family',
        subcaption: '2024-2025',
      },
      {
        image: lycheeImage,
        caption: 'Lychee Family',
        subcaption: '2024-2025',
      },
      {
        image: mangoImage,
        caption: 'Mango Family',
        subcaption: '2024-2025',
      },
      {
        image: strawberryImage,
        caption: 'Strawberry Family',
        subcaption: '2024-2025',
      },
    ],
    []
  )

  const [familyIndex, setFamilyIndex] = useState(0)

  useEffect(() => {
    if (familySlides.length <= 1) return

    const timer = setTimeout(() => {
      setFamilyIndex((prev) => (prev + 1) % familySlides.length)
    }, AUTO_ADVANCE_DELAY)

    return () => clearTimeout(timer)
  }, [familyIndex, familySlides.length])

  const currentFamily = familySlides[familyIndex]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-cardinal text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-gold mr-3" />
              <h1 className="text-5xl md:text-6xl font-bold">ACCE Program</h1>
              <Sparkles className="w-8 h-8 text-gold ml-3" />
            </div>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4">Anh Chi Chanh Em</p>
            <p className="text-lg max-w-4xl mx-auto opacity-90">
              older brother, older sister, older sibling, younger sibling
            </p>
          </motion.div>
        </div>
      </section>

      {/* About ACCE Section */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-cardinal mb-4">What is ACCE?</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              A program for you to become closer with your VSA clubmates through a mentor/peer experience and gain a deeper connection on campus!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cardinal">
                  <h3 className="text-2xl font-bold text-cardinal mb-3">Our Mission</h3>
                  <p className="text-gray-700">
                    Become paired with upper and underclassmen for a family dynamic within VSA and create memories, compete in activities, and long-lasting bonds with your family
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-gold">
                  <h3 className="text-2xl font-bold text-gold-dark mb-3">Join!</h3>
                  <p className="text-gray-700">
                    Spend time and create wondrous memories with your ACCE family through activities throughout the year
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cardinal">
                  <h3 className="text-2xl font-bold text-cardinal mb-3">How to Join</h3>
                  <p className="text-gray-700">
                    Applications will be available once they are posted or contact eboard for possible opportunity. To be eligible for this program, you must pay member dues.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentFamily.caption}-${familyIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentFamily.image}
                    alt={currentFamily.caption}
                    fill
                    className="object-cover"
                    priority={familyIndex === 0}
                  />
                  <div className="absolute inset-0" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <motion.p
                  key={`caption-${currentFamily.caption}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg font-semibold"
                >
                  {currentFamily.caption}
                </motion.p>
                {currentFamily.subcaption && (
                  <motion.p
                    key={`subcaption-${currentFamily.subcaption}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className="text-sm opacity-90"
                  >
                    {currentFamily.subcaption}
                  </motion.p>
                )}
              </div>

              {familySlides.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {familySlides.map((slide, index) => (
                    <button
                      key={`${slide.caption}-${index}`}
                      onClick={() => setFamilyIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === familyIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Show ACCE family slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
