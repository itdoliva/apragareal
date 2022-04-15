import { Link } from "react-router-dom";

import logo from '../../static/imgs/apragareal.svg';
import PestFilter from './components/PestFilter/PestFilter';

import getPestData from './functions/getPestData';
import usePestFilter from './hooks/usePestFilter';

import './style.css';

function Main(props) {

  
  const [pesticides, anyActive, togglePesticide] = usePestFilter()

  const data = getPestData(pesticides, anyActive);

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
