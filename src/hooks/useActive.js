import { useState } from 'react';

function useActive(data, multiactive) {
  data = data.map((d, i) => (multiactive || i > 0) 
    ? ({ ...d, active: false })
    : ({ ...d, active: true })
  )
  const [fData, setFData] = useState(data)

  const toggle = (id) => {
    const newFData = fData.map(d => {
      if (!multiactive) {
        return { ...d, active: d.id === id }
      }
      else if (d.id === id) {
        return { ...d, active: !d.active}
      }
      return d
    })

    setFData(newFData)
  };

  return [fData, toggle]
}

export default useActive
