export const navigationItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
    subItems: [
      { name: 'Our Mission', href: '/about/mission' },
      { name: 'Executive Board', href: '/about/board' },
      { name: 'History', href: '/about/history' },
      { name: 'Constitution', href: '/about/constitution' },
    ],
  },
  {
    name: 'Events',
    href: '/events',
    subItems: [
      { name: 'Upcoming Events', href: '/events/upcoming' },
      { name: 'Past Events', href: '/events/past' },
      { name: 'Tết Celebration', href: '/events/tet' },
      { name: 'Cultural Shows', href: '/events/cultural-shows' },
    ],
  },
  {
    name: 'Get Involved',
    href: '/get-involved',
    subItems: [
      { name: 'Membership', href: '/get-involved/membership' },
      { name: 'Committees', href: '/get-involved/committees' },
      { name: 'Volunteer', href: '/get-involved/volunteer' },
      { name: 'Newsletter', href: '/get-involved/newsletter' },
    ],
  },
  {
    name: 'Resources',
    href: '/resources',
    subItems: [
      { name: 'Cultural Library', href: '/resources/cultural-library' },
      { name: 'Language Learning', href: '/resources/language' },
      { name: 'Recipes', href: '/resources/recipes' },
      { name: 'Study Resources', href: '/resources/study' },
    ],
  },
  {
    name: 'Gallery',
    href: '/gallery',
  },
  {
    name: 'VSA Royale',
    href: '/vsa-royale',
    special: true,
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]
