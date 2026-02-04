/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors (default)
        'gothic-dark': '#0a0a0a',
        'gothic-darker': '#050505',
        'gothic-crimson': '#8b0000',
        'gothic-blood': '#dc143c',
        'gothic-violet': '#8b00ff',
        'gothic-purple': '#9d00ff',
        'gothic-glow': '#ff00ff',
        
        // Light mode colors
        'gothic-light': '#2a1a1a',
        'gothic-cream': '#f5e6d3',
        'gothic-gold': '#d4af37',
        'gothic-amber': '#ffbf00',
        'gothic-warm-red': '#8b2e2e',
        'gothic-warm-grey': '#4a3c3c',
      },
      fontFamily: {
        gothic: ['Cinzel', 'serif'],
        'gothic-text': ['Crimson Text', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor',
          },
          '50%': { 
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor, 0 0 50px currentColor',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 20px currentColor',
          },
          '50%': { 
            opacity: '.8',
            boxShadow: '0 0 40px currentColor, 0 0 60px currentColor',
          },
        },
      },
    },
  },
  plugins: [],
}
