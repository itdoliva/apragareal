import rawData from "../../../static/data/tidy_top10.json";
import * as d3 from 'd3';

function getPestData(pesticides, anyActive) {
    let data = [...rawData];

    if (anyActive) {
        const activePesticides = pesticides
            .filter(d => d.active)
            .map(d => d.rank);

        data = data.filter(d => activePesticides.includes(d.rank));
    }

    data = d3.groups(data, 
        d => d.no_cultura, 
        d => d.rank, 
        d => d.legislacao)

    return data
}

export default getPestData
