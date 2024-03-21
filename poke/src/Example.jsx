import React, { useState, useEffect, } from "react";


function Example(){
    const [pokeEva, setpokeEva] = useState(null)
    const [expoke, setexpokeData] = useState(null)
    function firstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1); 
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

    return (
        <>
            <div className="flex justify-center items-center">
                <hr className="w-4/5 bg-grey-500 mt-6 "></hr>
            </div>
            <div className="flex justify-center">
                <h1 className=" text-center text-3xl p-3 pt-5 font-semibold">PokeMon Dex</h1>
            </div>

           <div className="max-w-64 bg-gray-300 max-h-fit m-10 rounded-md p-4">
                {expoke ? (
                    <div className="flex flex-col h-55">

                        <div className="flex flex-col justify-center">
                            
                                <div className="flex justify-center ">
                                        <p className="text-2xl">{firstLetter(expoke.name)}</p>
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
    )
}
// idea put pokemon favicon in the corner of every poke card



export default Example