import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Example from "../Example/Example";
import Preloader from "../Loader/Preloader";

export function Header() {
    const [userInput, setUserInput] = useState("");
    const [pokedata, setpokeData] = useState(null);
    const [newerror, setNewError] = useState(null);
    const [loading, setloading] = useState(true)
    const navigate = useNavigate();
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setloading(false);
          }, 100);

          return () => clearTimeout(timeout);
    },[])


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

    return (
        <>
            {loading ? (
                <Preloader/>
            ) : (
                <>
                    <div className="flex w-full h-3/5 ">
                        <form className="flex flex-col w-full">
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
                                    className="text-xl mt-16 mb-20 bg-red-500 px-2 py-2 hover:bg-red-600 text-white rounded-full">
                                    Randomize
                                </button>
                            </div>
                        </form>
                    </div>
                    <Example/>
                </>
            )}
        </>
    );
    
}

export default Header;