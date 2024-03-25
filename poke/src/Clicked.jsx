import React from "react";
import { useLocation } from "react-router-dom";




function Clicked() {

    const location = useLocation()
    const clickpokedata = location.state ? location.state.clickpokedata : null;
    console.log(location.state.clickpokedata)
    
    const Playaudio = () => { 
        if(pokedata){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokedata.id}.ogg`).play()
        }
    }
    function weightConver(){

    }

    function heightConver(){
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
        function Progressbar(item, base ){
        
        switch (item){
            case "hp":
            return (
                <>
        <div className="flex justify-between mb-1">
            <span className={`text-base font-medium text-red-700`}>{item}:</span>
            <span className="text-sm font-medium text-red-700">{base}%</span>
        </div>   
                </>
            );
            case "defense":
                return (
                    <>
            <div className="flex justify-between mb-1">
                <span className={`text-base font-medium text-blue-700`}>{item}:</span>
                <span className="text-sm font-medium text-blue-700">{base}%</span>
            </div>   
                    </>
                );
            default:
                return null;
        }
        // <div className="flex justify-between mb-1">
        //     <span className={`text-base font-medium text-black-700 dark:text-white`}>{item}</span>
        //     <span className="text-sm font-medium text-{}-700 dark:text-white">{item}</span>
        // </div>        

       
        }
    
    return (
        <div>
            {pokedata && (
                <div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} alt="Pokemon Image"/>
                    <h2 className="text-red-400">Name: {pokedata.name}</h2>
                    <div className="flex justify-between">
                            <p className="  "> id#: {pokedata.id}</p>
                            <div className="inline-flex">
                                <p className="px-2"></p>
                                <ul className="">
                                    {pokedata.types.map((type, index) => (
                                        <li className={`"inline p-1.5 text-xl" ${TypeColor(type.type.name)}`}key={index}>{type.type.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    <p>Height: {pokedata.height}</p>
                    <p>Weight: {pokedata.weight}</p>
                    <button onClick={Playaudio}>PokeMon Cry: </button> 
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
                            <p>Abilitlies:</p>
                            <ul className="">
                                {pokedata.abilities.map((ability, index) => (
                                    <li className="inline px-3" key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </div>

                    
                </div>
            )}
        </div>
    );
}

// did is might be to gte the evelotion of the pokemon fetch (`https://pokeapi.co/api/v2/evolution-chain/1/`)
export default Clicked;

// https://github.com/PokeAPI/pokeapi/issues/387 for poke hieght and weight 

// https://www.polygon.com/pokemon-go-guide/22554033/type-chart-strengths-weaknesses-super-effective
// and this is for when i am going to add whats its good against and weak against 