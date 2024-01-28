import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // or 'media' if you want to use media queries
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // tus extensiones personalizadas aquí
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // agregar colores para el modo oscuro
      colors: {
        // define tus colores para el modo oscuro aquí
      },
    },
  },
  plugins: [],
};

export default config;
