import { useRef, useEffect } from "react";

import useContainerDimensions from './lib/hooks/useContainerDimensions';

import Cover from './sections/cover/Cover';
import Plates from './sections/plates/Plates';
import TextKeyTerms from './sections/textkeyterms/TextKeyTerms';
import TextIntro from './sections/textintro/TextIntro';
import TextData from './sections/textdata/TextData';
import PoisonPack from './sections/poisonpack/PoisonPack';

import pesticides from './static/data/data_pesticides.json';
import cultives from './static/data/data_cultives';
import cultiveGroups from './static/data/data_cultive_groups.json';
import { useSelector, useDispatch } from 'react-redux'

import { setIsMobile, selectIsMobile } from './features/mainSlice'
import { useTranslation } from "react-i18next";


function App() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
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
    <main className="app" aria-label={'isMobile ' + isMobile} ref={appRef}> 

      <nav>
        <div className="nav-element">
          <div className="app-logo" alt="Logo de APRAGAREAL" />
        </div>

        {/* <div className="nav-element">
            <button className="lang-btn" onClick={() => dispatch(toggleLanguage())}>
              {!isMobile ? language.name : language.shortName}
            </button>
        </div> */}
      </nav>

      {/* <Cover {...coverProps} /> */}
      <Plates {...platesProps} />
      {/* <TextKeyTerms /> */}
      {/* <TextIntro /> */}
      {/* <TextData {...textDataProps} />  */}
      {/* <PoisonPack /> */}

    </main>
  );
}

export default App;

