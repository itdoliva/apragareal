import { useEffect, useState } from 'react';

import './Tooltip.css';
import pesticides from "../../../../static/data/pesticides.json";

function Tooltip({ language }) {

  return (
    <div className="tooltip-wrapper deactivate">

      <div className="tooltip-pointer"></div>

      <div className="tooltip-header">
        <span className="tooltip-header-title"></span>
        <span>{language.lmr.short} - {language.lmr.long}</span>
      </div>

      <div className="tooltip-body">

        {pesticides.map(pest => (
          <div key={language.id + pest.rank}
          className={"tooltip-card deactivate card-" + pest.rank}>
          
            <div className="tooltip-card-header">
              {pest.label[language.id]}
            </div>

            <div className="tooltip-card-body">

              {Object
              .entries(language.countryLabel)
                .map(d => [d[0], d[1].short])
                .map(short => {
                const [countryId, label] = short
                
                return (
                  <div key={countryId} 
                    className={`tooltip-card-row ${countryId}`}>

                  <span className="country-label">{label}</span>

                  <div className="tooltip-card-bar-wrapper">
                    <div className="bar" />

                    <span>
                      <span className="lmr"></span>
                      <span className="measure-unit"> mg/kg</span>
                    </span>
                    
                    
                  </div>

                  <div className="multiplier-wrapper">
                    <span className="multiplier"></span>
                  </div>

                </div>

                )})}


            </div>

          </div>
        ))}

      </div>

    </div>
    )
}

export default Tooltip;