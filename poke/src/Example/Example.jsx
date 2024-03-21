import React, { useState, useEffect } from "react";
import axios from "axios";

function Example() {
    const [kantoPokemon, setKantoPokemon] = useState([]);

    useEffect(() => {
        async function fetchKantoPokemon() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=30');
                const pokemonList = response.data.results.map(pokemon => pokemon.url);
                setKantoPokemon(pokemonList);
            } catch (error) {
                console.error("Error fetching Kanto Pokémon:", error);
            }
        }
        fetchKantoPokemon();
    }, []);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const pokemonDataList = await Promise.all(
                    kantoPokemon.map(async (url) => {
                        const response = await fetch(url);
                        return await response.json();
                    })
                );
                console.log(pokemonDataList);
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        }

        if (kantoPokemon.length > 0) {
            fetchPokemonData();
        }
    }, [kantoPokemon]);

    function htmlLoop(){
        
    }

    return (
        <>
            <div className="flex justify-center items-center">
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
           </div>
        </>
    );
}

export default Example;
