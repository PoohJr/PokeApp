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
                    return 'content-grass'
                case "poison":
                    return 'content-poison'
                case "bug":
                    return 'content-bug'
                case "dark":
                    return 'content-dark'
                case "dragon":
                    return 'content-dragon'
                case "electric":
                    return 'content-electric'
                case "fairy":
                    return 'content-fairy'
                case "fighting":
                    return 'content-fighting '
                case "fire":
                    return 'content-fire'
                case "flying":
                    return 'content-flying'
                case "ghost":
                    return 'content-ghost'
                case "ground":
                    return 'content-ground'
                case "ice":
                    return 'content-ice'
                case "psychic":
                    return 'content-psychic'
                case "normal":
                    return 'content-normal'
                case "rock":
                    return 'content-rock'
                case "steel":
                    return 'content-steel'
                case "water":
                    return 'content-water'
                case "stellar": 
                    return "content-stellar"
                case "unknown":
                    return""
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
            <div className="">
              {datatypes && (
                <div className="">
                     <p className="text-white text-5xl mt-10 pb-5 text-center font-bold">Pokémon Types</p>
                     <div className="flex flex-row flex-wrap justify-evenly">
                     {datatypes.results?.slice(0,19).map((type, index) => (
                         <div key={index} className="bg-slate-700 px-10 py-3 my-3">
                             <img className={`h-16  cursor-pointer ${handleTypeImg(type.name)}`} alt={type.name}/>
                                  <p className="text-white text-center">{capitalizeFirstLetter(type.name)}</p>
                         </div>
                        
                     ))} 
                    </div>

                </div>
             )}
                <div className=" flex flex-wrap">
                
                   <hr className="w-full h-1.5" />
                    <div className="flex justify-evenly w-full flex-wrap">
                            {clickpokedata.map((pokemon, index) => (
                            <div key={index} className="relative flex flex-col md:w-1/4 sm:w-1/2 xl:w-1/5 2xl:w-3/12  h-40  hover:shadow-inner bg-slate-900 rounded mt-4 mx-3 " >
                            
                                    <div className=" text-md text-center  rounded-lg  mt-1 mb-1">
                                        <div className="text-white absolute top-0 left-0 w-7 h-8 "><strong>#{pokemon.data.id}</strong></div>
                                        <strong className=" mt-2 text-white ">{capitalizeFirstLetter(pokemon.data.name)}</strong>
                                    </div>
                                    <div className="flex justify-center">
                                       
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
            </div>
                
            }
        </>
    );
}

Example.propTypes = {
    setpokeData: PropTypes.func.isRequired,
  };
export default Example;
