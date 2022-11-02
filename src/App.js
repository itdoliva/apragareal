import { useRef, useEffect } from "react";

import useContainerDimensions from './hooks/useContainerDimensions';

import Cover from './sections/cover/Cover';
import Plates from './sections/plates/Plates';
import TextKeyTerms from './sections/textkeyterms/TextKeyTerms';
import TextIntro from './sections/textintro/TextIntro';
import TextData from './sections/textdata/TextData';
import TextMe from './sections/textme/TextMe';

import pesticides from './static/data/data_pesticides.json';
import cultives from './static/data/data_cultives';
import cultiveGroups from './static/data/data_cultive_groups.json';
import { useSelector, useDispatch } from 'react-redux'

import { 
  setIsMobile, 
  selectIsMobile, 
  selectLanguage,
  toggleLanguage
} from './features/mainSlice'

import "./App.scss"


function App() {

  const dispatch = useDispatch()
  const language = useSelector(selectLanguage)
  const isMobile = useSelector(selectIsMobile)

  const colorBlocks = pesticides.filter(d => d.show).map(d => (
    <div key={d.id} style={{background: d.color}}></div>
  ))

    
  const appRef = useRef(null)
  const { width } = useContainerDimensions(appRef)

  
  useEffect(() => {
    dispatch(setIsMobile(width))
  }, [width])

  const coverProps = {
    colorBlocks
  }

  const platesProps = {
    pesticides,
    cultives,
    cultiveGroups,
    colorBlocks
  }

  const textDataProps = {
    pesticides
  }
  

  return (
    <div className="App" ref={appRef}> 

      <header>
        <div className="header-container">
          <div className="app-logo" alt="Logo de APRAGAREAL" />
        </div>

        <div className="header-container">
            <button onClick={() => dispatch(toggleLanguage())}>
              {!isMobile ? language.name : language.shortName}
            </button>
        </div>
      </header>

      <Cover {...coverProps} />
      <Plates {...platesProps} />
      <TextKeyTerms />
      <TextIntro />
      {/* <TextData {...textDataProps} /> */}
      {/* <TextMe /> */}


      

    </div>
  );
}

export default App;

