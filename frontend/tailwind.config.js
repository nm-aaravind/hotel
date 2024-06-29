/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['"Raleway"', "sans-serif"],
      libre: ['"Libre Franklin"', 'sans-serif'],
      mukta: ["Mukta", 'sans-serif'],
        title: ["Orbitron", 'sans-serif']
      },
      backgroundImage: {
        landingBg: "url('/landing-bg.jpg')",
      },
      boxShadow:{
        hero: '0 0 250px black inset',
        modal: '0 10px 20px 0 rgb(0 0 0 / 0.4)',
        button: '0 6px 5px 0 rgb(0 0 0 / 0.3)',
        button_hover: '0 2px 4px 0 rgb(0 0 0 / 0.3)',
      },
      colors: {
        'federal': '#0338ab',
        'sandy': '#F7DC93',
        'moonstone': '#119ef5',
        'moontone-hover': '#0687d6',
        'cloud' : '#f1f3ff'
      },
    },
  },
  plugins: [],
}

