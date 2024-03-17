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

    return (
        <div>
            {pokedata && (
                <div>
                    <h2 className="text-red-400">Name: {pokedata.name}</h2>
                    <p>Poke#: {pokedata.id}</p>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} alt="Pokemon Image"/>
                    <p>Type:</p>
                        <ul>
                             {pokedata.types.map((type, index) => (
                                <li key={index}>{type.type.name}</li>
                             ))}
                        </ul>
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

                    <p>Stats: </p>
                    <ul>
                        {pokedata.stats.map((stat, index) => (
                            <li key={index}>{stat.stat.name} {stat.base_stat}</li>
                            ))}
                    </ul>   

                    <p>Abilitlies:</p>
                    <ul>
                        {pokedata.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>

                    
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