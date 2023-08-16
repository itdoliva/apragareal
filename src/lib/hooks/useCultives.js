import { useState } from 'react';

function useCultives(data) {
  data = data.map((d, i) => ({ ...d, isAvailable: true, isSelected: i === 0 }))
  
  const [ cultives, setCultives ] = useState(data)

  const selectCultive = (id) => {
    setCultives(cultives.map((d) => ({ ...d, isSelected: d.id === id }))) 
  }

  const filterByGroup = (id) => {
    const newCultives = cultives.map((d) => ({
      ...d,
      isAvailable: id === 0 || d.group === id
    }))

    setCultives(newCultives)
  };

  return [ cultives, selectCultive, filterByGroup ]
}

export default useCultives
