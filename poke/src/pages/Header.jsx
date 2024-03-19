import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Header() {
    const [pokeEva, setpokeEva] = useState(null)
    const [expoke, setexpokeData] = useState(null)
    const [userInput, setUserInput] = useState("");
    const [pokedata, setpokeData] = useState(null);
    const [newerror, setNewError] = useState(null);
    const navigate = useNavigate();
    const Playaudio = () => { 
        if(expoke){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg`).play()
        }
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput}`;
            const res = await axios.get(apiUrl);
            if (res.status === 200) {
                setpokeData(res.data);
                navigate("./PokemonData", {state: {pokedata: res.data} });
            } else {
                throw new Error("Failed to fetch Data");
            }
        } catch (error) {
            console.error("Error Fetching Api", error);
            setNewError("Error Fetching Api: " + error.message);
        }
        setUserInput("");
    };

    
    useEffect(() =>{
        async function example1() { 
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
        example1()
    },[])
   
   

    return (
        <>
            <div className="flex w-100 h-3/5 ">
                <form className=" flex flex-col w-full">
                    <div className="text-center justify-center items-center h-3/4">
                        <h1 className="text-9xl mt-28 font-extrabold">PokeMon</h1>
                        <input
                            className="mt-16 mb-10 px-3 py-2 font-semibold placeholder-grey-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                            id="in"
                            onChange={(e) => setUserInput(e.target.value)}
                            type="text"
                            placeholder="Choose Your Pokemon!"
                            autoComplete="off"
                            aria-label="Search Pokemon"
                        />
                        <button
                            className="hidden"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                        <br />
                        <button 
                        className="mt-16 mb-20 bg-red-500 px-2 py-2 hover:bg-red-600 text-white rounded-full">
                            Randomize
                            </button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center items-center">
                <hr className="w-4/5 bg-grey-500 mt-6 "></hr>
            </div>
            <div className="flex justify-center">
                <h1 className=" text-center text-3xl p-3 pt-5 font-semibold">PokeMon Examples</h1>
            </div>

           <div className="max-w-sm">
                {expoke ? (
                    <div className="bg-gray-300 h-fit ml-7 pl-5 rounded-md">
                        <h2 className=" text-2xl"> id#: {expoke.id}</h2>
                        <p>Type:</p>
                        <ul>
                             {expoke.types.map((type, index) => (
                                <li key={index}>{type.type.name}</li>
                             ))}
                        </ul>
                        <h2 className=" text-2xl">name: {expoke.name}</h2>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`} alt="Pokemon Image"/>
                        <p>Stats: </p>
                    <ul>
                        {expoke.stats.map((stat, index) => (
                            <li key={index}>{stat.stat.name} {stat.base_stat}</li>
                            ))}
                    </ul>   
                    <button onClick={Playaudio}>PokeMon Cry: </button> 
                    <p>Abilitlies:</p>
                    <ul>
                        {expoke.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                        <p className=" text-2xl">height: {expoke.height}</p>
                        <p className=" text-2xl">weight: {expoke.weight}</p>
                    </div>
                    ) : (
                        <p>Loading...</p>
                    )}
           </div>
            

        </>
    );
}

export default Header;