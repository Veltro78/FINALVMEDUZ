/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pool: {
          50: '#e6fbff',
          100: '#c1f5ff',
          200: '#8fe9fb',
          300: '#5bd4ee',
          400: '#2fb8db',
          500: '#0e9bc4',
          600: '#0a7ea3',
          700: '#0c6584',
          800: '#0f516a',
          900: '#0e3f54'
        },
        turquoise: {
          400: '#2dd4c8',
          500: '#14b8a6',
          600: '#0d9488'
        },
        sun: {
          300: '#ffe27a',
          400: '#ffd23f',
          500: '#ffc107',
          600: '#f5a000'
        },
        coral: {
          300: '#ff9a8b',
          400: '#ff7e67',
          500: '#ff6250',
          600: '#e8482f'
        },
        tropical: {
          400: '#5cd88a',
          500: '#2fbf6f',
          600: '#1f9e57'
        },
        purple: {
          400: '#b98af0',
          500: '#9b5eea',
          600: '#7c3fd4'
        },
        orange: {
          400: '#ffab5c',
          500: '#ff9433',
          600: '#ff7a1a'
        }
      },
      fontFamily: {
        display: ['"Unbounded"', 'system-ui', 'sans-serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glossy: '0 8px 0 0 rgba(0,0,0,0.12), 0 12px 24px -6px rgba(0,0,0,0.35)',
        card: '0 10px 30px -10px rgba(6, 60, 75, 0.45)'
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")"
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(3deg)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' }
        },
        ripple: {
          '0%': { transform: 'scale(0.9)', opacity: 0.6 },
          '100%': { transform: 'scale(1.6)', opacity: 0 }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        ripple: 'ripple 2.5s ease-out infinite'
      }
    }
  },
  plugins: []
}
