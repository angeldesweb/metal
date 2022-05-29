const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},
  },
  daisyui:{
    themes:['winter']
  },
  plugins: [require('daisyui')],
};

module.exports = config;
