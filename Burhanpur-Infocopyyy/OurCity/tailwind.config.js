// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Path jahan aap Tailwind classes use kar rahe ho
  ],
  theme: {
    extend: {
      colors: {
        primary: '#683759',   // Custom purple
        secondary: '#F59E0B', // Custom amber
      },
    },
  },
  plugins: [],
}
