import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Example() {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState()

    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function TypeColor(typename){
        switch(typename){
            case "grass":
                return "bg-[#7AC74C] uppercase drop-shadow-lg before:content-grass h-min"
            case "poison":
                return "bg-[#A33EA1] uppercase drop-shadow-lg before:content-poison h-min"
            case "fire":
                return "bg-[#EE8130] uppercase drop-shadow-lg before:content-fire h-min"
            case "normal":
                return "bg-[#A8A77A] uppercase drop-shadow-lg before:content-normal h-min"
            case "water":
                return "bg-[#6390F0] uppercase drop-shadow-lg before:content-water h-min"
            case "electric":
                return "bg-[#F7D02C] uppercase drop-shadow-lg before:content-electric h-min"
            case "ice":
                 return "bg-[#96D9D6] uppercase drop-shadow-lg before:content-ice h-min"
            case "fighting":
                 return "bg-[#C22E28] uppercase drop-shadow-lg before:content-fighting h-min"
            case "ground":
                 return "bg-[#E2BF65] uppercase drop-shadow-lg before:content-ground h-min"
            case "flying":
                return "bg-[#A98FF3] uppercase drop-shadow-lg before:content-flying h-min"
            case "psychic":
                return "bg-[#F95587] uppercase drop-shadow-lg before:content-psychic h-min"
            case "bug":
                return "bg-[#A6B91A] uppercase drop-shadow-lg before:content-bug h-min"
            case "rock":
                return "bg-[#B6A136] uppercase drop-shadow-lg before:content-rock h-min"
            case "ghost":
                return "bg-[#735797] uppercase drop-shadow-lg before:content-ghost h-min"
            case "dragon":
                return "bg-[#6F35FC] uppercase drop-shadow-lg before:content-dragon h-min"
            case "dark":
                return "bg-[#705746] uppercase drop-shadow-lg before:content-dark h-min"
            case "steel":
                return "bg-[#B7B7CE] uppercase drop-shadow-lg before:content-steel h-min"
            case "fairy":
                return "bg-[#D685AD] uppercase drop-shadow-lg before:content-fairy h-min"
        }
    }



    useEffect(() => {
        const PokeArr = async () => {
            try {
                const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=200");
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
                const fetchedPokemon = await Promise.all(
                    kantoPokemon.map(async (pokemon) => {
                        const response = await fetch(pokemon.url);
                        const data = await response.json();
                        return {data, url: pokemon.url};
                    })
                );
                console.log(fetchedPokemon)
            
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
            } catch(error){
                console.error(error + "That Was the error")
            }
              
    };
 

    return (
        <>
            {
                <div className=" flex flex-wrap  justify-evenly w-full ">
                    {kantoPokemon.map((pokemon, index) => (
                    <div key={index} className="flex flex-col  w-96 h-52 bg-red-500 rounded mt-8 m-3 " >
                        {console.log(kantoPokemon)}
                            <div className="text-md text-center bg-white rounded-lg mx-36 mt-3 mb-3">
                                <span className=" mt-2 text-red-700 ">{capitalizeFirstLetter(pokemon.name)}</span>
                            </div>
                            <div className="flex justify-center">
                                <div className="bg-white h-32 w-40 rounded-full border-8 border-red-600 ">
                                    <div className="h-full flex items-center justify-center">
                                        <img onClick={ClickPoke} className="max-h-24 hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                            alt={pokemon.name} />
                                            {/* {pokemon.type.map((typeObject, i)=>(
                                                <div key={i} className="">
                                                    <p>{typeObject.type.name}</p>
                                                </div>

                                            ))} */}
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
