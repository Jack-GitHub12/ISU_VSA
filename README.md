# ISU VSA Website

The official website for Iowa State University Vietnamese Student Association, featuring event management, member resources, and the exclusive VSA Royale game.

## 🚀 Features

- **Modern Design**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **ISU Branding**: Cardinal red and gold theme throughout
- **Responsive**: Works perfectly on all devices
- **VSA Royale Game**: Exclusive tower defense game featuring VSA members
- **Event Management**: Browse and RSVP to upcoming events
- **Photo Gallery**: Relive memories from past events
- **Member Resources**: Access cultural library, recipes, and study materials
- **Admin Dashboard**: Comprehensive admin panel for managing events and content
- **Performance Optimized**: Static generation, lazy loading, and image optimization
- **SEO Ready**: Meta tags and structured data for better search visibility

## 🛰️ Technology Stack

### Frontend

- **Framework**: Next.js 15.5.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Custom components with Framer Motion animations
- **Icons**: Lucide React & React Icons
- **Game Engine**: Phaser.js 3.90.0

### State Management & Forms

- **State**: Zustand 5.0.8
- **Forms**: React Hook Form 7.62.0
- **Validation**: Zod 4.1.8

### Development Tools

- **Linting**: ESLint 9
- **Formatting**: Prettier
- **Testing**: Jest with React Testing Library
- **Package Manager**: npm
- **Build Tool**: Next.js built-in bundler with Turbopack support

## 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager
- Git

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/isuvsa/website.git
cd isu-vsa-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your environment variables (see Environment Variables section)

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# Instagram Integration (Optional)
NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN=your_token_here
NEXT_PUBLIC_INSTAGRAM_ACCOUNT_ID=your_account_id_here

# Add other API keys as needed
```

## 🏗️ Building for Production

```bash
npm run build
npm start
```

For production deployment, see the [Deployment Guide](./DEPLOYMENT.md).

## 📁 Project Structure

```
isu-vsa-website/
├── app/                    # Next.js app directory
│   ├── about/             # About pages
│   ├── admin/             # Admin dashboard
│   │   ├── events/        # Event management
│   │   └── content/       # Content management
│   ├── events/            # Events pages
│   ├── gallery/           # Photo/video gallery
│   ├── vsa-royale/        # Game pages
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── navigation/        # Navigation components
│   └── vsa-royale/        # Game components
├── lib/                   # Utility functions
│   └── vsa-royale/        # Game logic
├── data/                  # Data files and mock data
├── types/                 # TypeScript types
└── public/                # Static assets
```

## 🎮 VSA Royale Game

The website features an exclusive tower defense game called VSA Royale:

- **Play as VSA Members**: Executive board and committee chairs as playable characters
- **Multiple Game Modes**: Battle, Campaign, and Puzzle modes
- **Resource Management**: Use "Eggrolls" instead of elixir
- **Local Storage**: Progress saved in browser
- **Leaderboards**: Compete with other members

### Game Controls

- Click cards to select them
- Click on the battlefield to deploy units
- Manage your eggroll resources wisely
- Defend your towers while attacking the enemy

## 🎨 Customization

### Colors

The color scheme is defined in `tailwind.config.ts`:

- Cardinal Red: `#CE1126`
- Gold: `#F1BE48`
- Deep Red: `#9B1C31`
- Cream: `#FFF8E7`
- Charcoal: `#2C2A29`

### Fonts

- Headers: Montserrat
- Body: Open Sans
- Accent: Playfair Display

## 🚢 Deployment

### Vercel Deployment (Recommended)

The website is optimized for deployment on Vercel with zero configuration.

1. **Quick Deploy**

   - Push to GitHub
   - Import to Vercel
   - Deploy

2. **Custom Domain**
   - Add domain in Vercel dashboard
   - Update DNS records

See the full [Deployment Guide](./DEPLOYMENT.md) and [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) for detailed instructions.

## 💻 Development

### Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production (includes sitemap generation)
npm run start          # Start production server
npm run lint           # Run ESLint
npm run typecheck      # Type check with TypeScript
npm run format         # Auto-format code with Prettier
npm run format:check   # Check code formatting
npm run test           # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run generate-sitemap # Generate sitemap.xml
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Tailwind CSS for styling
- Follow existing patterns in the codebase

### Testing Production Build Locally

```bash
npm run build
npm run start
```

## 📝 Content Management

### Admin Dashboard

Access the admin dashboard at `/admin` to manage:
- Events (create, edit, delete)
- Content updates
- Board member information

### Updating Board Members

Edit `/app/about/board/page.tsx` and update the `executiveBoard` and `committeeChairs` arrays.

### Adding Events

1. Via Admin Dashboard: Navigate to `/admin/events`
2. Via Code: Edit `/data/events.ts` and add new events to the events array

### Modifying Navigation

Edit `/data/navigation.ts` to update navigation links.

### Managing Images

- Board photos: `/public/images/board/` (400x400px, firstname-lastname.jpg)
- Event images: `/public/images/events/`
- Gallery photos: `/public/images/gallery/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Test your changes locally (`npm run build && npm run start`)
4. Run linting (`npm run lint`)
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

### Contribution Guidelines

- Write clean, readable code
- Follow TypeScript best practices
- Run `npm run typecheck` and `npm run lint` before committing
- Format code with `npm run format`
- Test thoroughly before submitting PR (`npm run test`)
- Update documentation as needed
- Keep commits atomic and meaningful

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**

   - Run `npx tsc --noEmit` to check TypeScript errors
   - Check for missing dependencies in package.json
   - Clear `.next` folder and rebuild

2. **Development Server Issues**

   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` fresh
   - Check Node.js version (18+ required)
   - Clear `.next` cache folder

3. **Type Checking Issues**

   - Run `npm run typecheck` to check for TypeScript errors
   - Check `tsconfig.json` for proper configuration
   - Delete `tsconfig.tsbuildinfo` and rebuild

4. **Game Not Loading**
   - Ensure Phaser.js is properly imported
   - Check browser console for errors
   - Verify game assets are in `/public` folder

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

ISU VSA - [isuvsa@iastate.edu](mailto:isuvsa@iastate.edu)

Website: [https://isuvsa.org](https://isuvsa.org)

Instagram: [@isuvsa](https://instagram.com/isuvsa)

## 🙏 Acknowledgments

- Iowa State University
- Vietnamese Student Association National
- All VSA members and supporters
- Next.js and Vercel for the amazing framework
- Phaser.js for the game engine
- All contributors and maintainers
