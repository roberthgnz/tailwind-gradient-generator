const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.vue", "./public/**/*.html"],
  safelist: [
    {
      pattern: /^bg-gradient-to-/,
    },
    {
      pattern: /^from-/,
    },
    {
      pattern: /^via-/,
    },
    {
      pattern: /^to-/,
    },
    {
      pattern: /^bg-/,
    },
  ],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      slate: colors.slate,
      gray: colors.gray,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    extend: {
      rotate: {
        135: "135deg",
        "-135": "-135deg",
      },
    },
  },
  plugins: [],
};
