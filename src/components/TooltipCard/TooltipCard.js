import {ReactComponent as Skull} from '../../static/imgs/skull.svg';

function TooltipCard({ language, pesticide, shorts }) {
  const { id, label, approved } = pesticide
  
  return (
    <div className={"tooltip-card  card-" + id}>
      
      <div className="tooltip-card-header">
        {label[language.id]}
      </div>

      <div className="tooltip-card-body">{shorts.map(d => (
          <div key={d.language} className={`tooltip-card-row ${d.language}`}>

            <span className="country-label">{d.label}</span>

            {(d.language == "en" && !approved) && (
              <div className="tooltip-card-bar-wrapper">
                <span className="banned-label">{language.ban}</span>
              </div>
            )}

            {(d.language != "en" || approved) && (
              <div className="tooltip-card-bar-wrapper">
                <div className="bar" />

                <span>
                  <span className="lmr" />
                  <span className="measure-unit"> mg/kg</span>
                </span>
              </div>
            )}
            
            {(d.language == "br" && approved) && (
              <div className="multiplier-wrapper">
                <span className="multiplier"></span>
              </div>
            )}

            {(d.language == "br" && !approved) && (
              <div className="skull-wrapper">
                <Skull />
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  )
}

export default TooltipCard