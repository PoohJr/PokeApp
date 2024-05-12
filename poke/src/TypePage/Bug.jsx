import axios from "axios";
import { useEffect, useState } from "react";


function Bug (){
    const [typeinfo, settypeinfo] = useState([])


    useEffect(() =>  {
        async() =>{
        try{
            // C Type in axios
            const get = axios.get("https://pokeapi.co/api/v2/type/bug/") 
            console.log(get)
            const res = get.data
            console.log(res)
            settypeinfo(res)
            console.log(res)

        } catch(error){
            
            }
        }

    },[])




    return(<>
        <h1> Welcome the Bug Type page </h1>
        <h1>{typeinfo}</h1>
        </>)
}

export default Bug;