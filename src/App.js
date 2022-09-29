import { useState, useRef, useEffect } from "react";

import useContainerDimensions from './hooks/useContainerDimensions';

import Cover from './sections/cover/Cover';
import Plates from './sections/plates/Plates';
import TextIntro from './sections/textintro/TextIntro';
import TextData from './sections/textdata/TextData';
import TextMe from './sections/textme/TextMe';

import pesticides from './static/data/data_pesticides.json';
import cultives from './static/data/data_cultives';
import cultiveGroups from './static/data/data_cultive_groups.json';
import languages from './static/data/data_language.json'

import "./App.scss"


function App() {

  const [language, setLanguage] = useState(languages.br);
  const toggleLanguage = () => {setLanguage(language.id === "br" ? languages.en : languages.br)}

  const colorBlocks = pesticides.filter(d => d.show).map(d => (
    <div key={d.id} style={{background: d.color}}></div>
  ))

  const appRef = useRef(null)
  const { width } = useContainerDimensions(appRef)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(width >= 768 ? false : true)
  }, [width])

  const coverProps = {
    colorBlocks,
    language
  }

  const platesProps = {
    isMobile,
    pesticides,
    cultives,
    cultiveGroups,
    colorBlocks,
    language
  }

  const textDataProps = {
    pesticides,
    language
  }
  

  return (
    <div className="App" ref={appRef}> 

      <header>
        <div className="header-container">
          <div className="app-logo" alt="Logo de APRAGAREAL" />
        </div>

        <div className="header-container">
            <button onClick={toggleLanguage}>
              {!isMobile ? language.name : language.shortName}
            </button>
        </div>
      </header>

      {/* <Cover {...coverProps} /> */}
      <Plates {...platesProps} />
      <TextIntro />
      <TextData {...textDataProps} />
      <TextMe />

      

    </div>
  );
}

export default App;

