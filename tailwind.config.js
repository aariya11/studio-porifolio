/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        editorial: {
          black: '#070708',
          dark: '#0e0e11',
          card: '#141418',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.2)',
          text: '#f5f5f3',
          muted: '#8e8e98',
          subtle: '#4c4c56'
        },
        accent: {
          lime: '#C3E41D',
          limeGlow: '#d8fa32',
          orange: '#FF5722'
        }
      },
      fontFamily: {
        sans: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Cabinet Grotesk', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
