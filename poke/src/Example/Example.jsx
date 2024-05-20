import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Example({ setpokeData }) {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState([]);
    const [datatypes, setdatatypes] = useState([]);
    const [loadmore, setloadmore] = useState(25);
    const [offset, setOffset] = useState(0); 
    const [totalPokemon, setTotalPokemon] = useState(0); 

    const navigate = useNavigate();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        fetchTotalPokemon();
    }, []);

    useEffect(() => {
        fetchPokemon(offset, loadmore);
    }, [offset, loadmore]);

    const fetchTotalPokemon = async () => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1`);
            setTotalPokemon(res.data.count);
        } catch (error) {
            console.error(error + " is the error");
        }
    };

    const fetchPokemon = async (offset, limit) => {
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
            const allPoke = res.data.results;
            setKantoPokemon(allPoke);
        } catch (error) {
            console.error(error + " is the error");
        }
    };

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const fetchedPokemon = await Promise.all(
                    kantoPokemon.map(async (pokemon) => {
                        const response = await axios.get(pokemon.url);
                        return { data: response.data, url: pokemon.url };
                    })
                );
                setclickpokedata(fetchedPokemon);
            } catch (error) {
                console.error(error + " is the error");
                return null;
            }
        }
        fetchPokemonData();
    }, [kantoPokemon]);

    useEffect(() => {
        const fetchtype = async () => {
            try {
                const url = await axios.get(`https://pokeapi.co/api/v2/type`);
                const res = url.data;
                setdatatypes(res);
            } catch (error) {
                console.error("Couldn't find the " + error);
            }
        };
        fetchtype();
    }, []);

    const handleLoadMore = (num) => {
        setloadmore(num);
        
    };

    const handleNextPage = () => {
        setOffset(prevOffset => prevOffset + loadmore);
    };
    const handlePrevPage = () => {
        setOffset(prevOffset => prevOffset - loadmore)
    };

    const handleResetPage = () => {
        setOffset(0)
    }

    const HandleClick = async (e, i) => {
        e.preventDefault();
        try {
            if (clickpokedata) {
                const pokeid = clickpokedata[i].data.id;
                const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeid}`;
                const res = await axios.get(apiUrl);
                if (res.status === 200) {
                    setpokeData(res.data);
                    navigate("./PokemonData", { state: { pokedata: res.data } });
                }
            }
        } catch (error) {
            console.error("Error Fetching Api", error);
        }
    };

    const HandleTypeClick = (index) => {
        navigate(`./${capitalizeFirstLetter(index)}`);
    };

    function handleTypeImg(type) {
        switch (type) {
            case "grass": return 'content-grass';
            case "poison": return 'content-poison';
            case "bug": return 'content-bug';
            case "dark": return 'content-dark';
            case "dragon": return 'content-dragon';
            case "electric": return 'content-electric';
            case "fairy": return 'content-fairy';
            case "fighting": return 'content-fighting';
            case "fire": return 'content-fire';
            case "flying": return 'content-flying';
            case "ghost": return 'content-ghost';
            case "ground": return 'content-ground';
            case "ice": return 'content-ice';
            case "psychic": return 'content-psychic';
            case "normal": return 'content-normal';
            case "rock": return 'content-rock';
            case "steel": return 'content-steel';
            case "water": return 'content-water';
            case "stellar": return "content-stellar";
            case "unknown": return "";
            default: return 'ERROR';
        }
    }

    const filterPoke = (data) => {
        //Filter Poketype data
    }
    return (
        <>
            <div>
                {datatypes && (
                    <div>
                        <p className="text-white text-5xl mt-10 pb-5 text-center font-bold">Pokémon Types</p>
                        <div className="flex flex-row flex-wrap justify-evenly">
                            {datatypes.results?.slice(0, 19).map((type, index) => (
                                <div key={index} className="rounded-2xl border-slate-600 border-2 bg-slate-900 px-10 py-3 my-3">
                                    <img
                                        onClick={() => HandleTypeClick(type.name)}
                                        className={`transition-all ease-in-out duration-200 hover:rotate-12 hover:scale-125 h-16 cursor-pointer ${handleTypeImg(type.name)}`}
                                        alt={type.name}
                                    />
                                    <p className="text-white text-center pt-1">{capitalizeFirstLetter(type.name)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-wrap">
                    <hr className="w-full h-1.5" />

                    <div className="ml-20 flex my-10">
                        <p className="text-center text-white justify-center text-3xl font-bold">Display</p>
                        <div className="ml-5 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                            <button onClick={() => handleLoadMore(50)} className="text-center text-slate-800">50</button>
                        </div>
                        <div className="ml-2 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                            <button onClick={() => handleLoadMore(75)} className="text-center text-slate-800">75</button>
                        </div>
                        <div className="ml-2 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                            <button onClick={() => handleLoadMore(100)} className="text-center text-slate-800">100</button>
                        </div>
                    </div>

                    {offset + loadmore < totalPokemon && (
                        <div className="flex justify-center w-full mt-4">
                            <div className="px-8">
                                <button onClick={handleNextPage} className="text-center  text-white bg-blue-500 px-4 py-2 rounded-full">
                                    Next Page
                                </button>
                            </div>
                            <div className={offset > 0 ? "px-8" : "px-8 hidden"}>
                                <button onClick={handleResetPage} className="text-center  text-white bg-blue-500 px-4 py-2 rounded-full">
                                    Reset to 1
                                </button>
                            </div>

                            <div className={offset > 0 ? "px-8" : "px-8 hidden"}>
                                <button onClick={handlePrevPage} className="text-center text-white bg-blue-500 px-4 py-2 rounded-full">
                                    Prev Page
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-evenly w-full flex-wrap">
                        {clickpokedata.map((pokemon, index) => (
                            <div key={index} className="relative flex flex-col md:w-1/4 sm:w-1/3 xl:w-1/5 2xl:w-3/12 h-40 hover:shadow-inner bg-slate-900 border-slate-600 border-2 rounded  m-4 mb-6">
                                <div className="text-md text-center rounded-lg mt-1 mb-1">
                                    <div className="text-white absolute top-0 left-0 w-7 h-8">
                                        <strong className="text-[#FFD700]">#{pokemon.data.id}</strong>
                                    </div>
                                    <strong className="mt-2 text-white">{capitalizeFirstLetter(pokemon.data.name)}</strong>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group: bg-white h-24 w-24 rounded-full border-8 border-slate-800 transition-all group-hover:rounded-none">
                                        <div className="h-full flex items-center justify-center">
                                            <img
                                                onClick={(e) => HandleClick(e, index)}
                                                className="hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.data.id}.png`}
                                                alt={pokemon.data.name}
                                            />
                                        </div>
                                        <div>
                                            <ul className="flex w-auto">
                                                {pokemon.data.types.map((type, i) => (
                                                    <li key={i} className="justify-center px-1">
                                                        <p className="text-xl text-white text-center">{capitalizeFirstLetter(type.type.name)}</p>
                                                    </li>
                                                ))}
                                                {pokemon.data.types.length === 1 && (
                                                    <li className="flex-auto"></li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    
                </div>
            </div>
        </>
    );
}

Example.propTypes = {
    setpokeData: PropTypes.func.isRequired,
};

export default Example;
