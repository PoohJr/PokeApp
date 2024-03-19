import React, { useState, useEffect } from "react";


function Example(){
    const [pokeEva, setpokeEva] = useState(null)
    const [expoke, setexpokeData] = useState(null)
    const Playaudio = () => { 
        if(expoke){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg`).play()
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

           <div className="max-w-md bg-gray-300 h-fit ml-7 pl-5 rounded-md p-4">
                {expoke ? (
                    <div className="flex flex-col">
                        <h2 className=" text-2xl"> id#: {expoke.id}</h2>
                        <div className="inline-flex">
                        <p className="">Type:</p>
                        <ul className="">
                             {expoke.types.map((type, index) => (
                                <li className="inline p-1.5" key={index}>{type.type.name}</li>
                             ))}
                        </ul>
                        </div>
                        <h2 className="">name: {expoke.name}</h2>
                        <p className="">height: {expoke.height}</p>
                        <p className="">weight: {expoke.weight}</p>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`} alt="Pokemon Image"/>
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