import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

// import { useLocation } from "react-router-dom";

function  Grass (){
    const [typeinfo, settypeinfo] = useState(null)
    const [newdata, setnewdata] = useState([])
    const [loading, setLoading] = useState(true);
    const [movedata, setmovedata] = useState([])
    const [pokeData, setnewpokedata] = useState([])
    

    const navigate = useNavigate();

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function englishText(movedata) {
        const name = "en";
        const englishEntry = movedata.data.flavor_text_entries.find(entry => entry.language.name === name);
        return <td className="text-center">{englishEntry ? englishEntry.flavor_text : "English text not found"}</td>;
    }
    


    useEffect(() =>  {
        const FetchType =  async() =>{
        try{
            // Change Type in axios
            const get = await axios.get("https://pokeapi.co/api/v2/type/grass/") 
            const res = get.data
            settypeinfo(res)
   

        } catch(error){
           console.log("error is " + error) 
            
            }
        }
        FetchType()
    },[])

    // this is for generation url
    useEffect(() => {
        const fetchurl = async () => {
            try { 
                    const fetchedpokemon = await Promise.all(
                        
                        typeinfo.pokemon.map(async (poke) => {
                            
                            const res = await axios.get(poke.pokemon.url);
                            return { data: res.data };
                        })
                    );
                    setnewdata(fetchedpokemon);
                   

            } catch (error) {
                console.error(error + " is the error");
            }
        };
    
        fetchurl();
    }, [typeinfo]);

    useEffect(() => {
        const fetchMoveurl = async () => {
            try { 
                    const fetchedpokemon = await Promise.all(
                        typeinfo.moves.map(async (move) => {
                            const res = await axios.get(move.url);
                            
                            return { data: res.data };
                        })
                    );
                    setmovedata(fetchedpokemon);
                    setLoading(false)
            } catch (error) {
                console.error(error + " is the error");
            }
        };
    
        fetchMoveurl();
        
       
    }, [typeinfo]);
    

    function PrevPage(){
        navigate("/")
    }

    function ToTypePage(type){
        const typeName = type.split('/')[0];
        navigate(`/${typeName}`);
    }

    // Fix this 
    const HandleClick = async (i) => {
    try {
        if (newdata && newdata[i] && newdata[i].data && newdata[i].data.id) {
            console.log('newdata:', newdata);
            console.log('Selected index:', i);
            console.log('Selected item:', newdata[i]);
            console.log('Selected item data:', newdata[i].data);
            console.log('Selected item data id:', newdata[i].data.id);

            const pokeid = newdata[i].data.id;
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokeid}`;
            console.log('API URL:', apiUrl);

            const res = await axios.get(apiUrl);
            if (res.status === 200) {
                const updatedPokeData = res.data;
                setnewpokedata(updatedPokeData);
                console.log('Fetched Pokémon data:', updatedPokeData);

                navigate("/ClickedType", { state: { pokeData: updatedPokeData } });
            }
        } else {
            console.error('Invalid newdata structure or index:', newdata, i);
        }
    } catch (error) {
        console.error("Error fetching API:", error);
    }
};

    return(<>

    
<div className=" h-full bg-contain bg-pokemon-rep bg-repeat" >
    {typeinfo &&(
    
        <div className=" p-8 ">
            <div className="">
                    <div className="">
                        <button onClick={PrevPage}  className="text-4xl text-white bg-slate-700 p-2 rounded-2xl font-bold hover:bg-slate-600 transition-all 2s ease-in-out ">Go Back</button>
                    </div>
                <div className="flex justify-center">
                    <p></p>
                    <div className= " bg-white h-52 border-black border-4 rounded-2xl ">
                        <img className={`content-${typeinfo.name} h-40 p-5`}  alt="Pokemon Img" />
                        <p className="text-center font-bold text-3xl">{capitalizeFirstLetter(typeinfo.name)}</p>
                    </div>
                </div>
            </div>
            
                   
                   <div className="lg:flex my-16 lg:justify-evenly">
                    

                    <div className="sm:flex sm:justify-center">
                        <div className=" bg-white border-8 border-black rounded-2xl m-10 w-96 h-52">
                            <div className="m-4">
                                <p className="text-center text-2xl font my-2">ID Type: <span className="font-bold">#{typeinfo.id}</span></p>
                                <p className="text-center text-2xl  my-2">Move Damage Class: <span className="font-bold">{capitalizeFirstLetter(typeinfo.move_damage_class.name)}</span></p> 
                                <div className="mt-3 flex justify-center">
                                    <details className=" dropdown">
                                        <summary className="btn text-2xl font-bold">{capitalizeFirstLetter(typeinfo.generation.name)}</summary>
                                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                        {typeinfo.game_indices.map((game, index) => (
                                            <li key={index} className="text-2xl font-bold">{capitalizeFirstLetter(game.generation.name)}</li>
                                        ))}
                                        </ul>
                                    </details>
                                </div>
                                
                            
                            </div>                    
                        </div>
                    </div>

                        <div className="flex flex-col justify-center border-8 border-black rounded-2xl bg-white p-3 lg:[1100px] lg:w-[800px]  w-full">
                            <div className="flex flex-row items-center mb-6 border-b-2">
                            <p className="text-2xl font-bold pr-10 w-1/5">Weak To:</p>
                            <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.double_damage_from.map((e, index) => (
                                <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)}  className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div className="flex flex-row items-center mb-6 border-b-2">
                            <p className="text-2xl font-bold pr-10 w-1/5">Strong Against:</p>
                            <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.double_damage_to.map((e, index) => (
                                <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)} className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div className="flex flex-row items-center mb-6 border-b-2">
                            <p className="text-2xl font-bold pr-10 w-1/5">Half Damage from:</p>
                            <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.half_damage_from.map((e, index) => (
                                <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)} className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                </div>
                                ))}
                            </div>
                            </div>
                            <div className="flex flex-row items-center mb-6 border-b-2">
                            <p className="text-2xl font-bold pr-10 w-1/5">Half Damage To:</p>
                            <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.half_damage_to.map((e, index) => (
                                <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)} className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                </div>
                                ))}
                            </div>
                            </div>
                            {typeinfo.damage_relations.no_damage_from && typeinfo.damage_relations.no_damage_from.length > 0 && (
                            <div className="flex flex-row items-center mb-6 border-b-2">
                                <p className="text-2xl font-bold pr-10 w-1/5">No Damage From:</p>
                                <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.no_damage_from.map((e, index) => (
                                    <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)} className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                            )}
                            {typeinfo.damage_relations.no_damage_to && typeinfo.damage_relations.no_damage_to.length > 0 && (
                            <div className="flex flex-row items-center mb-6 border-b-2">
                                <p className="text-2xl font-bold pr-10 w-1/5">No Damage To:</p>
                                <div className="flex flex-wrap w-4/5">
                                {typeinfo.damage_relations.no_damage_to.map((e, index) => (
                                    <div key={index} className="flex flex-col items-center px-2">
                                    <img onClick={() => ToTypePage(e.name)} className={`h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                    {console.log(newdata)}

<div className="2xl:flex 2xl:justify-around">
{typeinfo && (
    <div className="sm:flex sm:justify-center items-center">
        <div className=" align-center mt-8 sm:overflow-y-auto bg-white p-3 border-black border-8 rounded-2xl sm:w-[800px] sm:px-auto lg:w-[800px] sm:h-[1100px]">
            <p className="text-center font-extrabold mb-10 text-5xl"> Grass Pokemons</p>
            <div className="flex flex-wrap justify-evenly">
                {typeinfo.pokemon.map((poke, i) => (
                    <div key={i} className="bg-slate-900 m-2 rounded-3xl">
                        <div className="p-3 m-5 bg-slate-700 rounded-3xl border-white border-4"> 
                            {newdata.length > 0 && newdata[i] && newdata[i].data && (
                              
                                <img onClick={() => HandleClick(i)} className="h-36 cursor-pointer" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newdata[i].data.id}.png`} alt={`Sprite of ${capitalizeFirstLetter(poke.pokemon.name)}`} />
                            )}
                            {!newdata.length || !newdata[i] || !newdata[i].data && (
                                <img className="content-nopic" alt="No Image Available" /> 
                            )}
                            <p className="mt-[-20px] font-bold text-white text-center">{capitalizeFirstLetter(poke.pokemon.name)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}
            <div className="sm:flex sm:justify-center">
                <div className="mt-12 bg-white   rounded-2xl  xl:h-[1100px] w-[680px]">
                    
                    <div className=" border-8 border-black rounded-xl sm:overflow-y-auto h-[650px] xl:h-[950px] ">
                    <p className="text-center font-extrabold mb-10 text-5xl mt-8"> Grass Moves Pokemons</p>
                        <table className="rounded-2xl ">
                            <thead className="rounded-2xl sticky top-0">
                                <tr className="">
                                    <th className="px-4 bg-[#D9CD45] text-white">Move</th>
                                    <th className="px-4 w-40 bg-[#D94575] text-white">Description</th>
                                    <th className="px-4 bg-[#46B9DA] text-white">Accuracy</th>
                                    <th className="px-4 bg-[#EE5E38] text-white">Power</th> 
                                    {/* chnage color of last */}
                                    <th className="px-4 bg-[#96be25] text-white">Damage Class</th>                                              
                                </tr>
                            </thead>

                    {movedata.map((data, i) => (
                        <tr className="border-b-2" key={i}>
                            <td className="text-center font-semibold">{capitalizeFirstLetter(data.data.name)}</td>
                            {englishText(data)}
                            <td className=" text-center">{data.data.accuracy || 0}</td>
                            <td className="text-center ">{data.data.power || 0}</td>
                            <td className="text-center">{capitalizeFirstLetter(data.data.damage_class.name)}</td>
                        </tr>
                    ))}
                        </table>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    )}
</div>
        </>)
}

export default Grass