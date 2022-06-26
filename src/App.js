import Main from './pages/Main';
import About from './pages/About';
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import languages from './static/data/data_language.json'

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
