
import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)'],
        body: ['var(--font-poppins)'],
        headline: ['var(--font-orbitron)'],
        orbitron: ['var(--font-orbitron)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: 'hsl(var(--tertiary))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          primary: 'hsl(var(--primary))',
          'primary-foreground': 'hsl(var(--primary-foreground))',
          accent: 'hsl(var(--primary) / 0.1)',
          'accent-foreground': 'hsl(var(--primary))',
          border: 'hsl(var(--border))',
          ring: 'hsl(var(--ring))',
        },
        // Aura Palette
        'celestial-gold': '#FFD700',
        'bio-lime': '#39FF14',
        'plasma-cyan': '#00EFFF',
        'radiant-purple': '#9D4EDD',
        'magma-orange': '#FF6347',
        'hyper-pink': '#FF2E92',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 15px hsl(var(--primary)/0.4), 0 0 30px hsl(var(--secondary)/0.3)' },
          '50%': { boxShadow: '0 0 35px hsl(var(--primary)/0.8), 0 0 50px hsl(var(--secondary)/0.6)' },
        },
        'heartbeat-glow': {
          '0%, 100%': { strokeWidth: '3.5', filter: 'drop-shadow(0 0 6px hsl(var(--secondary)))' },
          '50%': { strokeWidth: '5', filter: 'drop-shadow(0 0 15px hsl(var(--secondary)))' },
        },
        'logo-rotate': {
            '0%': { transform: 'rotateY(0deg) rotateZ(0deg) scale(1)' },
            '50%': { transform: 'rotateY(10deg) rotateZ(-5deg) scale(1.1)' },
            '100%': { transform: 'rotateY(0deg) rotateZ(0deg) scale(1)' },
        },
        'ping-slow': {
          '75%, 100%': {
            transform: 'scale(2.5)',
            opacity: '0',
          }
        },
        'radar-sweep': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'appear': {
          to: { opacity: '1' },
        },
        'pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
         ripple: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.6',
          },
          '100%': {
            transform: 'scale(2.5)',
            opacity: '0',
          },
        },
         'aura-breathing': {
          '0%, 100%': { boxShadow: '0 0 15px hsl(var(--primary)), 0 0 25px hsl(var(--secondary)/0.5)' },
          '50%': { boxShadow: '0 0 30px hsl(var(--primary)/0.7), 0 0 50px hsl(var(--secondary)/0.7)' },
        },
        'timeline-flow': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '0 200px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'heartbeat-glow': 'heartbeat-glow 1.5s ease-in-out infinite',
        'logo-rotate': 'logo-rotate 5s ease-in-out infinite',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar-sweep': 'radar-sweep 2s linear forwards',
        'appear': 'appear 0.5s forwards',
        'pulse': 'pulse 1.5s infinite',
        'ripple': 'ripple 1s linear infinite',
        'aura-breathing': 'aura-breathing 4s ease-in-out infinite',
        'timeline-flow': 'timeline-flow 10s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
