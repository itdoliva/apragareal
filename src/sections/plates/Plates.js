import { useRef, useState, useEffect } from "react";

import Plate from "../../components/Plate/Plate";
import PestFilter from "../../components/PestFilter/PestFilter";
import TooltipCard from "../../components/TooltipCard/TooltipCard";
import SizeLegend from "../../components/SizeLegend/SizeLegend";
import TooltipTable from "../../components/TooltipTable/TooltipTable";

import getCultivesData from '../../functions/getCultivesData';

import useActive from '../../hooks/useActive';
import useContainerDimensions from '../../hooks/useContainerDimensions';
import useCultives from '../../hooks/useCultives';

import { useSelector } from 'react-redux'

import { selectLanguage, selectIsMobile } from '../../features/mainSlice'

function Plates ({ cultives, pesticides, colorBlocks, cultiveGroups }) {
  
  const language = useSelector(selectLanguage)
  const isMobile = useSelector(selectIsMobile)

  const [ data, setData ] = useState([])
  const [ fPesticides, togglePesticide ] = useActive(pesticides, true)
  const [ cultiveTypes, toggleType ] = useActive(cultiveGroups, false)

  const [ fCultives, selectCultive, filterByGroup ] = useCultives(cultives)

  const secRef = useRef(null)

  const executeScroll = () => secRef.current.scrollIntoView()

  useEffect(() => {
    filterByGroup(cultiveTypes.find(d => d.active).id)
  }, [ cultiveTypes ])
  
  useEffect(() => {
    setData(getCultivesData(fCultives, fPesticides, isMobile))
  }, [ fCultives, fPesticides ])

  // ----- Filters Section ----- //
  const cultiveFilters = fCultives
    .filter(d => d.isAvailable)
    .map(d => {
      return (
      <button 
        key={'cultive-'+d.id}
        className={"filter-element cultive-btn" + (d.isSelected ? " selected" : "")} 
        onClick={() => {
          selectCultive(d.id)
          executeScroll()
          }}>
        <img 
          className="cultive-img"
          src={d.img.src}
          style={d.img.style} />
      </button>
    )})

  const typeFilters = cultiveTypes
    .map(d => (
      <button 
        key={'type-'+d.id}
        className={"type-option" + (d.active ? " active" : "")}
        onClick={() => {
          toggleType(d.id)
          executeScroll()
          }}>
        {d.label[language.id]}
      </button>
    ))

  const pesticideFilters = fPesticides
    .filter(d => d.show)
    .map(d => (
      <PestFilter 
        key={d.id} 
        language={language}
        toggle={() => {
          togglePesticide(d.id)
          executeScroll()
        } }
        {...d} />
    ))

  // ------------------------- //

  const platesRef = useRef(null)
  const { width } = useContainerDimensions(platesRef)
 
  const [ platesByRow, setPlatesByRow ] = useState(~~(width/240))
  const [ rowSize, setRowSize ] = useState(2*platesByRow-1)

  const plates = data.map((d, i) => {
    let margins = { marginLeft: 0, marginRight: 0 }
    const row = Math.floor(i/rowSize)
    const position = i - (row*rowSize)
    if (position === platesByRow) {
      margins.marginLeft = 120
    } 

    if (position === rowSize-1) {
      margins.marginRight = 120
    }
    else if (data.length - 1 === i && position > platesByRow) {
      margins.marginRight = 120
    }

    return (
      <li style={margins}
      
      key={d.cultivo + '-' + d.data.map(d => d.id).join('-')}>
        <Plate 
          {...d} />
      </li>
    )
  })
  
  useEffect(() => {
    const count = ~~(width/240)
    setPlatesByRow(count)
    setRowSize(2*count-1)
  }, [width])

  const shorts = Object.entries(language.countryLabel)
    .map(d => ({language: d[0], label: d[1].short}))

  const selected = data.find(d => d.isSelected)

  return (isMobile && data.length > 0)
    ? (
      <section ref={secRef} className="plates">
        <div className="plate-container">
          {<Plate 
            key={selected.cultivo + '-' + selected.data.map(d => d.id).join('-')}
            {...selected} />
          }
        </div>

        <TooltipTable pesticides={pesticides} {...selected} language={language} />

        <div className="filters-wrapper">

          <div className="filters-row type">
            {typeFilters}
          </div>

          <div className="filters-row cultive">
            {cultiveFilters}
          </div>

        </div>
              
      </section>
    )
    : (
    <section ref={secRef} className="plates">

      <div className="plates-header">
        
        <div className="pest-filter-container">
          <span className="filter-title">{language.filtersLabel}</span>
          <div className="btns-wrapper">
            {pesticideFilters}
          </div>
          
        </div>

      </div>

      <div className="plates-body">

        <aside className="side-panel type">
            <div className="slide-container flex-column">
              {typeFilters}
            </div>
        </aside>

      <aside className="side-panel details">

        <div className="slide-container flex-column">
          <div className="legend-container color">
            <div className="legend-header">
              <span className="legend-header-title strong">{language.legendLabel.color.title}</span>
              <a href="#key-terms"><span className="legend-header-title">{language.legendLabel.color.value}</span></a>
            </div>

            <div className="legend-body">
              <div className="color-blocks">{colorBlocks}</div>
            </div>
          </div>

          <div className="legend-container size">
            <div className="legend-header">
              <span className="legend-header-title strong">{language.legendLabel.size.title}</span>
              <a href="#key-terms"><span className="legend-header-title">{language.legendLabel.size.value}</span></a>
            </div>

            <div className="legend-body">
              <SizeLegend />
            </div>
          </div>
        </div>
        
      </aside>

      <div className="center-panel body">

        <ul className="plates-wrapper" ref={platesRef}>
          {plates}
        </ul>

        <div className="tooltip-wrapper transparent">

        <div className="tooltip-header">
          <span className="tooltip-header-title" />
          <span className="tooltip-header-subtitle">{language.lmr.short} - {language.lmr.long}</span>
        </div>

        <div className="tooltip-body">{pesticides.map(pesticide => (
          <TooltipCard 
            key={pesticide.id} 
            language={language}
            pesticide={pesticide}
            shorts={shorts}/>
          ))}
        </div>
      </div>
        
      </div>

      </div>

      
    </section>
  )
}

export default Plates;