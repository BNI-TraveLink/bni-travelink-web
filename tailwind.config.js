/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-landing':"url('/assets/images/kota.png')"
      },
      fontFamily: { 
        "poppins": ['Poppins', 'sans-serif'], 
        "inter": ['Inter', 'sans-serif'] ,
    },
    colors:{
      'secondary':'#005E6A'
    } 
    },
  },
  variants:{
    extends:{
      display:['group-focus'],
      opacity:['group-focus'],
      inset:['group-focus']
    }
  },
  plugins: [],
}