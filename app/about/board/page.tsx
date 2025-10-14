'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image, { type StaticImageData } from 'next/image'
import { Mail, Linkedin, Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import { IMAGES } from '@/lib/constants'

import anhFigure from '@/assets/eboard/2025-2026/figurines/anhFigure.jpg'
import dongFigure from '@/assets/eboard/2025-2026/figurines/dongFigure.jpg'
import dylanFigure from '@/assets/eboard/2025-2026/figurines/dylanFigure.jpg'
import jennaFigure from '@/assets/eboard/2025-2026/figurines/jennaFigure.jpg'
import kayleeFigure from '@/assets/eboard/2025-2026/figurines/kayleeFigure.jpg'
import sabynFigure from '@/assets/eboard/2025-2026/figurines/sabynFigure.jpg'
import trishFigure from '@/assets/eboard/2025-2026/figurines/trishFigure.jpg'
import andrewSFigure from '@/assets/eboard/2025-2026/figurines/andrewS_Figure.jpg'
import andrewPFigure from '@/assets/eboard/2025-2026/figurines/andrewP_Figure.jpg'
import winsonFigure from '@/assets/eboard/2025-2026/figurines/winsonFigure.jpg'

interface BoardMember {
  name: string
  position: string
  image?: string | StaticImageData
  email?: string
  major?: string
  year?: string
  bio?: string
  linkedin?: string
  instagram?: string
}

const figurineImages: Record<string, StaticImageData> = {
  'Dong Nguyen': dongFigure,
  'Trish Nguyen': trishFigure,
  'Dylan Topic': dylanFigure,
  'Kaylee Rianto': kayleeFigure,
  'Anh Le': anhFigure,
  'Sabyn Jones': sabynFigure,
  'Jenna Le': jennaFigure,
  'Andrew Sinnorai': andrewSFigure,
  'Winson Vetsavong': winsonFigure,
  'Andrew Pham': andrewPFigure,
}

// Executive board members - to be updated each year after elections
const executiveBoard: BoardMember[] = [
  {
    name: 'Dong Nguyen',
    position: 'President',
    image: figurineImages['Dong Nguyen'],
    email: 'dong0603@iastate.edu',
    major: 'Community and Regional Planning Major',
    year: '3rd Year',
    bio: 'hello my name is dong :3, i like capabaras and fart sounds',
  },
  {
    name: 'Trish Nguyen',
    position: 'Vice President',
    image: figurineImages['Trish Nguyen'],
    email: 'phuong@iastate.edu',
    major: 'Apparel Mechandising and Design',
    year: '2nd Year',
    bio: 'hello I am trish the greatest',
  },
  {
    name: 'Dylan Topic',
    position: 'Treasurer',
    image: figurineImages['Dylan Topic'],
    email: 'dylan004@iastate.edu',
    major: 'Computer Science',
    year: '3rd Year',
    bio: 'This is Dylan Topic also known for being the esport president',
  },
  {
    name: 'Kaylee Rianto',
    position: 'Secretary',
    image: figurineImages['Kaylee Rianto'],
    email: 'comet15@iastate.edu',
    major: 'Community and Regional Planning',
    year: '2nd Year',
    bio: 'hello I am Kaylee also known as K and I have a collection of pickles',
  },
  {
    name: 'Anh Le',
    position: 'Student Advisor',
    image: figurineImages['Anh Le'],
    email: 'anhnle@iastate.edu',
    major: 'Graphic Design',
    year: '4th Year',
    bio: 'Greatest President',
  },
  {
    name: 'Sabyn Jones',
    position: 'Public Relations Chair',
    image: figurineImages['Sabyn Jones'],
    email: 'sabynaj@iastate.edu',
    major: 'Graphic Design',
    year: '3rd Year',
    bio: 'Hello',
  },
  {
    name: 'Jenna Le',
    position: 'Education Chair',
    image: figurineImages['Jenna Le'],
    email: 'jennale@iastate.edu',
    major: 'Integrated Studio Arts',
    year: '2nd Year',
    bio: 'Education',
  },
  {
    name: 'Andrew Sinnorai',
    position: 'Fundraising Chair',
    image: figurineImages['Andrew Sinnorai'],
    email: 'andsin17@iastate.edu',
    major: 'Supply Chain Mangement',
    year: '2nd Year',
    bio: 'my credit counts me as a first year',
  },
  {
    name: 'Winson Vetsavong',
    position: 'Event Planner 1',
    image: figurineImages['Winson Vetsavong'],
    email: 'wvetsa1@iastate.edu',
    major: 'Software Engineering',
    year: '4th Year',
    bio: 'Hello',
  },
  {
    name: 'Andrew Pham',
    position: 'Event Planner 2',
    image: figurineImages['Andrew Pham'],
    email: 'phama23@iastate.edu',
    major: 'Software Engineering',
    year: '2nd Year',
    bio: 'yes sir',
  },
]

const BOARD_ROLES = [
  'President',
  'Vice President',
  'Treasurer',
  'Secretary',
  'Student Advisor',
  'Public Relations Chair',
  'Education Chair',
  'Fundraising Chair',
  'Event Planner 1',
  'Event Planner 2',
] as const

export default function ExecutiveBoardPage() {
  const slides = useMemo(() =>
    BOARD_ROLES.map((role) => {
      const member = executiveBoard.find((m) => m.position === role)

      return {
        role,
        name: member?.name ?? 'Coming Soon',
        image: member?.image ?? IMAGES.placeholder.board,
        email: member?.email ?? 'isuvsa@gmail.com',
        major: member?.major,
        year: member?.year,
        bio:
          member?.bio ??
          `Stay tuned to meet the dedicated leader who will serve as our ${role.toLowerCase()}.`,
        linkedin: member?.linkedin,
        instagram: member?.instagram,
      }
    }),
  [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = slides.length
  const currentSlide = slides[currentIndex]

  const goToSlide = (index: number) => {
    if (totalSlides === 0) return
    const nextIndex = (index + totalSlides) % totalSlides
    setCurrentIndex(nextIndex)
  }

  const goToNext = () => goToSlide(currentIndex + 1)
  const goToPrevious = () => goToSlide(currentIndex - 1)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden text-white">
        <Image
          src="/images/eboard/eboardGroup_Smile.JPG"
          alt="ISU VSA Executive Board"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">Executive Board</h1>
          </motion.div>
        </div>
      </section>

      {/* Executive Board Slideshow */}
      <section className="py-24 bg-cream">
        <div className="flex flex-col lg:flex-row min-h-[75vh]">
          <div className="relative w-full lg:w-[35%] min-h-[320px] lg:min-h-[75vh] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentSlide.role}-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image
                  src={currentSlide.image}
                  alt={`${currentSlide.role} - ${currentSlide.name}`.replace('Coming Soon', currentSlide.role)}
                  fill
                  className="object-cover object-[50%_35%]"
                  sizes="(min-width: 1024px) 35vw, 100vw"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`info-${currentSlide.role}-${currentIndex}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1 bg-white text-charcoal px-6 py-10 md:px-10 md:py-12 lg:px-10 flex flex-col justify-between gap-8"
            >
              <div className="space-y-6">
                <p className="uppercase tracking-[0.4em] text-xs lg:text-sm text-gold text-center">2025-2026 Executive Board</p>
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-2 text-cardinal">{currentSlide.name}</h2>
                  <p className="text-2xl lg:text-3xl font-semibold text-gold mb-4">{currentSlide.role}</p>
                  {(currentSlide.major || currentSlide.year) && (
                    <p className="text-lg text-gray-600 mb-4">
                      {[currentSlide.major, currentSlide.year].filter(Boolean).join(' • ')}
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed">{currentSlide.bio}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  <a
                    href={`mailto:${currentSlide.email}`}
                    className="w-11 h-11 rounded-full bg-cardinal text-white flex items-center justify-center hover:bg-cardinal-dark transition-colors"
                    aria-label={`Email ${currentSlide.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  {currentSlide.linkedin && (
                    <a
                      href={currentSlide.linkedin}
                      className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                      aria-label={`${currentSlide.name} LinkedIn`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {currentSlide.instagram && (
                    <a
                      href={currentSlide.instagram}
                        className="w-11 h-11 rounded-full bg-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      aria-label={`${currentSlide.name} Instagram`}
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="w-11 h-11 rounded-full bg-cardinal text-white flex items-center justify-center hover:bg-cardinal-dark transition-colors"
                    aria-label="Previous board member"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goToNext}
                    className="w-11 h-11 rounded-full bg-cardinal text-white flex items-center justify-center hover:bg-cardinal-dark transition-colors"
                    aria-label="Next board member"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <section className="py-16 px-4 bg-cardinal text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6">Want to Join Our Leadership Team?</h2>
            <p className="text-xl mb-8">
              Elections are held yearly at the end of spring semester. Connect with us at events or
              reach out directly to learn how you can prepare for leadership positions.
            </p>
            <a
              href="/contact"
              className="bg-white text-cardinal px-8 py-4 rounded-lg font-semibold hover:bg-cream transition-colors inline-block"
            >
              Contact the Board
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
