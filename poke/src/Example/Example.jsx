import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Example() {
    const [kantoPokemon, setKantoPokemon] = useState([]);
 
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        const PokeArr = async () => {
            try {
                const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
                const allPoke = res.data.results;
                setKantoPokemon(allPoke);
            } catch (error) {
                console.error(error + " This is the error");
            }
        };
    
        PokeArr(); 
    }, []);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const fetchedPokemonData = await Promise.all(
                    kantoPokemon.map(async (pokemon) => {
                        const response = await fetch(pokemon.url);
                        const data = await response.json();
                        return {data, url: pokemon.url};
                    })
                );
                console.log(fetchedPokemonData)
            } catch (error) {
                console.error(error + " This is the error");
                
            }
        }

        fetchPokemonData();
        
    }, [kantoPokemon]);
    
   
    


    const handleClickPokemon =  async() => {
            try{
                const gettinPoke = await Promise.all(
                    kantoPokemon.map(async(pokemon) => {
                        const res = await fetch (pokemon.url);
                        const data = res.json()
                        setclickpokedata(data)
                        navigate("./PokemonData", {state: {navpokedata: res.data} });
                        console.log(gettinPoke)
                        
                    })
                )
            } catch (error){
                console.error(error + "That Was the error")
            }
              
    };
 

    return (
        <>
            {
                <div className=" flex flex-wrap bg-gray-400 w-full mt-40">
                    {kantoPokemon.map((pokemon, index) => (
                    <div className="flex flex-col w-2/12 h-40 bg-red-500 rounded-full m-5 " key={index}>
                            <span className="text-md text-center mt-2 text-white">{capitalizeFirstLetter(pokemon.name)}</span>
                            <div className="flex justify-center">
                                <div className="bg-white h-28 w-18 rounded-full border-8 border-red-600 ">
                                    <div className="h-full flex items-center justify-center">
                                        <img onClick={handleClickPokemon} className="max-h-24 hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                            alt={pokemon.name} />
                                    </div>
                                </div>
                            </div>
                    </div>
           ))}
                </div>}
        </>
    );
}

export default Example;
        // BackGround images
        // https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/dynamax-battle.png
        //https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/pokemon-in-the-wild.png
       //https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/tcg/sun-moon-cosmic-eclipse-01.jpg