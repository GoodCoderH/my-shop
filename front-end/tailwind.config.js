module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main: "#295e52",
        skeleten: "#ddd",
        skeletenWrapper: "#F2F2F2",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-focus"],
      opacity: ["group-focus"],
      inset: ["group-focus"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
