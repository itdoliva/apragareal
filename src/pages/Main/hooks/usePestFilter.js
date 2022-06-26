import rawData from "../../../static/data/data_pesticides.json";
import { useState } from 'react';

const data = rawData.map(d => ({ ...d, active: false }))

function usePestFilter() {
    const [pesticides, setPesticides] = useState(data)
  
    const togglePesticide = (id) => setPesticides(pesticides.map(d => 
        d.id === id 
        ? { ...d, active: !d.active }
        : d));

    return [pesticides, togglePesticide]
}

export default usePestFilter
