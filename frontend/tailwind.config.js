module.exports = {
  darkMode: 'class',  // <-- Enable dark mode toggling via 'dark' class
  // other existing config options
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // your file paths for Tailwind scanning
  ],
  theme: {
    extend: {
      // your theme customizations
    },
  },
  plugins: [
    // your plugins if any
  ],
}
