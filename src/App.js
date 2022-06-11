import Main from './pages/Main';
import About from './pages/About';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";

const languages = [
  {
    id: "br", 
    name: "Português", 
    about: "Sobre",
    lmr: { short: "LMR", long: "Limite Máximo de Resíduos"},
    countryLabel: {
      br: { short: "br", long: "Brasil" },
      eu: { short: "ue", long: "União Europeia" }, 
    },
    legendLabel: {
      size: { title: "Tamanho", value: "LMR"},
      color: { title: "Cor", value: "Ingrediente Ativo" }
    }
  },
  {
    id: "en", 
    name: "English", 
    about: "About",
    lmr: { short: "MRL", long: "Maximum Residue Levels" },
    countryLabel: {
      br: { short: "br", long: "Brazil" },
      eu: { short: "eu", long: "European Union" }, 
    },
    legendLabel: {
      size: { title: "Size", value: "MRL"},
      color: { title: "Color", value: "Pesticide" }
    }
  },
]


function App() {

  const [language, setLanguage] = useState(languages.find(d => d.id == "br"));

  const changeLanguage = () => language.id === "br" 
    ? setLanguage(languages.find(d => d.id === "en"))
    : setLanguage(languages.find(d => d.id === "br"))

  return (
    <div className="App"> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main language={language} changeLanguage={changeLanguage}/>} />
          <Route path="/about" element={<About language={language} changeLanguage={changeLanguage}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
