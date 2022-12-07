/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        "dark-1": "#202123",
        "dark-2": "#171819",
        "dark-neutral": "#2a2b2d"
      },
      fontFamily: {
        primary: ["TT Norms Pro", "ui-sans-serif", "system-ui"],
        headline: ["Gilroy", "ui-sans-serif", "system-ui"]
      },
      animation: {
        text: "text 5s ease infinite"
      },
      keyframes: {
        text: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      }
    }
  },
  plugins: []
}
