import pesticides from "../../../../static/data/data_pesticides.json";
import TooltipCard from './TooltipCard';
import './Tooltip.css';

function Tooltip({ language }) {

  const shorts = Object.entries(language.countryLabel)
        .map(d => ({language: d[0], label: d[1].short}))

  return (
    <div className="tooltip-wrapper transparent">

      <div className="tooltip-header">
        <span className="tooltip-header-title" />
        <span>{language.lmr.short} - {language.lmr.long}</span>
      </div>

      <div className="tooltip-body">

        {pesticides.map(pesticide => (
          <TooltipCard 
            key={pesticide.id} 
            language={language}
            pesticide={pesticide}
            shorts={shorts}/>
        ))}

      </div>

    </div>
  )
}

export default Tooltip;