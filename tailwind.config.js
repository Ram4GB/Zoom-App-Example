/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {},
    screens: {
      base: "0em", // 0px
      sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
      md: "48em", // ~768px
      lg: "62em", // ~992px
      xl: "80em", // ~1280px
      "2xl": "96em", // ~1536px
    },
  },
  plugins: [],
};
