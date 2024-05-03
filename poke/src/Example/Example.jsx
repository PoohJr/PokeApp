import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Example({setpokeData}) {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState([])

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
                        const response = await axios.get(pokemon.url);  
                         
                        return {data: response.data, url: pokemon.url};
                    })
                );
                setclickpokedata(fetchedPokemon)
                console.log(fetchedPokemon)
               

            
            } catch (error) {
                console.error(error + " that is the error");
                return []
            }
        }

        fetchPokemonData();
        
    }, [kantoPokemon]);
    
    // function getTypeClassNames(types) {
    //     if (types.length === 0) {
    //         return "justify-center px-2 pt-5"
    //     } else {
           
    //         // const classNames = types.map(type => getTypeClassName(type.type.name));
    //         return "text-center m-1"
    //     }
    // }
   
    const HandleClick = async (e, i) => {
            e.preventDefault();
            try {
           if (clickpokedata) {
                const pokeid = clickpokedata[i].data.id
                const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeid}`;
                
                const res = await axios.get(apiUrl);
                // console.log(res)
                if (res.status === 200) {
                    setpokeData(res.data);
                    navigate("./PokemonData", {state: {pokedata: res.data} });
                } 
              }
            } catch (error) {
                console.error("Error Fetching Api", error);
   
            }
            
            
        };


    return (
        <>
            {
              
                <div className=" flex flex-wrap">
                    <div className="navbar bg-base-400 rounded-box mb-12">
                        <div className="flex-1 px-2 lg:flex-none">
                            <a className="text-lg font-bold text-slate-50 ">daisyUI</a>
                        </div> 
                        <div className="flex justify-end flex-1 px-2">
                            <div className="flex items-stretch">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="text-xl btn btn-ghost rounded-btn text-slate-50 ">Filter/Types</div>
                                    <div tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-96 h-96 mt-4">
                                        <div className="flex">
                                            <h1>yoo</h1>
                                            <button>H</button>
                                        </div>
                                    </div>
                                </div>
                          </div>
                        </div>
                    </div>
                    <div className="flex justify-evenly w-full flex-wrap">
                            {clickpokedata.map((pokemon, index) => (
                            <div key={index} className="relative flex flex-col md:w-1/4 sm:w-1/2 xl:w-1/5 2xl:w-3/12  h-40  hover:shadow-inner bg-slate-900 rounded mt-4 mx-3 " >
                            
                                    <div className=" text-md text-center  rounded-lg  mt-1 mb-1">
                                        <div className="text-white absolute top-0 left-0 w-7 h-8 "><strong>#{pokemon.data.id}</strong></div>
                                        <strong className=" mt-2 text-white ">{capitalizeFirstLetter(pokemon.data.name)}</strong>
                                    </div>
                                    <div className="flex justify-center">
                                        {/* Chnage what small is in tailwind.config */}
                                        <div className="group: bg-white h-24 w-24 rounded-full border-8 border-slate-800 transition-all group-hover:rounded-none">
                                            <div className="h-full flex items-center justify-center">
                                                <img onClick={(e) => HandleClick(e, index)} 
                                                    className=" hover:-translate-y-3 ease-in-out duration-200 cursor-pointer"
                                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                                                    alt={pokemon.data.name} />
                                            </div>
                                            {/* Fix this Shit */}
                                            <div className="flex">
                                                <ul className="flex">
                                                    {pokemon.data.types.map((type, i)=> {
                                                return( <li key={i} className="justify-center px-1">
                                                        <p className="text-xl text-white text-center"> {capitalizeFirstLetter(type.type.name)}</p>
                                                        
                                                    </li>     
                                                )    
                                                            })}
                                                            {pokemon.data.types.length === 1 && (
                                                                <li className="flex-auto"></li>
                                                            )}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                            </div>
                            ))}
                            {/* this the divi added  */}
                    </div>
                </div>
                
            }
        </>
    );
}

Example.propTypes = {
    setpokeData: PropTypes.func.isRequired,
  };
export default Example;
