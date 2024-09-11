/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        pulseScale: {
          "0%, 100%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.25)" },
        },
      },
      animation: {
        "pulse-scale": "pulseScale 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
