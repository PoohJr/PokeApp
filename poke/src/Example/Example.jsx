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
    const[filteredPokemon, setfilteredPokemon] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([]);

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

    // Getting Url Data from the pokemon api
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

    // Getting Type Data
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


// pages 
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
    // end pages


    // handleClick Poke
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
// end Click Poke



// handle Navgation to type page 
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
// End type 

    // const getfilterpoke = () => {
    // if(clickpokedata.length > 0 ){
    //      function inFill(name ,i ) {
    //        const hello = clickpokedata[i].data.types.name === name
    //        console.log(hello);
    //        return hello
    //     }
    //  const filtering = clickpokedata.filter(inFill);
    //  console.log(filtering);
    //  return filtering
    // }
    
    // console.log(getfilterpoke('grass'));

        
    // }

    const handleTypeSelect = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(t => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleSubmit = () => {
        if(clickpokedata && clickpokedata.data) {
            console.log(clickpokedata);
            let filtering = clickpokedata;
            console.log(filtering);
            
        }

        
    }
  

    return (
        <>
            <div>
                {datatypes && (
                    <div>
                        <p className="text-white text-5xl my-10 pb-5 text-center font-bold">Pokémon Types</p>
                        <div className="flex flex-row flex-wrap justify-evenly">
                            {datatypes.results?.slice(0, 19).map((type, index) => (
                                <div key={index} className="rounded-2xl border-slate-600 border-2 bg-slate-900 transition-all ease-in-out duration-500 shadow-xl shadow-slate-500/65 hover:shadow-slate-300/50 px-10 m-2 py-3 my-3">
                                    <img
                                        onClick={() => HandleTypeClick(type.name)}
                                        className={`
                                        transition-all 
                                        ease-in-out 
                                        duration-200 
                                        hover:rotate-12 
                                        hover:scale-125 
                                        h-16 cursor-pointer 
                                        ${handleTypeImg(type.name)}`}
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
                    <div className="flex justify-center w-full">
                        .
                        <div className=" flex  my-10">
                            <p className=" text-white  text-3xl font-bold">Display</p>
                            <div className="ml-5 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                                <button onClick={() => handleLoadMore(50)} className="text-center text-slate-800">50</button>
                            </div>
                            <div className="ml-2 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                                <button onClick={() => handleLoadMore(75)} className="text-center text-slate-800">75</button>
                            </div>
                            <div className="ml-2 flex justify-center bg-white border-blue-900 rounded-full border-4 w-12">
                                <button onClick={() => handleLoadMore(100)} className="text-center text-slate-800">100</button>
                            </div>
                
                            <div className="mx-10 dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn shadow-lg shadow-gray-500-50 box text-3xl font-bold  m-1">Filter</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <div className="flex m-2 flex-wrap flex-col justify-center">
                                        <li clas><a className="text-lg">A-Z</a></li>
                                        <hr className="w-full h-1.5" />
                                        <li><a className="text-lg">Z-A</a></li>
                                        <hr className="w-full h-1.5" />
                                        <li className=""><a className="text-lg">1-{totalPokemon}</a></li>
                                        <hr className="w-full h-1.5" />
                                        <li><a className="text-lg">{totalPokemon}-1</a></li>
                                        <hr className="w-full h-1.5" />
                                        <li className="text-center text-xl font-bold">Type</li>
                                            {datatypes &&  datatypes.results && datatypes.results.slice(0,19).map((type, i) => {
                                                return ( <li key={i}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTypes.includes(type.name)}
                                                            onChange={() => handleTypeSelect(type.name)}
                                                        />
                                                        {capitalizeFirstLetter(type.name)}
                                                    </label>
                                                   
                                                </li>
                                                    )
                                                })}
                                         <button onClick={() => handleSubmit ()} className="text-center 
                                                     text-white
                                                      bg-cyan-500 
                                                      shadow-lg 
                                                      shadow-cyan-500/50 
                                                      hover:shadow-cyan-400/50 
                                                      transition-all 
                                                      ease-in-out 
                                                      duration-500 
                                                      px-4 py-2 
                                                      mt-3
                                                      rounded-full">Submit</button>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {offset + loadmore < totalPokemon && (
                        <div className="flex justify-center w-full mt-4">
                            <div className="px-8">
                                <button onClick={handleNextPage} className="text-center  text-white bg-cyan-500 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/50 transition-all ease-in-out duration-500 px-4 py-2 rounded-full">
                                    Next Page
                                </button>
                            </div>
                            <div className={offset > 0 ? "px-8" : "px-8 hidden"}>
                                <button onClick={handleResetPage} className="text-center  text-white bg-gray-500 shadow-lg shadow-gray-500/50 hover:shadow-gray-400/50 transition-all ease-in-out duration-500 px-4 py-2 rounded-full">
                                    Reset to 1
                                </button>
                            </div>

                            <div className={offset > 0 ? "px-8" : "px-8 hidden"}>
                                <button onClick={handlePrevPage} className="text-center text-white bg-red-500 shadow-lg shadow-red-500/50 hover:shadow-red-400/50 transition-all ease-in-out duration-500 px-4 py-2 rounded-full">
                                    Prev Page
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-evenly w-full flex-wrap mt-16">

                        {filteredPokemon.length > 0 ? filteredPokemon: clickpokedata.map((pokemon, index) => (
                            <div key={index} className="relative flex flex-col md:w-1/4 sm:w-1/3 xl:w-1/5 2xl:w-[300px] h-40 bg-slate-900 transition-all ease-in-out duration-500 shadow-xl shadow-slate-500/65 hover:shadow-slate-300/50 border-slate-600 border-2 rounded  m-4 mb-6">
                                <div className="text-md text-center rounded-lg mt-1 mb-1">
                                    <div className="text-white absolute top-0 left-0 w-7 h-8">
                                        <strong className="text-[#FFD700]">#{pokemon.data.id}</strong>
                                    </div>
                                    <strong className="mt-2 text-white">{capitalizeFirstLetter(pokemon.data.name)}</strong>
                                </div>
                                <div className="flex justify-center">
                                    <div className="group: bg-white h-24 w-24 rounded-full border-8 border-slate-800 hover:border-slate-600 transition-all ease-in-out duration-300">
                                        <div className="h-full flex items-center justify-center">
                                            <img
                                                onClick={(e) => HandleClick(e, index)}
                                                className="hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
                                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.data.id}.png`}
                                                alt={pokemon.data.name}
                                            />
                                        </div>
                                        <div>
                                            {/* <ul className="flex w-auto">
                                                {pokemon.data.types.map((type, i) => (
                                                    <li key={i} className="justify-center px-1">
                                                        <p className="text-xl text-white text-center">{capitalizeFirstLetter(type.type.name)}</p>
                                                    </li>
                                                ))}
                                                {pokemon.data.types.length === 1 && (
                                                    <li className="flex-auto"></li>
                                                )}
                                            </ul> */}
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
