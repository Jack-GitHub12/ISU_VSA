'use client'

import { motion } from 'framer-motion'

export default function StyleTestPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">ISU VSA Style Test</h1>

      {/* Color Palette */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="h-24 bg-cardinal rounded-lg mb-2"></div>
            <p className="text-sm">Cardinal Red</p>
            <p className="text-xs text-gray-600">#CE1126</p>
          </div>
          <div>
            <div className="h-24 bg-gold rounded-lg mb-2"></div>
            <p className="text-sm">Gold</p>
            <p className="text-xs text-gray-600">#F1BE48</p>
          </div>
          <div>
            <div className="h-24 bg-deepRed rounded-lg mb-2"></div>
            <p className="text-sm">Deep Red</p>
            <p className="text-xs text-gray-600">#9B1C31</p>
          </div>
          <div>
            <div className="h-24 bg-cream rounded-lg mb-2 border"></div>
            <p className="text-sm">Cream</p>
            <p className="text-xs text-gray-600">#FFF8E7</p>
          </div>
          <div>
            <div className="h-24 bg-charcoal rounded-lg mb-2"></div>
            <p className="text-sm">Charcoal</p>
            <p className="text-xs text-gray-600">#2C2A29</p>
          </div>
          <div>
            <div className="h-24 bg-white rounded-lg mb-2 border"></div>
            <p className="text-sm">White</p>
            <p className="text-xs text-gray-600">#FFFFFF</p>
          </div>
          <div>
            <div className="h-24 bg-gradient-cardinal-gold rounded-lg mb-2"></div>
            <p className="text-sm">Cardinal to Gold</p>
          </div>
          <div>
            <div className="h-24 bg-gradient-gold-cardinal rounded-lg mb-2"></div>
            <p className="text-sm">Gold to Cardinal</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          <h1 className="text-5xl font-montserrat font-bold">Heading 1 - Montserrat</h1>
          <h2 className="text-4xl font-montserrat font-bold">Heading 2 - Montserrat</h2>
          <h3 className="text-3xl font-montserrat font-bold">Heading 3 - Montserrat</h3>
          <p className="text-lg font-openSans">
            Body text using Open Sans font. This is how regular paragraph text will appear
            throughout the website.
          </p>
          <p className="text-lg font-playfair italic">
            Accent text using Playfair Display for elegant touches.
          </p>
          <p className="gradient-text text-3xl font-bold">Gradient Text Effect</p>
        </div>
      </section>

      {/* Buttons */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-outline">Outline Button</button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-all">
            Default Button
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">Standard Card</h3>
            <p className="text-gray-600">
              This is a standard card component with shadow and hover effects.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <h3 className="text-xl font-bold mb-2">Animated Card</h3>
            <p className="text-gray-600">This card has animation on mount using Framer Motion.</p>
          </motion.div>
          <div className="bg-gradient-cardinal-gold text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Gradient Card</h3>
            <p>A card with gradient background for special content.</p>
          </div>
        </div>
      </section>

      {/* Animations */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Animations</h2>
        <div className="flex flex-wrap gap-8">
          <div className="animate-fade-in bg-cardinal text-white p-4 rounded">Fade In</div>
          <div className="animate-slide-up bg-gold text-charcoal p-4 rounded">Slide Up</div>
          <div className="animate-scale-in bg-deepRed text-white p-4 rounded">Scale In</div>
          <div className="animate-float bg-cream text-charcoal p-4 rounded border">Float</div>
          <div className="animate-glow bg-cardinal text-white p-4 rounded">Glow</div>
        </div>
      </section>

      {/* Grid Layouts */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Responsive Grid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-gray-100 p-4 rounded-lg text-center">
              <div className={`h-20 ${i % 2 === 0 ? 'bg-cardinal' : 'bg-gold'} rounded mb-2`}></div>
              <p className="font-semibold">Item {i}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Forms */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Input Field</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Field</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Textarea</label>
            <textarea
              rows={3}
              placeholder="Enter message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cardinal focus:border-cardinal transition-colors resize-none"
            />
          </div>
        </div>
      </section>

      {/* Status Messages */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Status Messages</h2>
        <div className="space-y-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Success message with green styling
          </div>
          <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
            Info message with blue styling
          </div>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            Warning message with yellow styling
          </div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error message with red styling
          </div>
        </div>
      </section>
    </div>
  )
}
