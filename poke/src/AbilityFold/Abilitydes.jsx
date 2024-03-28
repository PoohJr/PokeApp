// import { useEffect, useState } from "react";
// import React from "react";

// function Abilitydes (){
//     const [abilityDes, setabilityDes] = useState([])

//         useEffect( async () => {
//             const res = await axios.get(pokedata.ability.ability.url);
//             const data = res.data;
            
//             setabilityDes(data);
//                 try{

//                 } catch(error){
//                     console.error( error + "this is the Error")
//                 }

//         },[])
//     return(
//         <>
                               
//                                  {pokedata.abilities.map((ability, index) => {
//                                     try {
                                       
//                                         return (
//                                             <li key={index} className="inline px-3">
//                                                 {ability.ability.name}
//                                                 {pokedata.abilityDes} 
//                                             </li>
//                                         );
//                                     } catch (error) {
//                                         console.error("There was an error:", error);
                                    
//                                         return null; 
//                                     }
//                                     })}
                                
//         </>
//     )

// }

// export default Abilitydes