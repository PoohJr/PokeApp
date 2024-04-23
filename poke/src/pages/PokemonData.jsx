import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


function PokemonData() {
    const location = useLocation();
    const pokedata = location.state ? location.state.pokedata : null;
    // console.log(location.state.pokedata)
    const locationURL = pokedata.location_area_encounters;


    const [encounterData, setencounterData] = useState ()
    // const [encounterChance, setencounterChance] = useState([])
    const [abilityDes, setabilityDes] = useState([]);
    const [evoPoke, setevoPoke] = useState ([])



    useEffect (()=> {
        const EvolutionApi = async () => {
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokedata.id}/`)
                const newData = res.data
                setevoPoke(newData)
                console.log(newData)
                
            } catch (error){
                console.error('Error fetching EvolutionApi data:', error);

            }
        }
        EvolutionApi()
    },[pokedata.id])

    useEffect(() => {
      const fetchData = async () => {
            try{
               const res =  await axios.get(locationURL)
               const data = res.data
               setencounterData(data)
 
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
                return "bg-[#7AC74C] uppercase drop-shadow-lg before:content-grass h-min"
            case "poison":
                return "bg-[#A33EA1] uppercase drop-shadow-lg before:content-poison h-min"
            case "fire":
                return "bg-[#EE8130] uppercase drop-shadow-lg before:content-fire h-min"
            case "normal":
                return "bg-[#A8A77A] uppercase drop-shadow-lg before:content-normal h-min"
            case "water":
                return "bg-[#6390F0] uppercase drop-shadow-lg before:content-water h-min"
            case "electric":
                return "bg-[#F7D02C] uppercase drop-shadow-lg before:content-electric h-min"
            case "ice":
                 return "bg-[#96D9D6] uppercase drop-shadow-lg before:content-ice h-min"
            case "fighting":
                 return "bg-[#C22E28] uppercase drop-shadow-lg before:content-fighting h-min"
            case "ground":
                 return "bg-[#E2BF65] uppercase drop-shadow-lg before:content-ground h-min"
            case "flying":
                return "bg-[#A98FF3] uppercase drop-shadow-lg before:content-flying h-min"
            case "psychic":
                return "bg-[#F95587] uppercase drop-shadow-lg before:content-psychic h-min"
            case "bug":
                return "bg-[#A6B91A] uppercase drop-shadow-lg before:content-bug h-min"
            case "rock":
                return "bg-[#B6A136] uppercase drop-shadow-lg before:content-rock h-min"
            case "ghost":
                return "bg-[#735797] uppercase drop-shadow-lg before:content-ghost h-min"
            case "dragon":
                return "bg-[#6F35FC] uppercase drop-shadow-lg before:content-dragon h-min"
            case "dark":
                return "bg-[#705746] uppercase drop-shadow-lg before:content-dark h-min"
            case "steel":
                return "bg-[#B7B7CE] uppercase drop-shadow-lg before:content-steel h-min"
            case "fairy":
                return "bg-[#D685AD] uppercase drop-shadow-lg before:content-fairy h-min"
        }
    }
    
    function Weakness(type){
        switch(type){
            case "grass":
                return "content-fire content-flying  content-ice content-psychic "
            case "poison":
                return "content-ground content-psychic"
            case "fire":
                return ""
            case "normal":
                return ""
            case "water":
                return ""
            case "electric":
                return ""
            case "ice":
                 return ""
            case "fighting":
                 return ""
            case "ground":
                 return ""
            case "flying":
                return ""
            case "psychic":
                return ""
            case "bug":
                return ""
            case "rock":
                return ""
            case "ghost":
                return ""
            case "dragon":
                return ""
            case "dark":
                return ""
            case "steel":
                return ""
            case "fairy":
                return ""
            default:
                return"No Weakness";
        }

    }

    

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
        <div className={" relative p-10 h-cover bg-white"}> {/* div 1*/}
             
            {pokedata && (
                <div className="">   {/* div 2*/}
                    <div className="flex justify-center mt-16">
                        <h2 className="font-sans text-black text-5xl font-semibold">{capitalizeFirstLetter(pokedata.name)}</h2>
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
                            <li key={index} className={`cursor-pointer font  align-middle mx-2 p-4 bg-lg h-14  text-white rounded-sm
                                ${TypeColor(type.type.name)}`}>
                                {type.type.name}
                            </li>
                                        ))}
                        </ul>
                    </div>

                    
                <div className="flex justify-center">
                    <div className="flex justify-between">
                        
                         <div className= "flex flex-col bg-slate-200 p-10 mt-5 w-full">
                            <h1 className=" text-center font-bold text-2xl">PokeMon ID #<span>{pokedata.id}</span></h1>

                                <div className="  mt-16 w-fit mr-auto ml-auto">
                                    <div className=" h-full  bg-slate-800 bo rounded-3xl border-8  ">
                                        <img className=" h-96 animate-bounce  " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png` } alt="Pokemon Image"/>
                                    </div>
                                </div>
                                    <div className="">
                                        <p className="mt-6 font-bold text-3xl  text-center">Abilities</p>

                                        <ul>
                                            {abilityDes.map((ability, index) => (
                                                <div key={index} className="mt-6 overflow-x-auto bg-slate-300">
                                                    <table className="table-md ">
                                                        <thead className=""> 
                                                            <tr className=" flex justify-evenly">
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <th>Name:</th>
                                                            <td>{capitalizeFirstLetter(ability.name)}</td>
                                                        </tr>
                                                                                        
                                                        <tr>
                                                        <th>Description:</th>
                                                            <td className="">{ability.description}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                </div>
                                            ))}
                                        </ul> 
                                    </div>  

                                        <div className=" bg">
                                          <h1 className="mt-6 font-bold text-3xl text-center">PokeMon Locations</h1>
                                        <div className="bg-slate-300">
                                            {encounterData && encounterData.map((encounter, index) => (
                                                <div key={index} className=" pt-2 px-5">
                                                    <p className="">Verson: {capitalizeFirstLetter(encounter.version_details[0].version.name)}</p>
                                                    <p>Location Area:{encounter.location_area.name}</p>
                                                    <p> Chance: {encounter.version_details[0].encounter_details[0].chance}%</p>
                                                    <p>Max Level: {encounter.version_details[0].encounter_details[0].max_level}Lv</p>
                                                    <p>Max Chance: {encounter.version_details[0].max_chance}%</p>
                                                    <p> Method: {encounter.version_details[0].encounter_details[0].method.name}</p>
                                                    
                                                </div>
                                            ))}
                                        </div>      
                                    </div>
                        </div>
                     </div>
                </div>

  

                    <div className="bg-slate-200 mt-4 flex">
                        <div className="justify-center text-center">
                          <h1 className="  mt-6 font-bold text-3xl text-center">Weak to </h1>
                           {/* IN here write cause inside the link it gives you the weakness and the good against */}
                            <ul>
                                {pokedata.types.map((type , index) =>(
                                    <li key={index} >
                                        <h1 className={` p-4 ${Weakness(type.type.name)}`} > b</h1>
                                        <h1>{type.type.url}</h1>
                                    </li>
                                ))}
                            </ul>
                               
                          
                        </div>

                    </div>
                    
                
                    
                        <div className="mt-10 pb-4 bg-slate-200 flex flex-wrap">
                            <div className=" pl-4">
                                <p className="font-bold">Height: {pokedata.height}</p>
                                <p className="font-bold">Weight: {pokedata.weight}</p>
                            </div>
                            
                            
                                <div className="">
                                    <p className="font-bold h-12 ">Stats:</p>
                                </div>
                                    <ul className="w-60">
                                        {pokedata.stats.map((stat, index) => (   
                                        <div key={index} className="bg">
                                            <strong className="" >
                                                {capitalizeFirstLetter(stat.stat.name )}
                                                </strong>  <strong className="ml-4">{stat.base_stat}%</strong>
                                                <progress className={`progress w-56 mt-2" ${getColorClass(stat.stat.name)} `}
                                                value={stat.base_stat} 
                                                max="200">
                                                </progress>
                                        </div>
                                            ))}
                                    </ul> 
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
                    <div className="timeline-start">1st Evo</div>
                    <div className="timeline-middle">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        
                    </div>
                    <div className="timeline-end timeline-box">{capitalizeFirstLetter(pokedata.name)}</div>
                    <hr/>
                </li>
                <div className="flex justify-center align-middle h-52 w-52 bg-black mr-auto ml-auto">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`}/>
                </div>
                <li>
                    <hr/>
                    <div className="timeline-start">2nd Evo</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box">
                        <p>{capitalizeFirstLetter(evoPoke.chain.evolves_to[0].species.name)}</p>
                    </div>
                    <hr/>
                </li>
                        <div className="flex justify-center align-middle h-52 w-52 bg-black mr-auto ml-auto">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`}/>
                        </div>
                <li>
                    <hr/>
                    <div className="timeline-start">2001</div>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end timeline-box"></div>
                    <hr/>
                </li>
                        <div className="flex justify-center align-middle h-52 w-52 bg-black mr-auto ml-auto">
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`}/>
                        </div>

            </ul>

        <div className="bg-black rounded">
            <div className="carousel rounded-box w-auto">
                <div className="carousel-item w-1/2">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white">Front Default</h1>
                </div> 
                <div className="carousel-item w-1/2">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokedata.id}.png`} className="w-full"/>
                    <h1 className="text-white">Back Default</h1>
                </div> 
                <div className="carousel-item w-1/2">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white">Front Shiny</h1>
                </div> 
                <div className="carousel-item w-1/2">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white">Back Shiny</h1>
                </div> 
                <div className="carousel-item w-1/2">
                    <img src={`https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg`} className="w-full" />
                </div> 
                <div className="carousel-item w-1/2">
                    <img src={`https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg`} className="w-full" />
                </div>
            </div>
        </div>

           
        </div> // end of 1 div
        
);

}

// did is might be to gte the evelotion of the pokemon fetch (`https://pokeapi.co/api/v2/evolution-chain/1/`)
export default PokemonData;

// https://github.com/PokeAPI/pokeapi/issues/387 for poke hieght and weight 

// https://www.polygon.com/pokemon-go-guide/22554033/type-chart-strengths-weaknesses-super-effective
// and this is for when i am going to add whats its good against and weak against 