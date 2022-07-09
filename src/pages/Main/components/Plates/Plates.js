import { useRef, useEffect, useState } from 'react';
import Plate from './Plate';
import useContainerDimensions from '../../hooks/useContainerDimensions';

function Plates({ data, language }) {
  const componentRef = useRef()
  const { width } = useContainerDimensions(componentRef)

  const [ platesByRow, setPlatesByRow ] = useState(~~(width/240))
  const [ rowSize, setRowSize ] = useState(2*platesByRow-1)
  
  useEffect(() => {
    const count = ~~(width/240)
    setPlatesByRow(count)
    setRowSize(2*count-1)
  }, [width])

  return (
    <ul className="plates-wrapper" ref={componentRef}>
      {data.map((d, i) => {
        let margins = { left: 0, right: 0 }
        const row = Math.floor(i/rowSize)
        const position = i - (row*rowSize)
        if (position === platesByRow) {
          margins.left = 120
        } 

        if (position === rowSize-1) {
          margins.right = 120
        }
        else if (data.length - 1 === i && position > platesByRow) {
          margins.right = 120
        }

        return (
        <Plate 
          key={d.cultivo + '-' + d.data.map(d => d.id).join('-')}
          language={language}
          margins={margins}
          {...d} />
        )
      })}
    </ul>
  )
}

export default Plates