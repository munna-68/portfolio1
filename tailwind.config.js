/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f2ed',
        paper: '#efece4',
        ink: '#2e3326',
        'ink-soft': '#4a4f40',
        lavender: '#b3c6e0',
        mauve: '#d6c9e3',
        accent: '#8b7ea8',
        plum: '#3a2a3f',
        midnight: '#1a1424',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.28em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}
