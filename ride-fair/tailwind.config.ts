import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        blue: {
          300: "#71C4F4",
          500: "#1976D2",
          700: "#0D3B69",
          900: "#061E35",
        },
        neutrals: {
          50: "#F4F7F7",
          100: "#E2E9EB",
          200: "#C9D5D8",
          300: "#A3B7BD",
          500: "#5A7680",
          700: "#363E43",
          800: "#252B2F",
          900: "#0f1214",
        },
      },
    },
  },
  plugins: [],
};
export default config;
