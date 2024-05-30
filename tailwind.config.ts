import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-teal": "#219C90",
        "accent-light-green": "#64CCC5",
        "light-beige": "#F8F6E3",
        "main-gray": "#6A6A6A",
        "accent-red": "#F43F5E",
      },
      keyframes: {
        heroImages: {
          "0%, 100%": { backgroundImage: "url('/images/sleepy-dog.jpg')" },
          "25%": { backgroundImage: "url('/images/playing-dogs.jpg')" },
          "50%": { backgroundImage: "url('/images/training-dogs.jpg')" },
          "75%": { backgroundImage: "url('/images/swimming-dog.jpg')" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        heroAnimation: "heroImages 16s ease-in-out infinite",
        "fade-in-1": "fadeIn 1s ease-in-out 0s forwards",
        "fade-in-2": "fadeIn 1s ease-in-out 0.5s forwards",
        "fade-in-3": "fadeIn 1s ease-in-out 1s forwards",
        "fade-in-4": "fadeIn 1s ease-in-out 1.5s forwards",
      },
    },
  },
  plugins: [],
};

export default config;
