import Header from './pages/Header.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonData from "./pages/PokemonData.jsx";
import Clicked from './Clicked.jsx';
import Normal from './TypePage/Normal.jsx';
import Fire from './TypePage/Fire.jsx';
import Fighting from './TypePage/Fighting.jsx';
import Flying from './TypePage/Flying.jsx';
import Poison from './TypePage/Poison.jsx';
import Ground from './TypePage/Ground.jsx';
import Rock from './TypePage/Rock.jsx';
import Bug from './TypePage/Bug.jsx';
import Ghost from './TypePage/Ghost.jsx';
import Steel from './TypePage/Steel.jsx';
import Water from './TypePage/Water.jsx';
import Grass from './TypePage/Grass.jsx';
import Electric from './TypePage/Electric.jsx';
import Psychic from './TypePage/Psychic.jsx';
import Ice from './TypePage/Ice.jsx';
import Dragon from './TypePage/Dragon.jsx';
import Dark from './TypePage/Dark.jsx';
import Fairy from './TypePage/Fairy.jsx';
import Stellar from './TypePage/Stellar.jsx';


// import NonLoad from './pages/NonLoad.jsx';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} /> 
          <Route path="/pokemonData" element={<PokemonData />} /> 
          <Route path="/Clicked" element={<Clicked />} /> 
          <Route path="/Normal" element={<Normal />} />
          <Route path="/Fire" element={<Fire />} />  
          <Route path="/Fighting" element={<Fighting />} />  
          <Route path="/Flying" element={<Flying />} />  
          <Route path="/Poison" element={<Poison />} />  
          <Route path="/Ground" element={<Ground />} />  
          <Route path="/Rock" element={<Rock />} />  
          <Route path="/Bug" element={<Bug />} />  
          <Route path="/Ghost" element={<Ghost />} />  
          <Route path="/Steel" element={<Steel />} />  
          <Route path="/Water" element={<Water />} />  
          <Route path="/Grass" element={<Grass />} />  
          <Route path="/Electric" element={<Electric />} /> 
          <Route path="/Psychic" element={<Psychic />} /> 
          <Route path="/Ice" element={<Ice />} /> 
          <Route path="/Dragon" element={<Dragon />} /> 
          <Route path="/Dark" element={<Dark />} /> 
          <Route path="/Fairy" element={<Fairy />} /> 
          <Route path="/Stellar" element={<Stellar />} /> 
          {/* { <Route path="*" element={<NonLoad />} /> } */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
