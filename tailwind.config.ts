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
        "accent-light-pink": "#E48586",
      },
      keyframes: {
        heroImages: {
          "0%, 100%": { backgroundImage: "url('/images/sleepy-dog.jpg')" },
          "25%": { backgroundImage: "url('/images/playing-dogs.jpg')" },
          "50%": { backgroundImage: "url('/images/training-dogs.jpg')" },
          "75%": { backgroundImage: "url('/images/swimming-dog.jpg')" },
        },
      },
      animation: {
        heroAnimation: "heroImages 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
