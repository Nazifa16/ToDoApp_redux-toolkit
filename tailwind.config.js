/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {
      colors: {
        transparentBlack: "rgba(0,0,0,0.85)",
        plumb: "rgba(212, 186, 242)",
      },
    },
    screens: {
      xs: "480px",
      sm: "768",
      md: "1060px",
    },
  },
  plugins: [],
};
