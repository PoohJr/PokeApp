import axios from "axios";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

function Bug (){
    const [typeinfo, settypeinfo] = useState(null)
    const [newdata, setnewdata] = useState([])
    const [movedata, setmovedata] = useState([])
    // const history = useHistory();

    // const HandleTypeClick = async (index, e) =>{
    //     history.push(`./${capitalizeFirstLetter(index)}`)
    //    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function englishText(i) {
        const en = "en"
        i.find(en)
    }
// make useeffct to find the english language 
    useEffect(() => {

    },[movedata])

    useEffect(() =>  {
        const FetchType =  async() =>{
        try{
            // Change Type in axios
            const get = await axios.get("https://pokeapi.co/api/v2/type/bug/") 
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
            } catch (error) {
                console.error(error + " is the error");
            }
        };
    
        fetchMoveurl();
        
       
    }, [typeinfo]);
    
    






    return(<>

    
<div className=" h-full bg-contain bg-pokemon-rep bg-repeat" >
    {typeinfo &&(
    
        <div className=" p-8 ">
            <div className="">
               
                <div className="flex justify-center">
                    <p></p>
                    <div className= " bg-white h-52 border-black border-2 rounded-2xl ">
                        <img className={`content-${typeinfo.name} h-40 p-5`}  alt="Pokemon Img" />
                        <p className="text-center font-bold text-3xl">{capitalizeFirstLetter(typeinfo.name)}</p>
                        {/* do something with this  */}
                        <p>{typeinfo.move_damage_class.name}</p>
                    </div>
                </div>
            </div>

            <table className="table-auto bg-white border-black border-2 mt-5">
                <thead className="">
                    <tr className="flex">
                        <th className="px-4"> Weak to</th>
                        <th className="px-4"> Strong Against</th>
                        <th className="px-4"> Weak to</th>
                        <th className="px-4"> Weak to</th>
                    </tr>
                </thead>
                <tbody>
                    {typeinfo.damage_relations.double_damage_from.map((e, index) => (
                        <tr key={index} className="flex flex-wrap px-2">
                        <td className={`flex-col px-2 h-20 cursor-pointer content-${e.name}`}>{e.name}</td>
                        <td className="">
                            {typeinfo.damage_relations.double_damage_to.map((f, idx) => (
                            <div key={idx} className={`px-2 h-20 cursor-pointer content-${f.name}`}>
                                {f.name}
                            </div>
                            ))}
                            
                        </td>
                        </tr>
                    ))}
                </tbody>

            </table>
                   
            {/* <div className="flex pt-8 justify-between">
               
                <div className="flex flex-col border-2 border-black h-[500px] rounded-2xl bg-white p-3">
                    <div className="flex flex-row ">
                        <p className="font-bold pr-10">Weak To:</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.double_damage_from.map((e ,index ) => (
                                <div key={index} className="">
                                <img className={`px-2 h-20 cursor-pointer content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row mt-10 jusify">
                        <p className="font-bold pr-10">Strong Against:</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.double_damage_to.map((e ,index ) => (
                                <div key={index} className="h-20">
                                <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex mt-10">
                        <p className="font-bold pr-10">Half Damage from</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.half_damage_from.map((e ,index ) => (
                                <div key={index} className="h-20">
                                <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row mt-10">
                        <p className="font-bold pr-10">Half Damage To:</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.half_damage_to.map((e ,index ) => (
                                <div key={index} className="h-20">
                                <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    {typeinfo.damage_relations.no_damage_from && typeinfo.damage_relations.no_damage_from.length > 0 && (
                    <div className="flex flex-row mt-10">
                        <p className="font-bold pr-10">No Damage From</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.no_damage_from?.map((e ,index ) => (
                                <div key={index} className="h-20">
                                <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    )}
                    {typeinfo.damage_relations.no_damage_to && typeinfo.damage_relations.no_damage_to.length > 0 && (
                    <div className="flex flex-row mt-10">
                        <p className="font-bold pr-10">No Damage to</p>
                        <div className="flex flex-row">
                            {typeinfo.damage_relations.no_damage_to?.map((e ,index ) => (
                                <div key={index} className="h-20">
                                <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                                    <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                                    </div>
                            ))}
                        </div>
                    </div>
                    )}
                    
                </div>
            </div> */}

{typeinfo && (
    <div className="mt-8 bg-white p-3 border-black border-8 rounded-2xl">
        <p className="text-center font-extrabold mb-10 text-5xl">Bug Pokemons</p>
        <div className="flex flex-wrap justify-evenly">
            {typeinfo.pokemon.map((poke, i) => (
                <div key={i} className="bg-slate-900 m-2 rounded-3xl">
                    <div className="p-3 m-5 bg-slate-700 rounded-3xl border-white border-4"> 
                        {newdata.length > 0 && newdata[i] && newdata[i].data && (
                            <img className="h-36 cursor-pointer" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newdata[i].data.id}.png`} alt={`Sprite of ${capitalizeFirstLetter(poke.pokemon.name)}`} />
                        )}
                        {!newdata.length || !newdata[i] || !newdata[i].data && (
                            <img src='./img-svg/noimg.gif' alt="No Image Available" /> 
                        )}
                        <p className="font-bold text-white text-center">{capitalizeFirstLetter(poke.pokemon.name)}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}

            <div className="mt-8 bg-white p-3 border-black border-4 rounded-2xl">
                <p className="text-center font-extrabold mb-10 text-5xl">Bug Moves Pokemons</p>
                <div className=" border-4 border-blue-300">
                    <table>
                        <thead>
                            <tr className="">
                                <th className="px-4 bg-[#D9CD45] text-white">Move</th>
                                <th className="px-4 w-40 bg-[#D94575] text-white">Des</th>
                                <th className="px-4 bg-[#46B9DA] text-white">Accuracy</th>
                                <th className="px-4 bg-[#EE5E38] text-white">Power</th> 
                                {/* chnage color of last */}
                                <th className="px-4 bg-[#EE5E38] text-white">Damage Class</th>                                              
                            </tr>
                        </thead>
                        
                     
                    {/* {typeinfo.moves.map((move, idx) => (  
                    <tr key={idx} className="bg-blue-500 ">
                        
                        <td className=" text-white">{capitalizeFirstLetter(move.name)}</td>
                            {movedata.length > 0 && movedata[idx] && movedata[idx].data && (
                            <>
                                <td className="" >{movedata[idx].data.flavor_text_entries[idx]}</td>
                                <td> {movedata[idx].data.accuracy}</td>

                            </>
                        )}
                        
                    </tr>
                     
                ))} */} 
               {console.log(movedata)}
                {movedata.map((data, i) => (
                     <tr key={i}>
                        <td className="text-center">{capitalizeFirstLetter(data.data.name)}</td>
                        <td className=""> {console.log(data.data.flavor_text_entries)}</td>
                        <td className=" text-center">{data.data.accuracy || 0}</td>
                        {/* {console.log(data.data.flavor_text_entries)} */}
                        
                    </tr>
                ))}
                
                
           
                    </table>
                    
                </div>
            </div>
        </div>
    )}
</div>
        </>)
}

export default Bug