/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '475px',      // Custom extra small screen
        'sm': '640px',      // Tailwind's default small screen
        'md': '768px',      // Tailwind's default medium screen
        'lg': '1024px',     // Tailwind's default large screen
        'xl': '1280px',     // Tailwind's default extra large screen
        '2xl': '1536px',    // Tailwind's default 2x extra large screen
        '3xl': '1920px',    // Custom 3x extra large screen
      },
    },
  },

  plugins: [],
};

