import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'slide-up-bounce': 'slide-up-bounce 0.8s ease-out forwards',
        'slide-up-bounce-delayed': 'slide-up-bounce 0.8s ease-out 0.2s forwards',
        'slide-up-shake': 'slide-up-shake 2.5s ease-out forwards',
        'slide-left': 'slide-left 0.8s ease-out forwards',
        'slide-right': 'slide-right 0.8s ease-out forwards',
        'slide-down': 'slide-down 0.8s ease-out forwards',
        'slide-down-delayed': 'slide-down 0.8s ease-out 0.2s forwards',
      },
      keyframes: {
        'slide-up-bounce': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80px)',
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
          '60%': {
            opacity: '0.8',
            transform: 'translateX(8px)',
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
          '60%': {
            opacity: '0.8',
            transform: 'translateX(-8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-80px)',
          },
          '60%': {
            opacity: '0.8',
            transform: 'translateY(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-up-shake': {
          '0%': {
            opacity: '0',
            transform: 'translateY(80px)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'translateY(-8px)',
          },
          '60%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '70%': {
            transform: 'translateY(-8px)',
          },
          '80%': {
            transform: 'translateY(8px)',
          },
          '90%': {
            transform: 'translateY(-4px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config


