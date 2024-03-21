import Header from './pages/Header.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonData from "./pages/PokemonData.jsx";
// import NonLoad from './pages/NonLoad.jsx';


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} /> 
          <Route path="/pokemonData" element={<PokemonData />} /> 
          {/* { <Route path="*" element={<NonLoad />} /> } */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
