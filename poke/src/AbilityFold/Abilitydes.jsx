// import { useEffect, useState, useLocation } from "react";
// import axios from "axios";
// import React from "react";

// function Abilitydes (){
//     const location = useLocation();
//     const pokedata = location.state ? location.state.pokedata : null;
    
//     const [abilityDes, setabilityDes] = useState([]);

//         useEffect(() => {
//             async function getApiData(){

//                 try{
//                     const res = await axios.get(pokedata.ability.ability.url);
//                     const data = res.data;
//                     setabilityDes(data);

//                     getApiData()
//                 } catch(error){
//                     console.error( error + "this is the Error")
//                 }
//             }
//             getApiData()

//         },[pokedata.ability.ability.url])

        
//     return(
//         <>
                               
//                                     {pokedata.abilities.map((ability, index) => {
//                                         try {
//                                             return (
//                                                 <li key={index} className="inline px-3">
//                                                     {ability.ability.name}
//                                                     {pokedata.abilityDes} 
//                                                 </li>
//                                             );
//                                         } catch (error) {
//                                             console.error("There was an error:", error);
                                        
//                                             return null; 
//                                         }
//                                         })}
                                
//         </>
//     )

// }

// export default Abilitydes