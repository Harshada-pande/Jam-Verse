/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ink: "#1A1533",
        cream: "#FDFBF7",
        lavender: "#F3F0FF",
        skyfog: "#EFF7FF",
        blush: "#FFF1F6",
        electric: "#4A3AFF",
        magenta: "#FF3D8A",
        coral: "#FF7A45",
        lime: "#8BE04D",
        cyan: "#22D3EE",
        sun: "#FFC93C",
        violet: "#7C4DFF",
      },
      fontFamily: {
        display: ["'Clash Display'", "'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.5rem",
        xl3: "2rem",
      },
      boxShadow: {
        chunky: "4px 4px 0px 0px rgba(26,21,51,1)",
        chunkyLg: "6px 6px 0px 0px rgba(26,21,51,1)",
        glow: "0 0 40px rgba(74,58,255,0.25)",
      },
    },
  },
  plugins: [],
}
