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

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

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

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
isu-vsa-website/
├── app/                    # Next.js app directory
│   ├── about/             # About pages
│   ├── events/            # Events pages
│   ├── gallery/           # Photo/video gallery
│   ├── vsa-royale/        # Game pages
│   └── contact/           # Contact page
├── components/            # Reusable components
│   ├── navigation/        # Navigation components
│   └── vsa-royale/        # Game components
├── lib/                   # Utility functions
│   └── vsa-royale/        # Game logic
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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

ISU VSA - [isuvsa@iastate.edu](mailto:isuvsa@iastate.edu)

Website: [https://isuvsa.org](https://isuvsa.org)

## 🙏 Acknowledgments

- Iowa State University
- Vietnamese Student Association National
- All VSA members and supporters
- Next.js and Vercel for the amazing framework
- Phaser.js for the game engine