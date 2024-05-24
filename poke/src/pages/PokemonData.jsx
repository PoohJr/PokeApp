import React, { useEffect, useState, version } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


function PokemonData() {
    const location = useLocation();
    const pokedata = location.state?.pokedata ? location.state.pokedata : null;
    // console.log(location.state.pokedata)

    const locationURL = pokedata.location_area_encounters;


    const [encounterData, setencounterData] = useState ()
    const [abilityDes, setabilityDes] = useState([]);
    const [evoPoke, setevoPoke] = useState (null)
    const [movedata, setmovedata] = useState([])
    const [strongAgainst, setstrongAgainst] = useState ([])
    const [newevo , setnewevo] = useState(null)
    const [speciesEvo1, setspeciesEvo1] = useState(null)
    const [speciesEvo2, setspeciesEvo2] = useState(null)
    const [speciesEvo3, setspeciesEvo3] = useState(null)

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
                // console.log(moveDes)
            }
            } catch (error){
                console.error('Error fetching Move data:', error);

            }
        }
        fetchMoveData()
    },[pokedata])




    useEffect(() => {
        const Species = async () => {
            try{
                const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokedata.name}/`);
                setevoPoke(res.data)
                console.log(res.data)
              

            } catch (error){
                console.error('Error fetching Species Api data:', error);
            }

        }
        Species()

    },[pokedata.name])
   
  
    useEffect(() => {
        const fetchEvo = async () => {
            if (evoPoke && evoPoke.evolution_chain) {
            try{
                const res = await axios.get(evoPoke.evolution_chain.url)
                setnewevo(res.data)
                console.log(res.data);

                const Poke1url = res.data.chain.species.url
                const fetchPoke1 = await axios.get(Poke1url)
                setspeciesEvo1(fetchPoke1.data)
                console.log(fetchPoke1.data);

                    if( res.data.chain.evolves_to.length > 0) {
                    const Poke2url = res.data.chain.evolves_to[0].species.url
                    const fetchPoke2 = await axios.get(Poke2url)
                    setspeciesEvo2(fetchPoke2.data)
                    console.log(fetchPoke2.data);
                    }

                    if(res.data.chain.evolves_to[0].evolves_to.length > 0) {

                    const Poke3url = res.data.chain.evolves_to[0].evolves_to[0].species.url
                    const fetchPoke3 = await axios.get(Poke3url)
                    setspeciesEvo3(fetchPoke3.data)
                    console.log(fetchPoke3.data);
                }
                
            } catch(error){
                console.error("there was an" , error)
            }
            
        }
    }
        fetchEvo()


    },[evoPoke])


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
        if (!string) return '';
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
                return "bg-[#7AC74C] uppercase drop-shadow-lg before:content-grass "
            case "poison":
                return "bg-[#A33EA1] uppercase drop-shadow-lg before:content-poison "
            case "fire":
                return "bg-[#EE8130] uppercase drop-shadow-lg before:content-fire "
            case "normal":
                return "bg-[#A8A77A] uppercase drop-shadow-lg before:content-normal "
            case "water":
                return "bg-[#6390F0] uppercase drop-shadow-lg before:content-water "
            case "electric":
                return "bg-[#F7D02C] uppercase drop-shadow-lg before:content-electric "
            case "ice":
                 return "bg-[#96D9D6] uppercase drop-shadow-lg before:content-ice "
            case "fighting":
                 return "bg-[#C22E28] uppercase drop-shadow-lg before:content-fighting "
            case "ground":
                 return "bg-[#E2BF65] uppercase drop-shadow-lg before:content-ground "
            case "flying":
                return "bg-[#A98FF3] uppercase drop-shadow-lg before:content-flying "
            case "psychic":
                return "bg-[#F95587] uppercase drop-shadow-lg before:content-psychic "
            case "bug":
                return "bg-[#A6B91A] uppercase drop-shadow-lg before:content-bug "
            case "rock":
                return "bg-[#B6A136] uppercase drop-shadow-lg before:content-rock "
            case "ghost":
                return "bg-[#735797] uppercase drop-shadow-lg before:content-ghost "
            case "dragon":
                return "bg-[#6F35FC] uppercase drop-shadow-lg before:content-dragon "
            case "dark":
                return "bg-[#705746] uppercase drop-shadow-lg before:content-dark "
            case "steel":
                return "bg-[#B7B7CE] uppercase drop-shadow-lg before:content-steel "
            case "fairy":
                return "bg-[#D685AD] uppercase drop-shadow-lg before:content-fairy "
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
                return "text-[#7AC74C] "
            case "poison":
                return "text-[#A33EA1] "
            case "fire":
                return "text-[#EE8130] "
            case "normal":
                return "text-[#A8A77A] "
            case "water":
                return "text-[#6390F0] "
            case "electric":
                return "text-[#F7D02C] "
            case "ice":
                 return "text-[#96D9D6] "
            case "fighting":
                 return "text-[#C22E28] "
            case "ground":
                 return "text-[#E2BF65] "
            case "flying":
                return "text-[#A98FF3] "
            case "psychic":
                return "text-[#F95587] "
            case "bug":
                return "text-[#A6B91A] "
            case "rock":
                return "text-[#B6A136] "
            case "ghost":
                return "text-[#735797] "
            case "dragon":
                return "text-[#6F35FC] "
            case "dark":
                return "text-[#705746] "
            case "steel":
                return "text-[#B7B7CE] "
            case "fairy":
                return "text-[#D685AD] "
        }
    }


    function TypeImg(type) {
        switch(type) {
            case "grass":
                return " content-grass ";
            case "poison":
                return " content-poison ";
            case "bug":
                return "content-bug";
            default:
                return ""; 
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

        function ColorVersion(version) {
            switch(version){
                case 'red':
                    return 'text-red-600'
                case 'green':
                    return 'text-green-600'
                case 'yellow':
                    return 'text-yellow-500'
                case 'blue':
                    return 'text-blue-600'
                case 'firered':
                    return 'text-red-900'
                case 'leafgreen':
                    return 'text-green-900'
                case 'heartgold':
                    return 'text-orange-600'
                case 'soulsilver':
                    return 'text-gray-600'
                case 'x':
                    return 'text-cyan-400'
                case 'y':
                    return 'text-slate-700'
                case 'ultra-sun':
                    return 'text-orange-800'
                case 'ultra-moon':
                    return 'text-sky-600'
                case 'platinum':
                        return 'text-slate-400'
                case 'ruby':
                    return 'text-[#E0115F]'
                case 'sapphire':
                    return 'text-[#0F52BA]'
                case 'emerald':
                    return 'text-[#028f1e]'
                case 'diamond':
                    return 'text-[#B9F2FF]';
                case 'pearl':
                    return 'text-[#966FD6]';
                case 'gold':
                    return 'text-[#FFD700]';
                case 'crystal':
                    return 'text-[#a7d8de]';
                case 'sun':
                    return 'text-[#FCE570]';
                case 'moon':
                    return 'text-[#9400d3]';
                case 'silver':
                    return 'text-[#c0c0c0]'
                case 'black':
                    return 'text-[#888B8D]'
                case 'black-2':
                    return 'text-[#888B8D]'
                case 'white':
                    return 'text-[#d3d3d3]'
                case 'white-2':
                    return 'text-[#d3d3d3]'

                default:
                    return ""

            }
            
        }

    return ( 
    
        <div className=" relative p-10 bg-pokemon-rep" > {/* div 1*/}
        <div className="w-full h-full bg-pokemon-rep bg-repeat blur-sm"></div>
             
            {pokedata && (
                <div className="">   {/* div 2*/}
                
            
                    <div className="flex justify-center mt-6 rounded-2xl bg-white border-black border-4 mx-auto w-3/4 px-10">
                        <h2 className="font-sans my-auto txt-blacks text-5xl font-semibold">{capitalizeFirstLetter(pokedata.name)}</h2>
                            <svg className="cursor-pointer mt-5" onClick={Playaudio} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485 485" width="20" height="20">
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
                            <li key={index} className={` ${TypeColor(type.type.name)} cursor-pointer font align-middle mx-3 p-4 my-3 w-20 text-white rounded-sm h-24 font-semibold text-md `}>
                                <span className="flex justify-center">{type.type.name}</span>
                            </li>
                                        ))}
                        </ul>
                    </div>
                    
                   
                <div className="flex justify-center">
                    <div className="flex justify-between">
                        
                         <div className= "flex flex-col bg-white border-black border-4 p-10 mt-5 w-full rounded-2xl">
                           

                                <div className="  mt-4 w-fit mr-auto ml-auto">
                                    <div className=" h-full mt-[-25px] bg-slate-800 bo rounded-3xl border-8 border-red-600 ">
                                        <img className=" h-96 animate-bounce  " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png` } alt="Pokemon Image"/>
                                    </div>
                                </div>


                            <div className="mt-4">
                                <div className="pl-4 py-2 bg-white rounded-2xl border-red-600 border-2">
                                    <h1 className=" text-center font-bold text-3xl">PokeMon #<span>{pokedata.id}</span></h1>
                                    <p className=" font-bold text-xl">Height: {heightConver(pokedata.height)}</p>
                                    <p className="font-bold text-xl">Weight: {weightConver(pokedata.weight)}</p>
                                </div>
                            </div>


                                    <div className="">
                                        <p className="mt-6 font-bold text-3xl  text-center">Abilities</p>

                                        <ul>
                                            {abilityDes.map((ability, index) => (
                                                <div key={index} className="mt-6 overflow-x-auto bg-white border-red-600 border-2">
                                                    <table className="table-md ">
                                                        <thead className=""> 
                                                            <tr className=" flex justify-evenly">
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr>
                                                            <th className="text-xl">Name:</th>
                                                            <td className="text-red-600 text-xl">{capitalizeFirstLetter(ability.name)}</td>
                                                        </tr>
                                                                                        
                                                        <tr>
                                                        <th className="text-xl">Description:</th>
                                                            <td className="text-lg">{ability.description}</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                </div>
                                            ))}
                                        </ul> 
                                    </div>  
                                    
                                    
                        </div>
                     </div>
                </div>
                {console.log(pokedata)} 
                {encounterData && encounterData.length > 0 && (
    <div className="max-h-[1000px] overflow-auto border-4 border-black rounded-lg my-4  bg-slate-500 ">
        <h1 className="py-4 font-bold text-3xl text-center text-white ">Pokemon Locations</h1>
        <div className="bg-white">
            {encounterData.map((encounter, encounterIndex) => (
               
                <div key={encounterIndex} className=" px-5 py-1">
                    {encounter.version_details.map((versionDetail, versionIndex) => (
                        <div className="border-b-2 border-black py-1" key={versionIndex}>
                            <p className="font-bold">Version: <span className={`${ColorVersion(versionDetail.version.name)}`}>{capitalizeFirstLetter(versionDetail.version.name)}</span></p>
                            <p className="">Location Area: <span>{capitalizeFirstLetter(encounter.location_area.name)}</span></p>
                            {versionDetail.encounter_details.map((detail, detailIndex) => (
                                <div key={detailIndex}>
                                    {console.log(detail)}
                                    <p className="">Chances of Encountering: <span>{detail.chance}%</span></p>
                                    <p className="">Max Level: <span>{detail.max_level}Lv</span></p>
                                    <p className="">Min Level: <span>{detail.min_level}Lv</span></p>
                                    <p className="">Method: <span>{capitalizeFirstLetter(detail.method.name)}</span></p>
                                </div>
                            ))}
                            <p className="">Max Chance: <span>{versionDetail.max_chance}%</span></p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
)}


          


                                    
                    <div className="flex justify-center items-center h-auto">
                        <div className=" flex flex-col items-center my-10 pb-4 rounded-xl bg-white border-4 border-black w-1/2">
                                <div className=" mt-3 justify-center bg-white h-20 w-28">
                                    <p className="mt-6 font-bold text-3xl text-center text-black">Stats</p>
                                </div>
                                    <ul className="flex flex-col  space-y-3 w-60 p-1 border-4 border-red-600  mb-5">
                                        {pokedata.stats.map((stat, index) => (   
                                        <div key={index} className="">
                                            <strong className="" >
                                                {capitalizeFirstLetter(stat.stat.name )}
                                            </strong> 

                                                <strong className="ml-2">{stat.base_stat}%</strong>
                                                <progress className={`progress w-56 mt-2" ${getColorClass(stat.stat.name)} `}
                                                value={stat.base_stat} 
                                                max="200">
                                                </progress>
                                        </div>
                                            ))}
                                    </ul> 
                        </div>
                    </div>
                            {/* i changed the sm vp now chaange other while i style the tabke cuz it looks wack asf */}
                        <div className=" lg:flex justify-around px-20  xl:px-1 pt-10 py-10 bg-white border-4 border-black rounded-xl">                     
                            <div className=" max-h-[910px] sm:mb-5 overflow-y-auto overflow-x sm-w-[400px] border-black border-8"> 
                                <p className="font-bold  text-3xl  text-center text-white bg-black py-3">Pokemon Moves Overview </p>
                                    <table className="table-auto min-w-full bg-zinc-900">
                                        <thead className="sticky top-0 z-10 ">
                                            <tr className="">
                                                <th className="px-4 bg-[#D9CD45] text-white">Move</th>
                                                <th className="px-4 bg-[#D94575] text-white">Type</th>
                                                <th className="px-4 bg-[#46B9DA] text-white">Accuracy</th>
                                                <th className="px-4 bg-[#EE5E38] text-white">Power</th>
                                                <th className="px-4 bg-[#E9C4D4] text-white">PP</th> 
                                            </tr>
                                        </thead>
                                            <tbody className="">
                                                {pokedata.moves.map((move, index) => (
                                                <tr className=" border-b-2"  key={index}>
                                                    <td className=" text-center  text-white font-semibold">{capitalizeFirstLetter(move.move.name)}</td>
                                                    {/* <td className=" text-center  text-white font-semibold">{capitalizeFirstLetter(move.move.effect_entries[index].effect)}</td> */}
                                                    <td className={` ${HandletypeColor(movedata[index]?.type.name)}text-center font-semibold`}>{capitalizeFirstLetter(movedata[index]?.type.name)}</td>
                                                    <td className="text-center font-semibold text-white">{movedata[index]?.accuracy || "0"}</td>
                                                    <td className="text-center text-white font-semibold">{movedata[index]?.power || "0"}</td>
                                                    <td className="text-center text-white font-semibold">{movedata[index]?.pp || "0"}</td>
                                                </tr>
                                                ))}
                                            </tbody>
                                    </table>
                            </div>
                                    
                                    
          
                            
                            {newevo && (
                                    
                                    <ul className="md-32 timeline timeline-vertical">
                                        <li>
                                            <p className="font-bold text-3xl  text-center mb-4">Evloutions </p>
                                            <div className="timeline-start">1st Evo</div>
                                            <div className="timeline-middle">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                                
                                            </div>
                                            <div className="timeline-end timeline-box">{capitalizeFirstLetter(newevo.chain.species.name)}</div>
                                            <hr/>
                                        </li>
                                        <div className="transition-all ease-in-out group border hover:border-8 hover:border-black   flex justify-center align-middle h-60 w-52 rounded-full  bg-slate-800  hover:bg-red-500 mx-auto"> 
                                            <div className=" group-hover:shadow-blue-500/40 justify-center transition-all ease-in-out duration-200 ">
                                                {speciesEvo1 &&(
                                                <img className="pt-3 transition-all ease-in-out duration-200 hover:rotate-12 hover:scale-125 " src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesEvo1.id}.png` } alt="Pokemon Image"/>
                                            )}
                                            </div>
                                        </div>
                                        {speciesEvo2 && (
                                            <>
                                        
                                        <li>
                                            <hr/>
                                            <div className="timeline-start">2nd Evo</div>
                                            <div className="timeline-middle">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                            </div>
                                            <div className="timeline-end timeline-box">    
                                           
                                            <p>{capitalizeFirstLetter(speciesEvo2.name)}</p>
                                    
                                            </div>
                                            <hr/>
                                        </li>

                                        
                                       
                                                <div className=" transition-all ease-in-out group border hover:border-8 hover:border-black   flex justify-center align-middle h-60 w-52 rounded-full  bg-slate-800  hover:bg-red-500 mx-auto">
                                                    <div className="group-hover:shadow-blue-500/40 justify-center transition-all ease-in-out duration-200 ">
                                                        

                                                        <img className="pt-3 transition-all ease-in-out duration-200 hover:rotate-12 hover:scale-125" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesEvo2.id}.png` } alt="Pokemon Image"/>
                                                   
                                                    </div>
                                                </div>
                                                </>
                                                )}
                                        
                                        {speciesEvo3 && (
                                            <>
                                        <li>
                                            <hr/>
                                            <div className="timeline-start">3rd Evo</div>
                                            <div className="timeline-middle ">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                            </div>
                                            <div className="timeline-end timeline-box">
                                                
                                                <p>{capitalizeFirstLetter(speciesEvo3.name)}</p>
                                            </div>
                                            <hr/>
                                        </li>
                                                <div className="transition-all ease-in-out group border hover:border-8 hover:border-black   flex justify-center align-middle h-60 w-52 rounded-full  bg-slate-800  hover:bg-red-500 mx-auto">
                                                    <div className="  group-hover:shadow-blue-500/40 justify-center transition-all ease-in-out duration-200">
                                                        
                                                            
                                                        <img className="pt-3 transition-all ease-in-out duration-200 hover:rotate-12 hover:scale-125" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${speciesEvo3.id}.png` } alt="Pokemon Image"/>
                                                   
                                                    </div>
                                                </div>
                                                </>
                                            )}

                                    </ul>
                                   
                                )}

                        </div>
                                    
                </div>
                
            )}
           
        
        
    <div className="flex justify-center">
        <div className="mt-16 mx-auto bg-gray-700 rounded-3xl border-4 border-black  overflow-y-auto outline-2 md:w-[1000px]  sm:w-[600px] p-2">
            <div className="carousel h-60 divide-x divide-dashed">
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
                    <h1 className="text-white">ShowDown Front</h1>
                </div> 
                <div className="carousel-item w-1/3">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/back/${pokedata.id}.gif`} className="w-full" />
                    <h1 className="text-white">ShowDown Back</h1>
                </div>
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