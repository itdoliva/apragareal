import { useRef, useState, useEffect } from "react";

import Plate from "../../components/Plate/Plate";
import PestFilter from "../../components/PestFilter/PestFilter";
import TooltipCard from "../../components/TooltipCard/TooltipCard";

import LegendD3 from '../../functions/LegendD3';

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

  useEffect(() => {
    filterByGroup(cultiveTypes.find(d => d.active).id)
  }, [ cultiveTypes ])
  
  useEffect(() => {
    setData(getCultivesData(fCultives, fPesticides, isMobile))
  }, [ fCultives, fPesticides ])

  console.log('Data', data)


  // ----- Filters Section ----- //
  const cultiveFilters = fCultives
    .filter(d => d.isAvailable)
    .map(d => {
      return (
      <button 
        key={'cultive-'+d.id}
        className="filter-element cultive-btn" 
        onClick={() => selectCultive(d.id)}>
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
        className={"filter-element type-option" + (d.active ? " active" : "")}
        onClick={() => toggleType(d.id)}>
        {d.label[language.id]}
      </button>
    ))

  const pesticideFilters = fPesticides
    .filter(d => d.show)
    .map(d => (
      <PestFilter 
        key={d.id} 
        language={language}
        toggle={() => togglePesticide(d.id) }
        {...d} />
    ))

  // ------------------------- //

  const legendRef = useRef(null)
  useEffect(() => {
    LegendD3.create(legendRef)
  }, [ legendRef ])

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

  return (isMobile && data.length > 0)
    ? (
      <section className="sec-plates">


        <div>
          {data
            .filter(d => d.isSelected)
            .map(d => (
              <Plate 
                key={d.cultivo + '-' + d.data.map(d => d.id).join('-')}
                {...d} />
            ))
          }
        </div>

        <div className="table-wrapper">

        </div>

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
    <section className="sec-plates">

      <div className="sec-plates-header">
        
        <div className="pest-filter-wrapper">
          <span className="filter-title">{language.filtersLabel}</span>
          {pesticideFilters}
        </div>

      </div>

      <div className="sec-plates-body">
        <div className="gradient upper"/>
        <div className="gradient lower"/>

        <div className="side-panel">
          <div className="types-wrapper">
            {typeFilters}
          </div>
          
        </div>

        <ul className="plates-wrapper" ref={platesRef}>
          {plates}
        </ul>

        <div className="side-panel" ref={legendRef}>

          <div className="legend color">
            <div className="legend-header">
              <span className="legend-header-title strong">{language.legendLabel.color.title}</span>
              <span className="legend-header-title">{language.legendLabel.color.value}</span>
            </div>

            <div className="legend-body">
              <div className="color-blocks">{colorBlocks}</div>
            </div>
          </div>

          <div className="legend size">
            <div className="legend-header">
              <span className="legend-header-title strong">{language.legendLabel.size.title}</span>
              <span className="legend-header-title">{language.legendLabel.size.value}</span>
            </div>

            <div className="legend-body">
              <svg />
            </div>
          </div>

        </div>
      </div>

      <div className="tooltip-wrapper transparent">

        <div className="tooltip-header">
          <span className="tooltip-header-title" />
          <span>{language.lmr.short} - {language.lmr.long}</span>
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
    </section>
  )
}

export default Plates;