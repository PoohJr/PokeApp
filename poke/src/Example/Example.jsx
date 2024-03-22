import React, { useState, useEffect } from "react";
import axios from "axios";

function Example() {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState()

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
                        return {...data, url: pokemon.url};
                    })
                );
                console.log(fetchedPokemonData);
            } catch (error) {
                console.error(error + " This is the error");
                return []
            }
        }

        const urls = fetchPokemonData();
        
    }, [kantoPokemon]);
    
   
    


    const ClickPoke = async (url) => {
        try {
            const getSelctpoke = async (pokemon) =>{
                const res = await axios.get(url)
               if(res.staus =200){
                setclickpokedata(res.data)
               }
                console.log(pokemon)
                navigate("./PokemonData", {state: {pokedata: res.data} });
                console.log(getSelctpoke)
            }

            if (res.status == 200) {
                setpokeData(res.data);
                navigate("./PokemonData", {state: {pokedata: res.data} });
            } else {
                throw new Error("Failed to fetch Data");
            }
        } catch (error) {
            console.error("Error Fetching Api", error);
        }
        
    };
 

    return (
        <>
            {/* <div className="flex justify-center items-center">
                <hr className="w-4/5 bg-grey-500 mt-6 "></hr>
            </div>
            <div className="flex justify-center">
                <h1 className=" text-center text-3xl p-3 pt-5 font-semibold">PokeMon Dex</h1>
            </div>

           <div className="max-w-64 bg-gray-300 max-h-fit m-10 rounded-md p-4">
                {kantoPokemon ? (
                    <div className="flex flex-col h-55">

                        <div className="flex flex-col justify-center">
                            
                                <div className="flex justify-center ">
                                        <p className="text-2xl">{(kantoPokemon.name)}</p>
                                </div>
                                <div className=" flex justify-center rounded-full h-12 w-12 bg-black items-center text-center"></div>
                                <div className=" h-14 w-40">
                                    <img className="p-4" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`} alt="Pokemon Image"/>
                                </div>
                            
                        </div>

                    </div>
                    ) : (
                        <p>Loading...</p>
                    )}
           </div> */
                <div className=" flex flex-wrap bg-gray-400 w-full ">
                    {kantoPokemon.map((pokemon, index) => (
                    <div className="flex flex-col w-2/12 h-40 bg-red-500 rounded-full m-5 " key={index}>
                            <span className="text-md text-center mt-2 text-white">{capitalizeFirstLetter(pokemon.name)}</span>
                            <div className="flex justify-center">
                                <div className="bg-white h-28 w-18 rounded-full border-8 border-red-600">
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
