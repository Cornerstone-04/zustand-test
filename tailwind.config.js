/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#333333",
        "gray-dark": "#222222",
        "gray-light": "#CCCCCC",
        ongoing: "#98C1D9",
        done: "#EE6C4D",
      },
    },
  },
  plugins: [],
};
