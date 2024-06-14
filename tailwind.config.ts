/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#11AED0",
        secondary: {
          1: "#C7F4C2",
          2: "#D7D0FF",
          3: "#FDDD8C",
          4: "#FFBBD7",
          5: "#cff2f9",
        },
        natural: {
          1: "#F4F4F4",
          2: "#F1F1F5",
          3: "#FAFAFB",
          4: "#F5F5F8",
          5: "#E2E2EA",
          6: "#92929D",
          7: "#696974",
          8: "#44444F",
        },
        darkBg: {
          1: "#13131A",
          2: "#1C1C24",
          3: "#21212B",
        },
        black: "#171725",
        dark: "#404D61",
        white: "#FFFFFF",
      },
      fontFamily: {
        manrop: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        jd: "0px 15px 34px 0px rgba(0, 0, 0, 0.02)",
        hp: "0px 14px 20px 0px rgba(0, 0, 0, 0.02)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
