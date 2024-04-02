/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: { 
      content:{
        'grass' : 'url("/type/grass.svg")'
        }
      },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
}

