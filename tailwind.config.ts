import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ISU Colors
        cardinal: {
          DEFAULT: '#CE1126',
          light: '#E41838',
          dark: '#A50E1F',
        },
        gold: {
          DEFAULT: '#F1BE48',
          light: '#F4CA66',
          dark: '#D9A73D',
        },
        // Secondary Colors
        deepRed: '#9B1C31',
        cream: '#FFF8E7',
        charcoal: '#2C2A29',
        // VSA Theme Colors
        vsa: {
          red: '#CE1126',
          gold: '#F1BE48',
          dark: '#2C2A29',
          light: '#FFF8E7',
        },
        // Fun Playful Colors
        coral: '#FF7F50',
        mint: '#68D391',
        sky: '#87CEEB',
        lavender: '#C8A2C8',
        peach: '#FFDAB9',
        bubblegum: '#FFC1CC',
        sunshine: '#FFD700',
        aqua: '#00CED1',
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        baloo: ['Baloo 2', 'sans-serif'],
        comfortaa: ['Comfortaa', 'sans-serif'],
        bubblegum: ['Bubblegum Sans', 'cursive'],
        fredoka: ['Fredoka', 'sans-serif'],
        concert: ['Concert One', 'cursive'],
        kalam: ['Kalam', 'cursive'],
        patrick: ['Patrick Hand', 'cursive'],
        pangolin: ['Pangolin', 'cursive'],
        gaegu: ['Gaegu', 'cursive'],
        himelody: ['Hi Melody', 'cursive'],
        gamja: ['Gamja Flower', 'cursive'],
        single: ['Single Day', 'cursive'],
        jua: ['Jua', 'cursive'],
        nanum: ['Nanum Pen Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(206, 17, 38, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(206, 17, 38, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cardinal-gold': 'linear-gradient(135deg, #CE1126 0%, #F1BE48 100%)',
        'gradient-gold-cardinal': 'linear-gradient(135deg, #F1BE48 0%, #CE1126 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
