import { useRef, useEffect, useState } from "react"
import useContainerDimensions from "../../lib/hooks/useContainerDimensions"
import Plate from "../molecules/Plate"


export default function PlatesGrid({ data, setPicked }) {

  const plateSize = 240

  const platesRef = useRef(null)
  const { width } = useContainerDimensions(platesRef)
 
  const [ platesByRow, setPlatesByRow ] = useState(~~(width/plateSize))
  const [ rowSize, setRowSize ] = useState(2*platesByRow-1)
  
  useEffect(() => {
    const count = ~~(width/plateSize)
    setPlatesByRow(count)
    setRowSize(2*count-1)
  }, [width])


  function getMargin(i) {
    const margins = { marginLeft: 0, marginRight: 0 }

    const row = Math.floor(i/rowSize)
    const position = i - (row*rowSize)

    if (position === platesByRow) {
      margins.marginLeft = ~~(plateSize/2)
    }

    if (position === rowSize-1) {
      margins.marginRight = ~~(plateSize/2)
    }
    else if (data.length - 1 === i && position > platesByRow) {
      margins.marginRight = ~~(plateSize/2)
    }

    return margins
  }

  return (
    <ul className="plates-wrapper" ref={platesRef}>
      
      {data.map((d, i) => (

        <li 
        style={getMargin(i)}
        key={d.cultivo + '-' + d.data.map(d => d.id).join('-')}>

          <Plate setPicked={setPicked} {...d} />

        </li>

      ))}

    </ul>
  )
}