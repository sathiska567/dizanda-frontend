/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          charcoal: "#121212",  // Deep, rich black
          onyx: "#1A1A1A",      // Soft dark layers
          champagne: "#D4AF37", // Elegant gold accent
          goldHover: "#AA8413", // Deep gold accent
          cream: "#FDFBF7",     // Soft, premium white background
          sand: "#F4EFE6",      // Warm structural tint
          muted: "#7A7A7A"      // Minimalist text grey
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.2em",
        extreme: "0.3em",
      }
    },
  },
  plugins: [],
}