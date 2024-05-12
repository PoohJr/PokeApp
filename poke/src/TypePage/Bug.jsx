import axios from "axios";
import { useEffect, useState } from "react";


function Bug (){
    const [typeinfo, settypeinfo] = useState(null)



    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() =>  {
        const FetchType =  async() =>{
        try{
            // C Type in axios
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
       <div className="h-full bg-pokemon-rep bg-repeat">
{typeinfo &&(
    
    <div className="px-8">
        <div className="flex pt-8 justify-between">
            <div className="bg-white h-52 border-black border-2 rounded-2xl">
                <img className={`content-${typeinfo.name} h-40`}  alt="Pokemon Img" />
                <p className="text-center font-bold">{capitalizeFirstLetter(typeinfo.name)}</p>
            </div>
            <div className="flex flex-wrap border-2 border-black h-50 bg-white ">
                <div className="flex flex-row h-20">
                    <p className="text-end h-10">Weak To:</p>
                    {typeinfo.damage_relations.double_damage_from.map((e ,index ) => (
                        <div key={index} className="">
                        <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                            <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                            </div>
                    ))}
                </div>
                <div className="flex flex-row ">
                    <p className="text-center">Strong Against:</p>
                    {typeinfo.damage_relations.double_damage_to.map((e ,index ) => (
                        <div key={index} className="h-20">
                        <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                            <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                            </div>
                    ))}
                </div>
            </div>
        </div>

        
    </div>
    )}
    </div>
        </>)
}

export default Bug;