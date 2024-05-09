import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function Example({setpokeData}) {
    const [kantoPokemon, setKantoPokemon] = useState([]);
    const [clickpokedata, setclickpokedata] = useState([])
    const [datatypes, setdatatypes] = useState([])

    const navigate = useNavigate();
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function TypeColor(typename){
        switch(typename){
            case "grass":
                return "content-grass h-min"
            case "poison":
                return "content-poison h-min"
            case "fire":
                return "content-fire h-min"
            case "normal":
                return "content-normal h-min"
            case "water":
                return "content-water h-min"
            case "electric":
                return "content-electric h-min"
            case "ice":
                 return "content-ice h-min"
            case "fighting":
                 return "content-fighting h-min"
            case "ground":
                 return "content-ground h-min"
            case "flying":
                return "content-flying h-min"
            case "psychic":
                return "content-psychic h-min"
            case "bug":
                return "content-bug h-min"
            case "rock":
                return "content-rock h-min"
            case "ghost":
                return "content-ghost h-min"
            case "dragon":
                return "content-dragon h-min"
            case "dark":
                return "content-dark h-min"
            case "steel":
                return "content-steel h-min"
            case "fairy":
                return "content-fairy h-min"
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
    
    useEffect(() => {
       const fetchtype = async () => {
        try{
            const url = await axios.get(`https://pokeapi.co/api/v2/type`)
            const res = url.data
            
            setdatatypes(res)
            console.log(res)



        } catch(error) {
            "Couldnt Find the" + error
        }
        
        }
        fetchtype()
    },[])
   
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
            
            
        }
        function handleTypeImg(type) {
            switch(type) {
                case "grass":
                    return 'bg-content-grass before:content-grass';
                 case "poison":
                    return './type/poison.svg';
                 case "bug":
                     return 'url("./type/bug.svg")';
                // case "dark":
                //     return 'url("./type/dark.svg")';
                // case "dragon":
                //     return 'url("./type/dragon.svg")';
                // case "electric":
                //     return 'url("./type/eletric.svg")';
                // case "fairy":
                //     return 'url("./type/fairy.svg")';
                // case "fighting":
                //     return 'url("./type/fighting.svg")';
                // case "fire":
                //     return 'url("./type/fire.svg")';
                // case "flying":
                //     return 'url("./type/flying.svg")';
                // case "ghost":
                //     return 'url("./type/ghost.svg")';
                // case "ground":
                //     return 'url("./type/ground.svg")';
                // case "ice":
                //     return 'url("./type/ice.svg")';
                // case "psychic":
                //     return 'url("./type/psychic.svg")';
                // case "normal":
                //     return 'url("./type/normal.svg")';
                // case "rock":
                //     return 'url("./type/rock.svg")';
                // case "steel":
                //     return 'url("./type/steel.svg")';
                // case "water":
                //     return 'url("./type/water.svg")';
                default:
                    return 'ERROR';
            }
        }
        

   

    

        function handleLowestid(){
           
        }

        function handleHighestid(){
           
        }

        function handleAZ(){
           
        }

        function handleAZ(){
           
        }

        
    return (
        <>
            {
              
                <div className=" flex flex-wrap">
                {datatypes && (
                   <div className="">
                 
                        <p className="text-white justify-center text-center text-5xl mt-4 pb-5 ">Pokémon Types</p>
                        
                        {datatypes.results?.map((type, index) => (
                            <ul key={index} className="flex">
                                <li className={handleTypeImg(type.name)}>
                                     <p>{type.name}</p>
                                 </li>
                                 
                            </ul>
                           
                        ))} 


                   </div>
                )}
                   <hr className="w-full h-1.5" />
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
                                            <div className="">
                                                <ul className="flex w-auto">
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
