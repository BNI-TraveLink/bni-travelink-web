/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      backgroundImage:{
        'login-landing':"url('/assets/images/kota.png')"
      }
    },
  },
  plugins: [],
}