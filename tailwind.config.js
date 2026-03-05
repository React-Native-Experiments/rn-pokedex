const { COLORS } = require("./src/constants/theme");
const { TYPE_COLORS } = require("./src/constants/pokemon");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        pokemon: TYPE_COLORS,
      },
    },
  },
  plugins: [],
};
