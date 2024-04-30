import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Example from "../Example/Example";
import Preloader from "../Loader/Preloader";

export function Header() {
    const [userInput, setUserInput] = useState("");
    const [pokedata, setpokeData] = useState(null);
    const [newerror, setNewError] = useState(false);
    const [loading, setloading] = useState(true)
    const navigate = useNavigate();
    const [inputerror, setinputerror] = useState(false)
    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setloading(false);
          }, 100);

          return () => clearTimeout(timeout);
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${userInput.toLowerCase()}`;
            const res = await axios.get(apiUrl);
            if (res.status === 200) {
                setpokeData(res.data);
                navigate("./PokemonData", {state: {pokedata: res.data} });
            } 
        } catch (error) {
            console.error("Error Fetching Api", error);
            setNewError("Error Fetching Api: " + error.message);
            handleError()
            
        }
        
    };

     function handleError(){
            setUserInput("")
            return "border-2 border-rose-500"
        
    }



    return (
        <>
            {loading ? (
                <Preloader/>
            ) : (
                <>
                    <div className="relative bg-cover   z-0 bg-black" >
                        <div className="flex w-full h-3/5 bg-[url('/bg-img/pokemon-in-the-wild.png)]">
                            <form className="flex flex-col w-full">
                                <div className="text-center justify-center items-center mt-28 h-3/4">
                                    <h1 className="text-9xl text-white font-extrabold">PokeMon</h1>
                                    <input
                                        className={`mt-16 mb-10 px-3 py-2 font-semibold placeholder-grey-500 
                                        text-black rounded-2xl border-none ring-2 ring-gray-300 
                                        focus:ring-gray-500 focus:ring-2 
                                        align-middle
                                        ${() => handleError() }`}
                                        id="in"
                                        onChange={(e) => setUserInput(e.target.value)}
                                        type="text"
                                        placeholder="Choose Your Pokemon!" 
                                        autoComplete="off"
                                        aria-label="Search Pokemon"
                                        style={{ borderColor: newerror ? 'red' : 'initial'}}
                                    />
                                    <button
                                    type="submit"
                                        className="hidden"
                                        onClick={handleSubmit}>
                                        Search
                                    </button>
                                    <br />

                                    
                                </div>
                            </form>
                        </div>
                       
                        <Example setpokeData={setpokeData} pokedata ={pokedata}/>
                    </div>

                    
                </>
            )}
        </>
    );
    
}

export default Header;