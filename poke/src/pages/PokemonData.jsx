import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


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
               console.log(encounterData)
                
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
                return "bg-[#7AC74C] uppercase "
            case "poison":
                return "bg-[#A33EA1] uppercase "
            case "fire":
                return "bg-[#EE8130] uppercase "
            case "normal":
                return "bg-[#A8A77A] uppercase "
            case "water":
                return "bg-[#6390F0] uppercase "
            case "electric":
                return "bg-[#F7D02C] uppercase "
            case "ice":
                 return "bg-[#96D9D6] uppercase "
            case "fighting":
                 return "bg-[#C22E28] uppercase "
            case "ground":
                 return "bg-[#E2BF65] uppercase "
            case "flying":
                return "bg-[#A98FF3] uppercase "
            case "psychic":
                return "bg-[#F95587] uppercase "
            case "bug":
                return "bg-[#A6B91A] uppercase "
            case "rock":
                return "bg-[#B6A136] uppercase "
            case "ghost":
                return "bg-[#735797] uppercase "
            case "dragon":
                return "bg-[#6F35FC] uppercase "
            case "dark":
                return "bg-[#705746] uppercase "
            case "steel":
                return "bg-[#B7B7CE] uppercase "
            case "fairy":
                return "bg-[#D685AD] uppercase "
        }
    }

        // function Progressbar(item, base ){
        
        // switch (item){
        //     case "hp":
        //     return (
        //         <>
        // <div className="flex justify-between mb-4">
        //     <span className={`bg-base font-medium bg-red-700`}>{item}:</span>
        //     <span className="bg-sm font-medium bg-red-700">{base}%</span>
        // </div>   
        //         </>
        //     );
        //     case "defense":
        //         return (
        //             <>
        //     <div className="flex justify-between mb-4 w-96">
        //         <div className="w-48">
        //         <span className={`bg-base font-medium `}>{item}:</span>
        //         <div className="w-20 bg-blue-700"></div>
        //         <span className="bg-sm font-medium ">{base}%</span>
        //         <div className="bg-blue-700"></div>
        //         </div>
        //     </div>   
        //             </>
        //         );
        //     default:
        //         return null;
        // }
   

       
        // }

        function getColorClass(statName){
            switch (statName){
                case 'hp':
            return 'progress-error';
                case 'attack':
            return 'progress-secondary';
                case 'defense':
            return 'progress-info';
                case 'special-attack':
            return 'progress-warning';
                case 'special-defense':
            return 'progress-accent';
                case 'speed':
            return 'progress-success';
            }
        }
    
    return (
        <div className="p-10 h-screen "> {/* div 1*/}
             
            {pokedata && (
                <div className="">   {/* div 2*/}
                    <div className="flex justify-center mt-16">
                        <h2 className="font-sans  text-5xl font-semibold">{capitalizeFirstLetter(pokedata.name)}</h2>
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
                                            <li key={index} className={`"  before:content-grass font  align-middle mx-2 p-4 bg-lg h-14  text-white rounded-sm" ${TypeColor(type.type.name)}`}>
                                                {type.type.name}
                                            </li>
                                        ))}
                                    </ul>
                    </div>

                    
                                            
                    <div className="flex flex-col justify-between mr-auto ">
                        <h1 className="font-bold text-4xl">PokeMon # <span>{pokedata.id}</span></h1>
                            <div className="">
                                    <p className="mt-14 font-bold text-3xl">Abilities:</p>

                                    <ul>
                                        {abilityDes.map((ability, index) => (
                                            <div key={index} className="overflow-x-auto ">
                                                <table className="table-md ">
                                                    <thead className=""> 
                                                        <tr className=" flex justify-evenly">
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td>{capitalizeFirstLetter(ability.name)}</td>
                                                    </tr>
                                                                                      
                                                    <tr>
                                                    <th>Description</th>
                                                        <td className="">{ability.description}</td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                            </div>
                                        ))}
                                    </ul>   
                        </div>


   
                    <div className="">
                        {encounterData && encounterData.map((encounter, index) => (
                            <p key={index}>Where To Find em, in {encounter.location_area.name}</p>
                        ))}
                    </div> 

  
                    <div className="ml-auto bg-black">
                        <img className="h-96 animate-bounce " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} alt="Pokemon Image"/>
                    </div>
                </div>

                    
                
                    
                        <div className="">
                                <p className="font-bold">Height: {pokedata.height}</p>
                                <p className="font-bold">Weight: {pokedata.weight}</p>
                            
                            <div className="flex">
                                <p className="font-bold h-12 ">Stats:</p>
                                <div className="">
                                    <ul className="w-60">
                                        {pokedata.stats.map((stat, index) => (
                                            
                                        
                                            <strong className="" key={index}>
                                                {capitalizeFirstLetter(stat.stat.name )}

                                                <progress className={`progress w-56 mt-2" ${getColorClass(stat.stat.name)} `}value={stat.base_stat} max="200"></progress>
                                                
                                                
                                            </strong>    
                                            
                                            ))}
                                    </ul> 
                                </div>
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
            <ul className="timeline timeline-vertical">
                <li>
                    <div className="timeline-start">1984</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">First Macintosh computer</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start">1998</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">iMac</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start">2001</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">iPod</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start">2007</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">iPhone</div>
                    <hr/>
                </li>
                <li>
                    <hr/>
                    <div className="timeline-start">2015</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">Apple Watch</div>
                </li>
            </ul>
        </div> // end of 1 div
        
);

}

// did is might be to gte the evelotion of the pokemon fetch (`https://pokeapi.co/api/v2/evolution-chain/1/`)
export default PokemonData;

// https://github.com/PokeAPI/pokeapi/issues/387 for poke hieght and weight 

// https://www.polygon.com/pokemon-go-guide/22554033/type-chart-strengths-weaknesses-super-effective
// and this is for when i am going to add whats its good against and weak against 