/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'haunted-black': '#0a0a0a',
        'haunted-red': '#8b0000',
        'haunted-blue': '#1a1a2e',
        'haunted-accent': '#ff6b6b',
        'haunted-text': '#e0e0e0',
      },
      fontFamily: {
        mono: ['Courier New', 'Consolas', 'monospace'],
        system: ['Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
