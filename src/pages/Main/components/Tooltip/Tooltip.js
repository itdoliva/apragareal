import './Tooltip.css';
import pesticides from "../../../../static/data/pesticides.json";

function Tooltip(props) {

  const langId = props.language.id

  const shorts = Object.entries(props.language.countryLabel).map(d => [d[0], d[1].short])

  return (
    <div className="tooltip-wrapper">

      <div className="tooltip-header">
        <span className="tooltip-header-title">Banana</span>
        <span>LMR - Limite Máximo de Resíduos</span>
      </div>

      <div className="tooltip-body">

        {pesticides.map(pest => (
          <div key={pest.rank}
          className={"tooltip-card card-" + pest.rank}>
          
            <div className="tooltip-card-header">
              {pest.label[langId]}
            </div>

            <div className="tooltip-card-body">

              {shorts.map(short => {
                const [countryId, label] = short
                
                return (
                  <div 
                    key={countryId} 
                    className={`tooltip-card-row ${countryId} pest-${pest.rank}`}>

                  <span className="country-label">{label}</span>

                  <div className="tooltip-card-bar-wrapper">
                    <div className="bar" />

                    <span>
                      <span className="lmr">0.01</span>
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