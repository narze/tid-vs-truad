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
      },
    },
  },
  plugins: [],
};

module.exports = config;
