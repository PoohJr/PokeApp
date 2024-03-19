import React, { useState, useEffect } from "react";


function Example(){
    const [pokeEva, setpokeEva] = useState(null)
    const [expoke, setexpokeData] = useState(null)
    const Playaudio = () => { 
        if(expoke){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg`).play()
        }
    }

    function firstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1); 
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
            case "grass":
                return "text-[#7AC74C]"
            case "ice":
                 return "text-[#96D9D6]"
            case "fighting":
                 return "text-[#C22E28]"
            case "poison":
                 return "text-[#A33EA1]" 
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
    


    useEffect(() =>{
        async function Sample() { 
            try {
                const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
                if (response.ok) {
                    const data = await response.json();
                    setexpokeData(data)
                    const res = await fetch(`https://pokeapi.co/api/v2/evolution-chain/1`)
                    const data2 = await res.json()
                    setpokeEva(data2)
                    console.log(data2)

                    console.log("Got Example 1:", data);
                } else {
                    console.error("Failed to fetch Example 1:", response.status);
                }
            } catch (error) {
                console.error("Error fetching Example 1:", error);
            }
        }
        Sample()
    },[])

    return(
        <>
            <div className="flex justify-center items-center">
                <hr className="w-4/5 bg-grey-500 mt-6 "></hr>
            </div>
            <div className="flex justify-center">
                <h1 className=" text-center text-3xl p-3 pt-5 font-semibold">PokeMon Examples</h1>
            </div>

           <div className="max-w-md bg-gray-300 h-fit ml-7 pl-5 rounded-md p-4 mb-7">
                {expoke ? (
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <p className="  "> id#: {expoke.id}</p>
                            <div className="inline-flex">
                                <p className="">Type:</p>
                                <ul className="">
                                    {expoke.types.map((type, index) => (
                                        <li className={`inline p-1.5" ${TypeColor(type.type.name)}`}key={index}>{type.type.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <h2 className="">name: {expoke.name}</h2>
                        <p className="">height: {expoke.height}</p>
                        <p className="">weight: {expoke.weight}</p>
                            <div className="">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`} alt="Pokemon Image"/>
                            </div>
                        <p>Stats </p>
                    <ul>
                        {expoke.stats.map((stat, index) => (
                            <li key={index}>{stat.stat.name} {stat.base_stat}</li>
                            ))}
                    </ul>   
                    <button onClick={Playaudio}>PokeMon Cry: </button> 
                        <div className="inline-flex">
                            <p>Abilitlies:</p>
                            <ul className="">
                                {expoke.abilities.map((ability, index) => (
                                    <li className="inline" key={index}>{ability.ability.name}</li>
                                ))}
                            </ul>
                        </div>

                    </div>
                    ) : (
                        <p>Loading...</p>
                    )}
           </div>
        </>
    )
}

export default Example