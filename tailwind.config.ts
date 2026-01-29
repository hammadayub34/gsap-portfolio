import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Sophisticated neutrals with gold
        primary: '#0d0d0d',        // Obsidian (alias for compatibility)
        secondary: '#1a1a1a',      // Charcoal (alias for compatibility)
        obsidian: '#0d0d0d',
        charcoal: '#1a1a1a',
        slate: '#2a2a2a',
        graphite: '#3d3d3d',
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8c968',
          dark: '#b8941f',
        },
        accent: '#d4af37',         // Alias for gold (component compatibility)
        'accent-light': '#e8c968', // Alias for gold-light
        'accent-dark': '#b8941f',  // Alias for gold-dark
        cream: '#f5f1e8',
        pearl: '#e8e4d8',
        text: {
          primary: '#f5f1e8',
          secondary: '#b8b4a8',
          muted: '#8a8780',
        },
        textPrimary: '#f5f1e8',    // Alias (component compatibility)
        textSecondary: '#b8b4a8',  // Alias (component compatibility)
        textMuted: '#8a8780',      // Alias (component compatibility)
      },
      fontFamily: {
        display: ['Crimson Pro', 'serif'],
        body: ['Archivo', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        sans: ['Archivo', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
      fontSize: {
        'display-xl': 'clamp(3rem, 8vw, 7rem)',
        'display-lg': 'clamp(2.5rem, 6vw, 5rem)',
        'display-md': 'clamp(1.75rem, 4vw, 3rem)',
        'display-sm': 'clamp(1.5rem, 3vw, 2rem)',
      },
      spacing: {
        xs: '0.5rem',
        sm: '1rem',
        md: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '8rem',
      },
      maxWidth: {
        container: '1400px',
        content: '900px',
      },
      animation: {
        // Existing animations
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in-down': 'fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'slide-left': 'slideInLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-right': 'slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'rotate': 'rotate 20s linear infinite',
        
        // Enhanced animations for components
        'gradient-x': 'gradient-x 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'glitch': 'glitch 0.3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'grain': 'grain 12s steps(8) infinite',
        'typing': 'typing 3s steps(40, end), blink 0.75s step-end infinite',
      },
      keyframes: {
        // Existing keyframes
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        
        // Enhanced keyframes for components
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-3%, -8%)' },
          '20%': { transform: 'translate(-12%, 4%)' },
          '30%': { transform: 'translate(5%, -18%)' },
          '40%': { transform: 'translate(-4%, 18%)' },
          '50%': { transform: 'translate(-10%, 8%)' },
          '60%': { transform: 'translate(12%, -2%)' },
          '70%': { transform: 'translate(2%, 12%)' },
          '80%': { transform: 'translate(4%, 25%)' },
          '90%': { transform: 'translate(-8%, 8%)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #e8c968 100%)',
        'metallic-gold': 'linear-gradient(180deg, #e8c968 0%, #d4af37 50%, #b8941f 100%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 10px 30px rgba(212, 175, 55, 0.4)',
        'gold-xl': '0 20px 50px rgba(212, 175, 55, 0.3)',
        'dark': '0 20px 50px rgba(0, 0, 0, 0.5)',
      },
      dropShadow: {
        'gold': '0 0 10px rgba(212, 175, 55, 0.5)',
        'gold-lg': '0 0 20px rgba(212, 175, 55, 0.6)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '400ms',
        'slow': '600ms',
      },
      letterSpacing: {
        tightest: '-0.03em',
        display: '-0.02em',
      },
      lineHeight: {
        tight: '1.2',
        relaxed: '1.7',
        loose: '1.8',
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        // Text shadow utilities
        '.text-shadow-gold': {
          textShadow: '0 0 20px rgba(212, 175, 55, 0.5), 0 0 40px rgba(212, 175, 55, 0.3)',
        },
        '.text-shadow-gold-sm': {
          textShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
        },
        '.text-shadow-gold-lg': {
          textShadow: '0 0 30px rgba(212, 175, 55, 0.6), 0 0 60px rgba(212, 175, 55, 0.4)',
        },
        
        // Animation delay utilities
        '.animation-delay-100': {
          animationDelay: '0.1s',
        },
        '.animation-delay-200': {
          animationDelay: '0.2s',
        },
        '.animation-delay-300': {
          animationDelay: '0.3s',
        },
        '.animation-delay-400': {
          animationDelay: '0.4s',
        },
        '.animation-delay-500': {
          animationDelay: '0.5s',
        },
        '.animation-delay-600': {
          animationDelay: '0.6s',
        },
        
        // Background pattern utilities
        '.bg-dot-pattern': {
          backgroundImage: 'radial-gradient(circle, #d4af37 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: '0.05',
        },
        '.bg-grid-pattern': {
          backgroundImage: 'linear-gradient(#3d3d3d 1px, transparent 1px), linear-gradient(90deg, #3d3d3d 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: '0.1',
        },
        '.bg-circuit-pattern': {
          backgroundImage: `
            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px),
            linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 100px 100px, 100px 100px, 100px 100px',
          backgroundPosition: '0 0, 0 0, 0 0, 50px 50px',
        },
        
        // Text gradient utilities
        '.text-gold-gradient': {
          background: 'linear-gradient(135deg, #d4af37 0%, #e8c968 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.text-metallic': {
          background: 'linear-gradient(180deg, #e8c968 0%, #d4af37 50%, #b8941f 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        
        // Hover effects
        '.hover-lift': {
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 30px rgba(212, 175, 55, 0.2)',
          },
        },
        
        // Animated underline
        '.animated-underline': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0',
            height: '2px',
            bottom: '-4px',
            left: '0',
            backgroundColor: '#d4af37',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config