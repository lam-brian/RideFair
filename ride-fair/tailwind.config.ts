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
          100: "#E2EFF5",
          200: "#71C4F4",
          300: "#1976D2",
          400: "#0D3B69",
          700: "#061E35",
          800: "#151E24",
          900: "#12181C",
        },
        neutrals: {
          50: "#EAEAEA",
          100: "#E2E9EB",
          300: "#717171",
          500: "#5A7680",
          700: "#43535B",
          800: "#252B2F",
          900: "#121212",
        },
      },
    },
  },
  plugins: [],
};
export default config;
