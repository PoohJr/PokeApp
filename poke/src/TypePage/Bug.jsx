import axios from "axios";
import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";

function Bug (){
    const [typeinfo, settypeinfo] = useState(null)

    // const history = useHistory();

    // const HandleTypeClick = async (index, e) =>{
    //     history.push(`./${capitalizeFirstLetter(index)}`)
    //    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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




    return(<>

    {console.log(typeinfo)}
<div className=" h-screen bg-contain bg-pokemon-rep bg-repeat" >
    {typeinfo &&(
    
        <div className=" px-8">
            <div className="">
               
                <div className="flex justify-center">
                    <p></p>
                    <div className= " bg-white h-52 border-black border-2 rounded-2xl ">
                        <img className={`content-${typeinfo.name} h-40 p-5`}  alt="Pokemon Img" />
                        <p className="text-center font-bold text-3xl">{capitalizeFirstLetter(typeinfo.name)}</p>
                    </div>
                </div>
            </div>

            <table className="table-auto bg-white border-black border-2">
                <thead className="sticky top-0 z-10">
                    <tr className="flex">
                        <th className="px-4"> Weak to</th>
                        <th className="px-4"> Strong Against</th>
                        <th className="px-4"> Weak to</th>
                        <th className="px-4"> Weak to</th>
                    </tr>
                </thead>
                <tbody>
                    {typeinfo.damage_relations.double_damage_from.map((e, index) => (
                        <tr key={index} className="flex px-2">
                        <td className={`flex-col px-2 h-20 cursor-pointer content-${e.name}`}>{e.name}</td>
                        <td className="flex flex-wrap">
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
            <div className="flex pt-8 justify-between">
               
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
            </div>

            
        </div>
    )}
</div>
        </>)
}

export default Bug