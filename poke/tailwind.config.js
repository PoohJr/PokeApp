/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'pokemon-wild': "url('./bg-img/best.webp')",
      }), 
      content:{
        'grass' : 'url("./type/grass.svg")',
        'poison' : 'url("./type/poison.svg")',
        'bug' : 'url("./type/bug.svg")',
        'dark' : 'url("./type/dark.svg")',
        'dragon' : 'url("./type/dragon.svg")',
        'eletric' : 'url("./type/eletric.svg")',
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
        'card-bg': "url('.src/bg-img/databack.jpg')",
        'new' : "url('https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/galar-scenery.png')",
        }
      },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
}

