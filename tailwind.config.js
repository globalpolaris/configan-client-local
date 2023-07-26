/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-pattern": "url('/src/assets/bg-pattern.png')",
      },
    },
  },
  plugins: [],
};
