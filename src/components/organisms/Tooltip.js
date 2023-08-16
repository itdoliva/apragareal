import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TooltipCard from "../molecules/TooltipCard"

function Tooltip({ pesticides, picked }) {
  const { t, i18n } = useTranslation()

  let tooltipWidth = 0
  let tooltipHeight = 0

  const ref = useRef()
  useEffect(() => {
    if(ref.current) {
      const rect = ref.current.getBoundingClientRect()
      tooltipWidth = rect.width
      tooltipHeight = rect.height
    }
  }, [ref])

  let x = 0
  let y = 0

  useEffect(() => {
    if(!picked) return
    
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
  
    const elementX = picked.e.x - picked.e.offsetX
    const elementY = picked.e.y - picked.e.offsetY
  
    const stepX = 200
    const stepY = 128
  
    x = elementX + stepX
    y = elementY + stepY
  
    const offsetRight = 204
    const offsetBottom = 24
  
    if (screenHeight - (y + tooltipHeight) < 0) {
      y = y + (screenHeight - (y + tooltipHeight)) - offsetBottom
    } 
  
    if (screenWidth - (x + tooltipWidth) < 0) {
      x = x - tooltipWidth - offsetRight
    }
  }, [picked])

    

  return (
    <div ref={ref} 
      className={`tooltip-wrapper ${!picked ? 'transparent' : ''}`}
      style={{ left: x+'px', top: y+'px' }}>

      <div className="tooltip-header">

        <span className="tooltip-header-title">
          {picked && t(`cultives.${picked.id}`)}
        </span>

        <span className="tooltip-header-subtitle">
          {t("mrl.initials")} - {t("mrl.name")}
        </span>

      </div>

      <div className="tooltip-body">{pesticides.map(pesticide => (

        <TooltipCard 
        key={pesticide.id} 
        pesticide={pesticide}
        maxMRL={picked ? picked.maxMRL : 0}
        data={picked ? picked.data.filter(d => pesticide.id === d.cd_ia) : []} 
        />
        ))}

      </div>

  </div>
  )
}

export default Tooltip;