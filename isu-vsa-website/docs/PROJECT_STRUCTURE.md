# ISU VSA Website - Project Structure

## 📁 Directory Structure

```
isu-vsa-website/
│
├── 📂 app/                          # Next.js App Router pages
│   ├── layout.tsx                   # Root layout with navigation
│   ├── page.tsx                     # Homepage
│   ├── globals.css                  # Global styles
│   │
│   ├── 📂 about/                    # About section
│   │   ├── page.tsx                 # About main page
│   │   ├── 📂 board/                # Executive board
│   │   ├── 📂 mission/              # Mission page
│   │   ├── 📂 history/              # History page
│   │   └── 📂 constitution/         # Constitution page
│   │
│   ├── 📂 events/                   # Events section
│   │   ├── page.tsx                 # Events listing
│   │   ├── 📂 upcoming/             # Upcoming events
│   │   ├── 📂 past/                 # Past events
│   │   ├── 📂 tet/                  # Tết celebration
│   │   └── 📂 cultural-shows/       # Cultural shows
│   │
│   ├── 📂 get-involved/             # Get involved section
│   │   ├── 📂 membership/           # Membership portal
│   │   ├── 📂 committees/           # Committee info
│   │   ├── 📂 volunteer/            # Volunteer opportunities
│   │   └── 📂 newsletter/           # Newsletter signup
│   │
│   ├── 📂 resources/                # Resources section
│   │   ├── page.tsx                 # Resources hub
│   │   ├── 📂 cultural-library/     # Cultural content
│   │   ├── 📂 language/             # Language learning
│   │   ├── 📂 recipes/              # Vietnamese recipes
│   │   └── 📂 study/                # Study resources
│   │
│   ├── 📂 gallery/                  # Photo/video gallery
│   │   └── page.tsx
│   │
│   ├── 📂 vsa-royale/               # VSA Royale game
│   │   ├── page.tsx                 # Game landing page
│   │   ├── 📂 play/                 # Game play page
│   │   ├── 📂 leaderboard/          # Leaderboards
│   │   ├── 📂 deck-builder/         # Deck builder
│   │   └── 📂 tutorial/             # Game tutorial
│   │
│   ├── 📂 contact/                  # Contact page
│   │   └── page.tsx
│   │
│   └── 📂 style-test/               # Style testing page
│       └── page.tsx
│
├── 📂 components/                   # Reusable components
│   │
│   ├── 📂 animations/               # Animation components
│   │   ├── AnimatedSection.tsx     # Scroll-triggered animations
│   │   ├── ParallaxSection.tsx     # Parallax scrolling
│   │   ├── AnimatedCounter.tsx     # Animated number counter
│   │   └── LoadingSpinner.tsx      # Loading animations
│   │
│   ├── 📂 ui/                       # UI components
│   │   ├── AnimatedButton.tsx      # Animated button
│   │   └── AnimatedCard.tsx        # Animated card
│   │
│   ├── 📂 layout/                   # Layout components
│   │   └── AnimatedPageWrapper.tsx # Page transition wrapper
│   │
│   ├── 📂 navigation/               # Navigation components
│   │   └── Navbar.tsx               # Main navigation bar
│   │
│   ├── 📂 vsa-royale/               # Game components
│   │   └── GameCanvas.tsx          # Phaser game canvas
│   │
│   ├── InstagramFeed.tsx           # Instagram feed integration
│   └── Footer.tsx                   # Site footer
│
├── 📂 lib/                          # Utility functions
│   ├── utils.ts                     # Common utilities
│   ├── instagram-api.ts            # Instagram API integration
│   │
│   └── 📂 vsa-royale/              # Game logic
│       ├── cards.ts                # Card definitions
│       └── storage.ts              # Local storage management
│
├── 📂 data/                         # Data files
│   ├── navigation.ts               # Navigation structure
│   └── events.ts                   # Events data
│
├── 📂 types/                        # TypeScript types
│   └── vsa-royale.ts              # Game type definitions
│
├── 📂 public/                       # Static assets
│   ├── placeholder.svg            # Placeholder image
│   └── 📂 images/                  # Image assets
│       ├── 📂 cards/               # Card images
│       ├── 📂 game/                # Game assets
│       └── 📂 gallery/             # Gallery images
│
├── 📂 styles/                       # Additional styles (if needed)
│
└── 📄 Configuration Files
    ├── next.config.ts              # Next.js configuration
    ├── tailwind.config.ts          # Tailwind CSS configuration
    ├── postcss.config.mjs          # PostCSS configuration
    ├── tsconfig.json               # TypeScript configuration
    ├── package.json                # Dependencies
    ├── .env.example                # Environment variables template
    └── README.md                   # Project documentation
```

## 🎨 Component Organization

### Animation Components (`/components/animations/`)

- **AnimatedSection**: Wrapper for scroll-triggered animations
- **ParallaxSection**: Creates parallax scrolling effects
- **AnimatedCounter**: Animated number counting
- **LoadingSpinner**: Loading state animations

### UI Components (`/components/ui/`)

- **AnimatedButton**: Button with hover and click animations
- **AnimatedCard**: Card with entrance and hover animations

### Layout Components (`/components/layout/`)

- **AnimatedPageWrapper**: Handles page transitions

## 📊 Data Management

### Data Files (`/data/`)

- **navigation.ts**: Centralized navigation structure
- **events.ts**: Event data and types

### API Integration (`/lib/`)

- **instagram-api.ts**: Instagram feed integration
- **vsa-royale/storage.ts**: Game progress persistence

## 🎮 VSA Royale Game

### Game Structure

```
vsa-royale/
├── Components (GameCanvas.tsx)
├── Logic (cards.ts, storage.ts)
├── Types (vsa-royale.ts)
└── Pages (play, leaderboard, deck-builder)
```

## 🔧 Key Features

1. **Responsive Design**: Mobile-first approach
2. **Animations**: Framer Motion throughout
3. **Type Safety**: Full TypeScript implementation
4. **Performance**: Optimized images and lazy loading
5. **SEO**: Meta tags and structured data
6. **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Development Workflow

1. **Components**: Create in appropriate folder
2. **Styles**: Use Tailwind classes, custom CSS in globals.css
3. **Data**: Store in `/data` directory
4. **Types**: Define in `/types` directory
5. **Assets**: Place in `/public` directory

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `AnimatedButton.tsx`)
- **Utilities**: camelCase (e.g., `fetchInstagramPosts.ts`)
- **Data files**: kebab-case (e.g., `navigation.ts`)
- **CSS classes**: kebab-case (e.g., `btn-primary`)

## 🔄 State Management

- **Local State**: React useState for component state
- **Global State**: Zustand for app-wide state
- **Game State**: Local Storage for persistence

## 🌐 API Routes (if needed)

```
app/api/
├── contact/          # Contact form submission
├── newsletter/       # Newsletter signup
└── instagram/        # Instagram feed proxy
```

This structure ensures maintainability, scalability, and clear separation of concerns.
