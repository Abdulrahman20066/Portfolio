/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary:   '#050A0F',
          secondary: '#0A1520',
          card:      '#0D1B2A',
          border:    '#1A2F45',
        },
        accent: {
          cyan:  '#00D4FF',
          pink:  '#FF3366',
          green: '#00FF94',
        },
        text: {
          primary:   '#E8F4FF',
          secondary: '#7A9BB5',
          muted:     '#3D5A73',
        },
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
        mono:    ['var(--font-dm-mono)', 'monospace'],
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'pulse-slow':   'pulse 4s ease-in-out infinite',
        'scan':         'scan 8s linear infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'slide-up':     'slideUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.8s ease-out forwards',
        'border-spin':  'borderSpin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #00D4FF33, 0 0 20px #00D4FF11' },
          to:   { boxShadow: '0 0 20px #00D4FF66, 0 0 40px #00D4FF33' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        borderSpin: {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
      },
      backgroundImage: {
        'grid-pattern':  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231A2F45' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
