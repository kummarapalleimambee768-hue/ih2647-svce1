/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bloom: {
          50: '#fff1f4',
          100: '#ffe4e8',
          200: '#fecdd6',
          300: '#fda4b6',
          400: '#fb718e',
          500: '#f43f6e',
          600: '#e11d57',
          700: '#be1245',
          800: '#9f123c',
          900: '#881337',
        },
        lavender: {
          50: '#fbfaff',
          100: '#f3f0fe',
          200: '#e8e5fc',
          300: '#d5ccfa',
          400: '#b7a2f5',
          500: '#9872ee',
          600: '#8450e4',
          700: '#713cd1',
          800: '#5e31af',
          900: '#4e2a8e',
        },
        sage: {
          50: '#f4f8f5',
          100: '#e5f0e8',
          200: '#cce2d2',
          300: '#a5ceb0',
          400: '#77b286',
          500: '#539764',
          600: '#3f7a4e',
          700: '#346140',
          800: '#2c4e35',
          900: '#25412d',
        },
        cream: {
          50: '#fffdfa',
          100: '#fdfaf2',
          200: '#f9f3e5',
          300: '#f2e8cf',
          400: '#e7d4ad',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(244, 63, 110, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 30px -5px rgba(152, 114, 238, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px rgba(244, 63, 110, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
