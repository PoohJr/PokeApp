/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    screens:{
      'sm': '390px',
      'md': '680px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundImage: theme => ({
        'pokemon-rep': "url('./bg-img/rep2.jpg')",
      }), 
      content:{
        'grass' : 'url("./type/grass.svg")',
        'poison' : 'url("./type/poison.svg")',
        'bug' : 'url("./type/bug.svg")',
        'dark' : 'url("./type/dark.svg")',
        'dragon' : 'url("./type/dragon.svg")',
        'electric' : 'url("./type/electric.svg")',
        'fairy' : 'url("./type/fairy.svg")',
        'fighting' : 'url("./type/fighting.svg")',
        'fire' : 'url("./type/fire.svg")',
        'flying' : 'url("./type/flying.svg")',
        'ghost' : 'url("./type/ghost.svg")',
        'ground' : 'url("./type/ground.svg")',
        'ice' : 'url("./type/ice.svg")',
        'psychic' : 'url("./type/psychic.svg")',
        'normal' : 'url("./type/normal.svg")',
        'rock' : 'url("./type/rock.svg")',
        'steel' : 'url("./type/steel.svg")',
        'water' : 'url("./type/water.svg")',
        'stellar': 'url("./type/stellar.svg")',
        }
      },
    
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
}

