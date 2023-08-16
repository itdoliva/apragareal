import { useRef, useState, useEffect } from "react";

import Plate from "../../components/molecules/Plate";
import SizeLegend from "../../components/atoms/SizeLegend";
import PestTable from "../../components/molecules/PestTable";
import Tooltip from "../../components/organisms/Tooltip";

import getCultivesData from '../../lib/functions/getCultivesData';

import useActive from '../../lib/hooks/useActive';
import useCultives from '../../lib/hooks/useCultives';
import { useSelector } from 'react-redux'
import { selectIsMobile } from '../../features/mainSlice'
import PestFilters from "../../components/molecules/PestFilters";
import TypeFilters from "../../components/molecules/TypeFilters";
import CultiveFilters from "../../components/molecules/CultiveFilters"
import PlatesGrid from "../../components/organisms/PlatesGrid";
import Legend from "../../components/molecules/Legend";

function Plates ({ cultives, pesticides, colorBlocks, cultiveGroups }) {

  const isMobile = useSelector(selectIsMobile)

  const [ data, setData ] = useState([])
  const [ fPesticides, togglePesticide ] = useActive(pesticides, true)
  const [ cultiveTypes, toggleType ] = useActive(cultiveGroups, false)

  const [ picked, setPicked ] = useState(undefined)


  const [ fCultives, selectCultive, filterByGroup ] = useCultives(cultives)

  const secRef = useRef(null)

  const executeScroll = () => secRef.current.scrollIntoView()

  useEffect(() => {
    filterByGroup(cultiveTypes.find(d => d.active).id)
  }, [ cultiveTypes ])
  
  useEffect(() => {
    setData(getCultivesData(fCultives, fPesticides, isMobile))
  }, [ fCultives, fPesticides ])


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

        <PestTable pesticides={pesticides} {...selected} />

        <div className="filters-wrapper">

          <TypeFilters cultiveTypes={cultiveTypes} toggle={toggleType} scroll={executeScroll} wrapperClass={"filters-row type"} />

          <CultiveFilters fCultives={fCultives} select={selectCultive} scroll={executeScroll} />
 
        </div>
              
      </section>
    )
    
    
    : (
    <section ref={secRef} className="plates">
      <div className="plates-header">
        
        <PestFilters fPesticides={fPesticides} toggle={togglePesticide} scroll={executeScroll} />

      </div>

      <div className="plates-body">

        <aside className="side-panel type">
          <TypeFilters cultiveTypes={cultiveTypes} toggle={toggleType} scroll={executeScroll} wrapperClass={"slide-container flex-column"} />
        </aside>

        <aside className="side-panel details">

          <div className="slide-container flex-column">

            <Legend id="color" children={(
              <div className="color-blocks">{colorBlocks}</div>
            )} />

            <Legend id="size" children={<SizeLegend />} />

          </div>
          
        </aside>

        <div className="center-panel body">

          <PlatesGrid data={data} setPicked={setPicked} />
          <Tooltip pesticides={pesticides} picked={picked} />
          
        </div>

      </div>

      
    </section>
  )
}

export default Plates;