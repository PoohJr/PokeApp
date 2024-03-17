import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './Header.css';

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
                console.log(res.data);
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
            <div className="container">
                <form>
                    <div className="display">
                        <h1 className="heading-text">PokeMon</h1>
                        <input
                            id="in"
                            onChange={(e) => setUserInput(e.target.value)}
                            type="text"
                            placeholder="Choose Your Pokemon!"
                        />
                        <button
                            className="bg-blue-500"
                            onClick={handleSubmit}
                        >
                            Search
                        </button>
                        <br />
                        <button className="random">Randomize</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Header;