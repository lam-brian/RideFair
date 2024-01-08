/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      blue: {
        100: "#E2EFF5",
        200: "#71C4F4",
        300: "#1976D2",
        400: "#0D3B69",
        700: "#061E35",
        900: "#151E24",
      },
      neutrals: {
        50: "#EAEAEA",
        100: "#BDBDBD",
        300: "#717171",
        500: "#2B2B2B",
        700: "#1F1F1F",
        900: "#121212",
      },
    },
    extend: {}, // Move this line outside of the 'colors' object
  },
  plugins: [],
};
