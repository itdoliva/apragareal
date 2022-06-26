import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from '../../static/imgs/apragareal.svg';
import PestFilter from './components/PestFilter/PestFilter';
import Plates from './components/Plates/Plates';
import Tooltip from './components/Tooltip/Tooltip';
import Footer from './components/Footer/Footer';

import getPestData from './functions/getPestData';
import usePestFilter from './hooks/usePestFilter';

import './style.scss';
import './plates.scss';
import './legend.scss';

function Main({ language, changeLanguage }) {

  const [pesticides, togglePesticide] = usePestFilter()
  const [ data, setData ] = useState(null)

  useEffect(() => {
    const newData = getPestData(pesticides)

    setData(newData)
  }, [pesticides])


  return data && (
    <div className="main-page">

      <header>

        <nav className="nav-wrapper">

          <img src={logo} className="app-logo" alt="Logo de APRAGAREAL" />

          <ul>
            <li><Link to="/about" >{language.about}</Link></li>
            <li><button onClick={changeLanguage}>{language.name}</button></li>
          </ul>

        </nav>

        <div className="pest-filters">
          {pesticides.map(d => (
            <PestFilter 
              key={d.id} 
              language={language}
              toggle={() => { togglePesticide(d.id) }}
              {...d} />
          ))}
        </div>

      </header>

      <Plates data={data} language={language}/>

      <Footer label={language.legendLabel} />

      <Tooltip language={language} />
    </div>
  );
}

export default Main;
