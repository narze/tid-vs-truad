const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontSize: {
        "7xl": "8rem",
        "8xl": "10rem",
        "9xl": "12rem",
        "10xl": "14rem",
        "11xl": "16rem",
        "12xl": "24rem",
        "13xl": "32rem",
      },
      screens: {
        "landscape-h-sm": { raw: "(orientation: landscape) and (max-height: 768px)" },
        "2k": { raw: "(min-width: 2000px) and (min-height: 1200px)" },
        "4k": { raw: "(min-width: 3200px) and (min-height: 1600px)" },
      },
    },
  },
  plugins: [],
};

module.exports = config;
