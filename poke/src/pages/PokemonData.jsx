import React from "react";
import { useLocation } from "react-router-dom";


function PokemonData() {
    const location = useLocation();
    const pokedata = location.state ? location.state.pokedata : null;
    console.log(location.state.pokedata)
    
    const Playaudio = () => { 
        if(pokedata){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokedata.id}.ogg`).play()
        }
    }
    function weightConver(){

    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function heightConver(){
    }
        function TypeColor(typename, text){
        switch(typename, text){
            case "grass":
                return "bg-[#7AC74C] text-black"
            case "poison":
                return "bg-[#A33EA1]"
            case "fire":
                return "bg-[#EE8130]"
            case "normal":
                return "bg-[#A8A77A]"
            case "water":
                return "bg-[#6390F0]"
            case "electric":
                return "bg-[#F7D02C]"
            case "ice":
                 return "bg-[#96D9D6]"
            case "fighting":
                 return "bg-[#C22E28]"
            case "ground":
                 return "bg-[#E2BF65]"
            case "flying":
                return "bg-[#A98FF3]"
            case "psychic":
                return "bg-[#F95587]"
            case "bug":
                return "bg-[#A6B91A]"
            case "rock":
                return "bg-[#B6A136]"
            case "ghost":
                return "bg-[#735797]"
            case "dragon":
                return "bg-[#6F35FC]"
            case "dark":
                return "bg-[#705746]"
            case "steel":
                return "bg-[#B7B7CE]"
            case "fairy":
                return "bg-[#D685AD]"
        }
    }
        function Progressbar(item, base ){
        
        switch (item){
            case "hp":
            return (
                <>
        <div className="flex justify-between mb-1">
            <span className={`bg-base font-medium bg-red-700`}>{item}:</span>
            <span className="bg-sm font-medium bg-red-700">{base}%</span>
        </div>   
                </>
            );
            case "defense":
                return (
                    <>
            <div className="flex justify-between mb-1">
                <span className={`bg-base font-medium bg-blue-700`}>{item}:</span>
                <span className="bg-sm font-medium bg-blue-700">{base}%</span>
            </div>   
                    </>
                );
            default:
                return null;
        }
        // <div className="flex justify-between mb-1">
        //     <span className={`bg-base font-medium bg-black-700 dark:bg-white`}>{item}</span>
        //     <span className="bg-sm font-medium bg-{}-700 dark:bg-white">{item}</span>
        // </div>        

       
        }
    
    return (
        <div className="p-10 h-full">
            {pokedata && (
                <div className="">
                    <div className="flex  mt-16">
                        <h2 className="text-5xl ">{capitalizeFirstLetter(pokedata.name)}</h2>
                        <button className=" ml-3" onClick={Playaudio}>
                           <svg className="" xmlns="http://www.w3.org/2000/svg"></svg> 
                        </button>  
                        <ul className="flex">
                                        {pokedata.types.map((type, index) => (
                                            <li className={`" align-middle mx-3 p-4 bg-lg h-14  text-white rounded-sm" ${TypeColor(type.type.name)}`}key={index}>{type.type.name}
                                                <svg >

                                                </svg>
                                            </li>
                                        ))}
                                    </ul>
                    </div>

                        <div className=" flex  rounded w-full mt-8">
                            <p className="  "> PokeMon #: {pokedata.id}</p>
                            <p>Abilitlies:</p>
                            <ul className="">
                                {pokedata.abilities.map((ability, index) => (
                                    <tr key={index} >
                                    <li className="inline px-3" >{ability.ability.name}</li>
                                    </tr>
                                ))}
                            </ul>
                            <p className="">{pokedata.location_area_encounters}</p>
                            <img  className ="ml-auto mr-20 motion-safe:animate-bounce justify-end h-96 "src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} alt="Pokemon Image"/>
                        </div>
                    
                <table >
                    
                    <p>Height: {pokedata.height}</p>
                    <p>Weight: {pokedata.weight}</p>
                    
                    <p>Where ya can find em : {pokedata.location_area_encounters}</p>

                    <p>Moves:</p>
                    {/* <ul>
                        {pokedata.moves.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                            
                        ))}
                    </ul> */}

                    <p>Stats </p>
                        <ul>
                            {pokedata.stats.map((stat, index) => (
                                <li key={index}> 
                                {Progressbar(stat.stat.name, stat.base_stat)}
                                        </li>
                                
                                ))}
                        </ul> 
                        <div className="inline-flex">

                        </div>
                    </table>
                    <table>
                        <th>Moves</th>
                        <tr>
                            <ul>
                            {pokedata.moves.map((move, index) => {
                               
                                    <li key= {index}>
                                        {move.moves}
                                    </li>
                               
                            })}
                            </ul>
                        </tr>
                    </table>

                    
                </div>
            )}
        </div>
    );
}

// did is might be to gte the evelotion of the pokemon fetch (`https://pokeapi.co/api/v2/evolution-chain/1/`)
export default PokemonData;

// https://github.com/PokeAPI/pokeapi/issues/387 for poke hieght and weight 

// https://www.polygon.com/pokemon-go-guide/22554033/type-chart-strengths-weaknesses-super-effective
// and this is for when i am going to add whats its good against and weak against 