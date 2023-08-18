import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import TooltipCard from "../molecules/TooltipCard"


function Tooltip({ pesticides, picked }) {

  const { t } = useTranslation()

  const [ selected, setSelected ] = useState({ active: false, maxMRL: 0, data: [] })

  // Positioning
  const ref = useRef()

  const [ x, setX ] = useState(0)
  const [ y, setY ] = useState(0)

  useEffect(() => {
    if(!selected.active) return

    let tooltipWidth = 0
    let tooltipHeight = 0
    
    if(ref.current) {
      const rect = ref.current.getBoundingClientRect()
      tooltipWidth = rect.width
      tooltipHeight = rect.height
    }

    let newX = 0
    let newY = 0
    
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
  
    const elementX = selected.e.x - selected.e.offsetX
    const elementY = selected.e.y - selected.e.offsetY
  
    const stepX = 200
    const stepY = 128
  
    newX = elementX + stepX
    newY = elementY + stepY
  
    const offsetRight = 204
    const offsetBottom = 24
  
    if (screenHeight - (newY + tooltipHeight) < 0) {
      newY = newY + (screenHeight - (newY + tooltipHeight)) - offsetBottom
    } 
  
    if (screenWidth - (newX + tooltipWidth) < 0) {
      newX = newX - tooltipWidth - offsetRight
    }

    setX(newX)
    setY(newY)

  }, [selected])

  useEffect(() => {
    if (!picked) {
      setX(0)
      return setSelected({ active: false, ...selected })
    }
    setSelected({ active: true, ...picked })
  }, [ picked ])

    

  return x > 0 && (
    <div ref={ref} 
      className={`tooltip-wrapper ${!picked || x === 0 ? 'transparent' : ''}`}
      style={{ left: x+'px', top: y+'px' }}>

      <div className="tooltip-header">

        <span className="tooltip-header-title">
          {selected.active && t(`cultives.${selected.id}`)}
        </span>

        <span className="tooltip-header-subtitle">
          {t("mrl.initials")} - {t("mrl.name")}
        </span>

      </div>

      <div className="tooltip-body">
        
      {pesticides.map(pesticide => (

        <TooltipCard 
        key={pesticide.id} 
        pesticide={pesticide}
        maxMRL={selected.maxMRL}
        data={selected.data.filter(d => pesticide.id === d.cd_ia)} 
        />
        
      ))}

      </div>

  </div>
  )
}

export default Tooltip;