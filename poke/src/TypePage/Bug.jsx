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
        <div className="flex pt-8">
            <div className="bg-white h-52 border-black border-2 rounded-2xl">
                <img className={`content-${typeinfo.name} h-40`}  alt="Pokemon Img" />
                <p className="text-center font-bold">{capitalizeFirstLetter(typeinfo.name)}</p>
            </div>
            <div className="flex border-2 border-black h-96 bg-white ">
                <p className="text-end h-10">Weak To:</p>
                {typeinfo.damage_relations.double_damage_from.map((e ,index ) => (
                    <div key={index} className="">
                    <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                        <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                        </div>
                ))}
                <p>Strong Aginainst:</p>
                {typeinfo.damage_relations.double_damage_to.map((e ,index ) => (
                    <div key={index} className="">
                    <img className={`px-2 h-20 content-${e.name}`} src="" alt="" />
                        <p className="text-center font-semibold">{capitalizeFirstLetter(e.name)}</p>
                        </div>
                ))}
            </div>
        </div>

        
    </div>
    )}
    </div>
        </>)
}

export default Bug;