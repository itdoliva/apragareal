import { useState } from 'react';

function useCultives(data) {
  data = data.map((d, i) => ({ ...d, isAvailable: true, isSelected: i === 0 }))
  
  const [ cultives, setCultives ] = useState(data)

  const getSelected = () => cultives.find(d => d.isSelected)

  const selectCultive = (id) => {
    setCultives(cultives.map((d) => ({ ...d, isSelected: d.id === id }))) 
  }

  const filterByGroup = (id) => {
    const selected = getSelected()
    const selectedInGroup = id === 0 || selected.group === id

    let setSelectedFlag = true

    setCultives(cultives.map((d) => {
      const isAvailable = id === 0 || d.group === id
      let isSelected = false

      if (selectedInGroup) {
        isSelected = d.isSelected
      } 
      else if (isAvailable && setSelectedFlag) {
        isSelected = isAvailable 
        setSelectedFlag = false
      }

      return { ...d, isAvailable, isSelected }
    }))
  };

  return [ cultives, selectCultive, filterByGroup ]
}

export default useCultives
