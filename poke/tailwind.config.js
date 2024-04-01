/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: { 
      content:{
        'grass' : 'url("/type-icons/grass.svg")'
        }
      },
  },
  plugins: [('daisyui')],
  daisyui: {
    darkTheme: "light",
  },
}

