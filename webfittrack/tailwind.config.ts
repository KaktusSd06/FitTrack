import { nextui } from "@nextui-org/react";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        jet: "#201f1c",
        gray: "#40403b",
        fulvous: "#e48100",
        white: "#ffffff",
        isabelline: "#f4f0e9",
        silver: "#c6c1b9",
        "background-dark": "#2d2d2a",
        "background-light": "#ffffff",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

export default config;
