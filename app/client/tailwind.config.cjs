/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        PineTree: "#1B1B02",
        DarkSpringGreen: "#007F43",
        GreenPantum: "#54A543",
        YellowGreen: "#8BCC3A",
        GreenYellow: "#9FCA56",
        Crayola: "#B2E186",
        SmokyBlack: "#121212",
        Magnolia: "#ECE8EF",
        TuscanRed: "#814A4A",
        Red: "#FF0404"
      },
      backgroundImage: {
        body: "url(' ')",
        overlay: "url(' ')",
      },
    },
  },
  plugins: [],
};
