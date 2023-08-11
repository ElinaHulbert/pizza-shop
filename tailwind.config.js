module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      Kaftan: ['Kaftan', 'sans-serif'],
    },
    colors: {
      "main.beige": "#F0DECF",
      "main.brown":"#280F0D",
      "accent.green":"#3F4935",
      "accent.orange":"#EA724B",
      "secondary.pink":"#F1CDC2",
     },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  
  
}
