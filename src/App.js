import Main from './pages/Main';
import About from './pages/About';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from "react";

function App() {

  const languages = [
    {
      id: "br", 
      label: "Português", 
      countryLabel: {
        br: { short: "br", long: "Brasil" },
        eu: { short: "ue", long: "União Europeia" }, 
      }
    },
    {
      id: "en", 
      label: "English", 
      countryLabel: {
        br: { short: "br", long: "Brazil" },
        eu: { short: "eu", long: "European Union" }, 
      }
    },
  ]
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
