import React, { useState, useEffect } from "react";
import axios from "axios";

function Example() {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState()

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function TypeColor(typename){
        switch(typename){
            case "grass":
                return "text-[#7AC74C]"
            case "poison":
                return "text-[#A33EA1]"
            case "fire":
                return "text-[#EE8130]"
            case "normal":
                return "text-[#A8A77A]"
            case "water":
                return "text-[#6390F0]"
            case "electric":
                return "text-[#F7D02C]"
            case "ice":
                 return "text-[#96D9D6]"
            case "fighting":
                 return "text-[#C22E28]"
            case "ground":
                 return "text-[#E2BF65]"
            case "flying":
                return "text-[#A98FF3]"
            case "psychic":
                return "text-[#F95587]"
            case "bug":
                return "text-[#A6B91A]"
            case "rock":
                return "text-[#B6A136]"
            case "ghost":
                return "text-[#735797]"
            case "dragon":
                return "text-[#6F35FC]"
            case "dark":
                return "text-[#705746]"
            case "steel":
                return "text-[#B7B7CE]"
            case "fairy":
                return "text-[#D685AD]"
        }
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
                return []
            }
        }

        fetchPokemonData();
        
    }, [kantoPokemon]);
    
   
    


    const ClickPoke =  async() => {
            try{
                const gettinPoke = (async(pokemon) => {

                 
                const res = await fetch (pokemon.url);
                    const data = res.json()
                    setclickpokedata(data)
                    navigate("./Clicked", {state: {clickpokedata: res.data} });
                    console.log(gettinPoke)
                }) 
            } catch{
                console.error(error + "That Was the error")
            }
              
    };
 

    return (
        <>
            {
                <div className=" flex flex-wrap justify-between w-full ">
                    {kantoPokemon.map((pokemon, index) => (
                    <div className="flex flex-col w-2/12 h-40 bg-red-500 rounded-full  m-2 " key={index}>
                            <span className="text-md text-center mt-2 text-white before:content-[]">{capitalizeFirstLetter(pokemon.name)}</span>
                            <div className="flex justify-center">
                                <div className="bg-white h-28 w-40 rounded-full border-8 border-red-600 ">
                                    <div className="h-full flex items-center justify-center">
                                        <img onClick={ClickPoke} className="max-h-24 hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
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
