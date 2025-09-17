export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  category: 'cultural' | 'social' | 'service' | 'academic'
  featured: boolean
  description: string
  attendees: number
  image: string
  price: string
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'Tết Festival 2025',
    date: '2025-02-08',
    time: '6:00 PM - 10:00 PM',
    location: 'Memorial Union Great Hall',
    category: 'cultural',
    featured: true,
    description:
      'Celebrate Vietnamese New Year with traditional performances, authentic food, and cultural activities.',
    attendees: 350,
    image: '/images/eboard/eboardGroup.JPG',
    price: '$10 Students, $15 General',
  },
  {
    id: '2',
    title: 'Phở Night Cooking Class',
    date: '2025-01-22',
    time: '5:30 PM - 7:30 PM',
    location: 'Student Innovation Center Kitchen',
    category: 'social',
    featured: false,
    description:
      'Learn to make authentic Vietnamese phở from scratch with our experienced members.',
    attendees: 30,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free for members',
  },
  {
    id: '3',
    title: 'VSA Royale Tournament',
    date: '2025-01-29',
    time: '7:00 PM - 9:00 PM',
    location: 'Parks Library 198',
    category: 'social',
    featured: false,
    description: 'Compete in our exclusive tower defense game tournament with prizes!',
    attendees: 50,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: '4',
    title: 'Community Service: Food Bank',
    date: '2025-02-01',
    time: '9:00 AM - 12:00 PM',
    location: 'Food Bank of Iowa',
    category: 'service',
    featured: false,
    description: 'Give back to the community by volunteering at the local food bank.',
    attendees: 25,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: '5',
    title: 'Study Night with VSA',
    date: '2025-02-05',
    time: '6:00 PM - 10:00 PM',
    location: 'Parks Library',
    category: 'academic',
    featured: false,
    description: 'Join us for a productive study session with snacks and good company.',
    attendees: 40,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: '6',
    title: 'Spring Roll Workshop',
    date: '2025-02-15',
    time: '3:00 PM - 5:00 PM',
    location: 'Memorial Union Kitchen',
    category: 'cultural',
    featured: false,
    description: 'Learn to make traditional Vietnamese spring rolls (gỏi cuốn).',
    attendees: 20,
    image: '/images/eboard/eboardGroup.JPG',
    price: '$5 for ingredients',
  },
]

export const pastEvents: Event[] = [
  {
    id: '7',
    title: 'Mid-Autumn Festival 2024',
    date: '2024-09-17',
    time: '6:00 PM - 9:00 PM',
    location: 'Central Campus',
    category: 'cultural',
    featured: false,
    description:
      'Celebrated the Mid-Autumn Festival with mooncakes, lanterns, and traditional performances.',
    attendees: 200,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
  {
    id: '8',
    title: 'Welcome Week Social',
    date: '2024-08-25',
    time: '5:00 PM - 7:00 PM',
    location: 'Memorial Union',
    category: 'social',
    featured: false,
    description: 'Welcomed new students and introduced them to VSA.',
    attendees: 150,
    image: '/images/eboard/eboardGroup.JPG',
    price: 'Free',
  },
]
