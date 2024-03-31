import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Abilitydes from "../AbilityFold/Abilitydes";

function PokemonData() {
    const location = useLocation();
    const pokedata = location.state ? location.state.pokedata : null;
    console.log(location.state.pokedata)
    const locationURL = pokedata.location_area_encounters;


    const [encounterData, setencounterData] = useState ()
    const [abilityDes, setabilityDes] = useState([]);



    useEffect(() => {
      const fetchData = async () => {
            try{
               const res =  await axios.get(locationURL)
               const data = res.data
               setencounterData(data)
               console.log(data)
                
            } catch (error){
                console.error('Error fetching encounters data:', error);

            }
        }
        fetchData()

    },[])


    async function CallApi(url){
        try {   
            const res = await axios.get(url);
            const name = "en";
            return res.data.effect_entries.find(entry => entry.language.name === name).effect;
        } catch(error) {
            console.error(error + " this is the error");
        }
    }

    useEffect(() => {
        async function fetchAbilityData() {
            if (pokedata) {
                const abilitiesWithDetails = await Promise.all(
                    pokedata.abilities.map(async (ability) => {
                        const description = await CallApi(ability.ability.url);
                        return {
                            name: ability.ability.name,
                            description: description
                        };
                    })
                );
                setabilityDes(abilitiesWithDetails);
            }
        }

        fetchAbilityData();
    }, [pokedata]);


    const Playaudio = () => { 
        if(pokedata){
        new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokedata.id}.ogg`).play()
        }
    }
    function weightConver(){

    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function heightConver(){
    }

        function TypeColor(typename){
        switch(typename){
            case "grass":
                return "bg-[#7AC74C]"
            case "poison":
                return "bg-[#A33EA1]"
            case "fire":
                return "bg-[#EE8130]"
            case "normal":
                return "bg-[#A8A77A]"
            case "water":
                return "bg-[#6390F0]"
            case "electric":
                return "bg-[#F7D02C]"
            case "ice":
                 return "bg-[#96D9D6]"
            case "fighting":
                 return "bg-[#C22E28]"
            case "ground":
                 return "bg-[#E2BF65]"
            case "flying":
                return "bg-[#A98FF3]"
            case "psychic":
                return "bg-[#F95587]"
            case "bug":
                return "bg-[#A6B91A]"
            case "rock":
                return "bg-[#B6A136]"
            case "ghost":
                return "bg-[#735797]"
            case "dragon":
                return "bg-[#6F35FC]"
            case "dark":
                return "bg-[#705746]"
            case "steel":
                return "bg-[#B7B7CE]"
            case "fairy":
                return "bg-[#D685AD]"
        }
    }

        function Progressbar(item, base ){
        
        switch (item){
            case "hp":
            return (
                <>
        <div className="flex justify-between mb-4">
            <span className={`bg-base font-medium bg-red-700`}>{item}:</span>
            <span className="bg-sm font-medium bg-red-700">{base}%</span>
        </div>   
                </>
            );
            case "defense":
                return (
                    <>
            <div className="flex justify-between mb-4 w-96">
                <div className="w-48">
                <span className={`bg-base font-medium `}>{item}:</span>
                <div className="w-20 bg-blue-700"></div>
                <span className="bg-sm font-medium ">{base}%</span>
                <div className="bg-blue-700"></div>
                </div>
            </div>   
                    </>
                );
            default:
                return null;
        }
        // <div className="flex justify-between mb-1">
        //     <span className={`bg-base font-medium bg-black-700 dark:bg-white`}>{item}</span>
        //     <span className="bg-sm font-medium bg-{}-700 dark:bg-white">{item}</span>
        // </div>        

       
        }
    
    return (
        <div className="p-10 h-screen ">
        
            {pokedata && (
                <div className="">
                    <div className="flex  mt-16">
                        <h2 className="font-sans text-5xl font-semibold">{capitalizeFirstLetter(pokedata.name)}</h2>
                        <svg className="cursor-pointer" onClick={Playaudio} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" width="20" height="20">
                            <path fill="#000000" d="M282.5,55.15c-33.5,0-66.3,8.9-95,25.8c-25.6,15.1-47.3,36.1-63.2,61.1H52.7c-29.1,0-52.7,23.6-52.7,52.7v95.5
                                c0,29.1,23.6,52.7,52.7,52.7h71.6c15.9,25,37.6,46,63.2,61.1c28.7,16.9,61.5,25.8,95,25.8c7.5,0,13.5-6,13.5-13.5V68.65
                                C296,61.25,290,55.15,282.5,55.15z M118.4,315.95H52.7c-14.2,0-25.7-11.5-25.7-25.7v-95.5c0-14.2,11.5-25.7,25.7-25.7h65.7V315.95
                                z M269,402.35c-50.7-4.3-96.9-32.8-123.6-76.6v-166.4c26.7-43.8,72.9-72.3,123.6-76.6V402.35z"/>
                            <path fill="#000000" d="M348.9,137.95c-6.1-4.3-14.5-2.8-18.8,3.4c-4.3,6.1-2.8,14.5,3.4,18.8c27,18.8,43.1,49.7,43.1,82.5s-16.1,63.7-43.1,82.5
                                c-6.1,4.3-7.6,12.7-3.4,18.8c2.6,3.8,6.8,5.8,11.1,5.8c2.7,0,5.4-0.8,7.7-2.4c34.2-23.9,54.7-63,54.7-104.6
                                S383.1,161.75,348.9,137.95z"/>
                            <path fill="#000000" d="M401.1,82.05c-6.1-4.3-14.5-2.8-18.8,3.4c-4.3,6.1-2.8,14.5,3.4,18.8c45.3,31.6,72.3,83.3,72.3,138.3
                                s-27,106.8-72.3,138.3c-6.1,4.3-7.6,12.7-3.4,18.8c2.6,3.8,6.8,5.8,11.1,5.8c2.7,0,5.4-0.8,7.7-2.4
                                c52.5-36.6,83.9-96.6,83.9-160.5S453.7,118.65,401.1,82.05z"/>
                        </svg>



                        <ul className="flex">
                                        {pokedata.types.map((type, index) => (
                                            <li key={index} className={`"  before:content-grass align-middle mx-2 p-4 bg-lg h-14  text-white rounded-sm" ${TypeColor(type.type.name)}`}>
                                                {type.type.name}
                                            </li>
                                        ))}
                                    </ul>
                    </div>

                    <div className="flex rounded w-full mt-8">
  
  <div className="flex flex-col justify-between mr-auto">
    
    <p className="font-bold">PokeMon # <span>{pokedata.id}</span></p>
            <div className="">
                <p className="font-bold">Abilities:</p>
                <ul>
                    {abilityDes.map((ability, index) => (
                        <li key={index}>
                            <strong>{capitalizeFirstLetter(ability.name)}</strong>: {ability.description}
                        </li>
                    ))}
                </ul>
            </div>


   
    <div className="">
      {encounterData && encounterData.map((encounter, index) => (
        <div key={index} className="">
          <p>Where To Find em, in {encounter.location_area.name}</p>
        </div>
      ))}
    </div>
  </div>

  
  <div className="ml-auto">
    <img className="h-96" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} alt="Pokemon Image"/>
  </div>
</div>

                    
                
                    .
                <div className="">
                        <p className="font-bold">Height: {pokedata.height}</p>
                        <p className="font-bold">Weight: {pokedata.weight}</p>
                     
                    <div className="flex">
                        <p className="font-bold h-12 ">Stats:</p>
                            <ul className="w-60">
                                {pokedata.stats.map((stat, index) => (
                                    <li key={index}> 
                                    {Progressbar(stat.stat.name, stat.base_stat)}
                                            </li>
                                    
                                    ))}
                            </ul> 
                    </div>
                </div>

                            <div className="">                     
                            <p className="font-bold">Moves:</p>
                            <ul>
                                {pokedata.moves.map((move, index) => (
                                    <li key={index}>{move.move.name}</li>
                                    
                                ))}
                            </ul>
                        </div>

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