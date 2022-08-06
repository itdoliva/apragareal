import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../../../static/imgs/apragareal.svg';
import pesticides from '../../../../static/data/data_pesticides.json';

import './NavBar.scss';

function NavBar({ language, changeLanguage }) {
  const [fix, setFix] = useState(false)

  const handleScroll = () => setFix(window.scrollY >= 392)
  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  })
  

  return (
    <header className="header-wrapper">
      <div className="header-container">
        <Logo className="app-logo" color="white"/>
        <div className="colorful-border">
          {pesticides.filter(d => d.show).map(d => (
            <div key={d.id} className={'pest-' + d.id}></div>
          ))}
        </div>
        
        <div className='background'>
          <div className='background-image'/>
        </div>

        <ul className="menu">
          <li><Link to="/" >Home</Link></li>
          <li><button onClick={changeLanguage}>{language.name}</button></li>
        </ul>

      </div>
    </header>
  )
}

export default NavBar