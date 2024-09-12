import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "465px",
      sxl: "1120px",
      xxl: "1480px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        customBlack: "#212121",
        customBlack2: "#282929",
        customGray: "#4E4E4E",
        customGray2: "#808080",
        customPurple: "#A600FC",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#212121", // Changed this to use the exact hex color
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "texture-gradient": "url(/images/hero.png)",
        "texture-gradient2":
          "linear-gradient(16deg, rgba(78,59,157,1) 35%, rgba(134,56,174,1) 59%)",
        "conic-gradient":
          "conic-gradient(from 90deg at 50% 0%, #A600FC, #212121,#212121, #212121)",
        "conic-gradient2":
          "conic-gradient(from 270deg at 50% 0%,#212121, #212121, #212121,  #A600FC)",
        "conic-gradient3":
          "conic-gradient(from 90deg at 20% 0%, #A600FC, #212121,#212121, #212121)",
        "conic-gradient4":
          "conic-gradient(from 270deg at 80% 0%,#212121, #212121, #212121,  #A600FC)",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
      transitionTimingFunction: {
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
        "in-out-expo": "cubic-bezier(0.42, 0, 0.58, 1.0)",
      },
    },
  },
  plugins: [
    function ({ addBase }: { addBase: Function }) {
      addBase({
        body: {
          color: "#ffffff",
          fontFamily: "Poppins, sans-serif",
          backgroundColor: "#212121", // Changed this to use the exact hex color
        },
      });
    },
  ],
};

export default config;
