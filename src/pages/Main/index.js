import { Link } from "react-router-dom";
import logo from '../../static/imgs/apragareal.svg';
import PestFilter from './components/PestFilter/PestFilter';
import './style.css';
import pestRaw from "../../static/data/pesticides.json";
import { useState } from "react";

function Main(props) {

  // Format pesticides.json and set it as state
  const [pesticides, setPesticides] = useState(pestRaw.map(d => ({ ...d, active: false })))
  
  const togglePesticide = (rank) => setPesticides(pesticides.map(d => 
    d.rank === rank 
      ? { ...d, active: !d.active }
      : d))

  return (
    <div className="main-page">

      <header>

        <nav className="nav-wrapper">

          <img src={logo} className="app-logo" alt="Logo de APRAGAREAL" />

          <ul>
            <li><Link to="/about" >{props.language.id == "br" ? "Sobre" : "About"}</Link></li>
            <li><button onClick={props.changeLanguage}>{props.language.label}</button></li>
          </ul>
        </nav>

        

        <div className="pest-filters">
          {pesticides.map(d => (
            <PestFilter 
              key={d.rank} 
              language={props.language}
              toggle={() => {togglePesticide(d.rank)}}
              {...d} />
          ))}
        </div>

      </header>

    </div>
  );
}

export default Main;
