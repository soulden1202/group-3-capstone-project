/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        homepageBg: "url('././assets/city.jpg')",
      },
    },
  },
  plugins: [],
};
