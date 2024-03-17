import Header from './pages/Header.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonData from "./pages/PokemonData.jsx";
import UserPoke from "./pages/UserPoke.jsx"; 
// import NonLoad from './pages/NonLoad.jsx';


function App() {


  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} /> 
        <Route path="/pokemonData" element={<PokemonData />} /> 
        <Route path="/userPoke" element={<UserPoke />} /> 
        
        {/* { <Route path="*" element={<NonLoad />} /> } */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
