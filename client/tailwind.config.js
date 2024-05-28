/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sierra: "#F8F0E5",
        mavrick: "#121481",
        baylor: "#EADBC8",
        knox: "#DAC0A3",
        zurix: "#0F2C59",
      },
    },
  },
  plugins: [],
};
