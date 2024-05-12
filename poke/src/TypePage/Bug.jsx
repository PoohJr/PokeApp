import axios from "axios";
import { useEffect, useState } from "react";


function Bug (){
    const [typeinfo, settypeinfo] = useState([])
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
            
            }
        }
        FetchType()

    },[])




    return(<>
        {console.log(typeinfo)}
    <div className="h-full">
      <h1 className="text-center"> Welcome the {capitalizeFirstLetter(typeinfo.name)} Type page </h1>
        <div className="flex ml-8">
            <img className={`content-${typeinfo.name} h-40`}  alt="Pokemon Img" />
            <p>{capitalizeFirstLetter(typeinfo.name)}</p>
            <div className="justify-end">
            <p>Weak To:</p>
               {typeinfo.damage_relations.double_damage_from.map((e ,index ) => (
                <div key={index} className="">
                <img className={`h-20 content-${e.name}`} src="" alt="" />
                    <p className="text-center">{capitalizeFirstLetter(e.name)}</p>
                    </div>
               ))}
            </div>
        </div>
        
    </div>
        </>)
}

export default Bug;