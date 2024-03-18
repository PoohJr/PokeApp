import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {SearchIcon} from "@heroicons/vue/outline";

export function Header() {
    const [userInput, setUserInput] = useState("");
    const [pokedata, setpokeData] = useState(null);
    const [newerror, setNewError] = useState(null);
    const navigate = useNavigate();

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
            <div className="flex w-100 h-screen ">
                <form className=" flex flex-col w-full">
                    <div className="text-center justify-center items-center h-3/4">
                        <h1 className="text-9xl mt-28">PokeMon</h1>
                        <SearchIcon className ="w-5 h-5"/>
                        <input
                            className="mt-14 px-3 py-2 font-semibold placeholder-grey-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                            id="in"
                            onChange={(e) => setUserInput(e.target.value)}
                            type="text"
                            placeholder="Choose Your Pokemon!"
                            autoComplete="off"
                            aria-label="Search Pokemon"
                        />
                        <button
                            className=""
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                        <br />
                        <button 
                        className="mt-16">
                            Randomize
                            </button>
                    </div>
                </form>



            </div>
        </>
    );
}

export default Header;