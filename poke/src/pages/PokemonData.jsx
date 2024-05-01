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
    const [evoPoke, setevoPoke] = useState (null)
    const [movedata, setmovedata] = useState([])
    const [strongAgainst, setstrongAgainst] = useState ([])

    // useEffect(() =>{
    //     const FetchAllDataUrl = async () =>{

    //     }
    // },[pokedata])
    // This a work around to work on all of them in one useeffect

    useEffect(() => {
        const handletypeLink = async() => {
            try{
                if(pokedata){
                    const typeurl = Promise.all(
                    pokedata.types.map(async(type) =>{
                        const res = await axios.get(type.type.url)
                        return res.data
                    })

                )
                    setstrongAgainst(typeurl)
                    console.log(typeurl)
                }
            } catch(error){
                console.error('Error fetching type Strength to data:', error);

            }
        }
        handletypeLink()
        
        
    },[pokedata])

    useEffect (() =>{
        const fetchMoveData = async () =>{
            try{
                if(pokedata && pokedata.moves){
                const moveDes = await Promise.all(
                    pokedata.moves.map(async (move) =>{
                        const UrlMoves = await axios.get(move.move.url) 
                        
                        return UrlMoves.data

                    })
                    
                )
                setmovedata(moveDes)
                console.log(moveDes)
            }
            } catch (error){
                console.error('Error fetching Move data:', error);

            }
        }
        fetchMoveData()
    },[pokedata])

    useEffect (()=> {
        const EvolutionApi = async () => {
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokedata.id}/`)
                setevoPoke(res.data)
                console.log(res.data)
                
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

    },[locationURL])
    

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
    function weightConver(hec){
        const eq = hec *  0.2204622622
        const fixedResults = eq.toFixed(1)+" lbs"
        return  fixedResults
        
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function heightConver(ht){
        const eq = ht * 0.3280839895
        const fixedResults = eq.toFixed(3) + "ft"
        return  fixedResults
        //Fix to be exact
    }

    function handleStrongto(i){

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
                return ["content-fire h-16 px-2", "content-flying h-16 px-2", "content-ice h-16 px-2", "content-psychic h-16 px-2"];
            case "poison":
                return ["content-ground h-16 px-2", "content-psychic h-16 px-2"]
            case "fire":
                return "Nothing Yet"
            case "normal":
                return "Nothing Yet"
            case "water":
                return "Nothing Yet"
            case "electric":
                return "Nothing Yet"
            case "ice":
                 return "Nothing Yet"
            case "fighting":
                 return "Nothing Yet"
            case "ground":
                 return "Nothing Yet"
            case "flying":
                return "Nothing Yet"
            case "psychic":
                return "Nothing Yet"
            case "bug":
                return "Nothing Yet"
            case "rock":
                return "Nothing Yet"
            case "ghost":
                return "Nothing Yet"
            case "dragon":
                return "Nothing Yet"
            case "dark":
                return "Nothing Yet"
            case "steel":
                return "Nothing Yet"
            case "fairy":
                return "Nothing Yet"
            default:
                return"No Weakness";
        }

    }
    function HandletypeColor(typename){
        switch(typename){
            case "grass":
                return "bg-[#7AC74C]"
            case "poison":
                return "bg-[#A33EA1] "
            case "fire":
                return "bg-[#EE8130] "
            case "normal":
                return "bg-[#A8A77A] "
            case "water":
                return "bg-[#6390F0] "
            case "electric":
                return "bg-[#F7D02C] "
            case "ice":
                 return "bg-[#96D9D6] "
            case "fighting":
                 return "bg-[#C22E28] "
            case "ground":
                 return "bg-[#E2BF65] "
            case "flying":
                return "bg-[#A98FF3] "
            case "psychic":
                return "bg-[#F95587] "
            case "bug":
                return "bg-[#A6B91A] "
            case "rock":
                return "bg-[#B6A136] "
            case "ghost":
                return "bg-[#735797] "
            case "dragon":
                return "bg-[#6F35FC] "
            case "dark":
                return "bg-[#705746] "
            case "steel":
                return "bg-[#B7B7CE] "
            case "fairy":
                return "bg-[#D685AD] "
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
                <h1>Add Something that takes up the top portation of the page that gors to thenrxt pokemon</h1>
            
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
                           

                                <div className="  mt-16 w-fit mr-auto ml-auto">
                                    <div className=" h-full  bg-slate-800 bo rounded-3xl border-8  ">
                                        <img className=" h-96 animate-bounce  " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png` } alt="Pokemon Image"/>
                                    </div>
                                </div>


                            <div className="">
                                <div className="pl-4 bg-slate-300">
                                    <h1 className=" text-center font-bold text-2xl">PokeMon #<span>{pokedata.id}</span></h1>
                                    <p className="font-bold">Height: {heightConver(pokedata.height)}</p>
                                    <p className="font-bold">Weight: {weightConver(pokedata.weight)}</p>
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

                    


                
                    
                        <div className=" mt-10 pb-4 bg-slate-200 flex flex-wrap">
                            
                            
                            
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

                        <div className="flex justify-around px-20 xl:px-1 pt-10 ">                     
                            <div className="max-h-[800px] overflow-y-auto overflow-x-hidden "> 
                                <p className=" mt-6 font-bold text-3xl  text-center">Pokemon Moves Overview </p>
                                    <table className="mt-2 table-auto min-w-full">
                                        <thead className="sticky top-0 bg-gray-300 p-10 z-10">
                                            <tr className="">
                                                <th className="px-4 border border-slate-600">Move</th>
                                                <th className="px-4 border border-slate-600">Type</th>
                                                <th className="px-4 border border-slate-600">Accuracy</th>
                                                <th className="px-4 border border-slate-600">Power</th>
                                                <th className="px-4 border border-slate-600">PP</th> 
                                            </tr>
                                        </thead>
                                            <tbody className="p-2">
                                                {pokedata.moves.map((move, index) => (
                                                <tr className=" rounded-md border-black border-2"  key={index}>
                                                    <td className="text-center">{capitalizeFirstLetter(move.move.name)}</td>
                                                    <td className="text-center">{movedata[index]?.type.name}</td>
                                                    <td className="text-center">{movedata[index]?.accuracy || "0"}</td>
                                                    <td className="text-center">{movedata[index]?.power || "0"}</td>
                                                    <td className="text-center">{movedata[index]?.pp || "0"}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                    </table>
                            </div>
                                    
                                    
                                
                            
                            {evoPoke && (
                                    <ul className="md-32 timeline timeline-vertical">
                                        <li>
                                            <p className="font-bold text-3xl  text-center">Evloutions </p>
                                            <div className="timeline-start">1st Evo</div>
                                            <div className="timeline-middle">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                                
                                            </div>
                                            <div className="timeline-end timeline-box">{capitalizeFirstLetter(pokedata.name)}</div>
                                            <hr/>
                                        </li>
                                        <div className="group outline flex justify-center align-middle h-52 w-52 bg-slate-500 mx-auto"> 
                                            <div className="group-hover:bg-orange-900 justify-center transition-all ease-in-out duration-300 outline hover:outline-offset-1">
                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png` } alt="Pokemon Image"/>
                                            </div>
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
                                                <div className=" group outline relative flex justify-center align-middle h-52 w-52 bg-slate-500 mx-auto">
                                                    <div className="group-hover:bg-orange-900 justify-center transition-all ease-in-out duration-300 outline hover:outline-offset-1">
                                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id + 1}.png` } alt="Pokemon Image"/>
                                                    </div>
                                                </div>
                                        <li>
                                            <hr/>
                                            <div className="timeline-start">3rd Evo</div>
                                            <div className="timeline-middle ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                            </div>
                                            <div className="timeline-end timeline-box">
                                                
                                                <p>{capitalizeFirstLetter(evoPoke.chain.evolves_to[0].evolves_to[0].species.name)}</p>
                                            </div>
                                            <hr/>
                                        </li>
                                                <div className="group relative flex justify-center align-middle h-52 w-52 bg-slate-500 mx-auto">
                                                    <div className="group-hover:bg-orange-900 justify-center transition-all ease-in-out duration-200 outline group-hover:outline-offset-4">
                                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id + 2}.png` } alt="Pokemon Image"/>
                                                    </div>
                                                </div>

                                    </ul>
                                )}

                        </div>
                                    
                </div>
                
            )}
           
        
        

        <div className="mt-10 bg-gray-700 rounded-3xl border-4 border-black overflow-x-auto outline-2 ">
            <div className="carousel w-auto h-60 divide-x divide-dashed ">
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white ">Front Default</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokedata.id}.png`} className="w-full"/>
                    <h1 className="text-white">Back Default</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white">Front Shiny</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${pokedata.id}.png`} className="w-full" />
                    <h1 className="text-white">Back Shiny</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokedata.id}.gif`} className="w-full" />
                    <h1 className="text-white">Back Shiny</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokedata.id}.gif`} className="w-full" />
                    <h1 className="text-white">Back Shiny</h1>
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