// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // adjust these to the exact hexes from their brand guidelines
        'chaptal-green':  '#4F9E2F',
        'chaptal-purple': '#AE6CCB',
        'chaptal-green-dark': '#3E7E24',
      }
    },
  },
  plugins: [],
}
