import rawData from "../../../static/data/pesticides.json";
import * as d3 from 'd3';
import { useState, useEffect } from 'react';

const data = rawData.map(d => ({ ...d, active: false }))

function usePestFilter() {
    const [pesticides, setPesticides] = useState(data)
  
    const togglePesticide = (rank) => setPesticides(pesticides.map(d => 
        d.rank === rank 
        ? { ...d, active: !d.active }
        : d));

    return [pesticides, togglePesticide]
}

export default usePestFilter
