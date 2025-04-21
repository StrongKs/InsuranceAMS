/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        baseBlue: "#3AB5EA",
        mainBlue: "#009FE3",
        accentBlue: "#78CCF1",
        vividCyan: "#34E3E9",
        lightCyan: "#6BEFCF",
        vividRed: "#E34300",
        vividYellow: "#E3CC00",
        skyblue: "#C8D9E6",
        teal: "#567C8D",
        rhino: "#2A3C6A",
        shipCove: "#748FC4",
      },
    },
  },
  plugins: [],
};
