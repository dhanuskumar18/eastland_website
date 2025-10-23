import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'slide-up-bounce': 'slide-up-bounce 1.2s ease-out forwards',
        'slide-up-bounce-delayed': 'slide-up-bounce 1.2s ease-out 0.3s forwards',
        'slide-left': 'slide-left 1.2s ease-out forwards',
        'slide-right': 'slide-right 1.2s ease-out forwards',
      },
      keyframes: {
        'slide-up-bounce': {
          '0%': {
            opacity: '0',
            transform: 'translateY(120px)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'translateY(-8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config


