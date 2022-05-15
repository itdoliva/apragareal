import rawData from "../../../static/data/tidy_top10.json";
import * as d3 from 'd3';

function getPestData(pesticides) {
    const activePesticides = pesticides.filter(d => d.active).map(d => d.rank)

    let raw = [...rawData]

    let pestData = []
    const cultives = [...new Set(raw.map(d => d.no_cultura))]
    cultives.forEach(cultive => {

        let cultiveData = raw.filter(d => d.no_cultura === cultive)
        const extentLMR = d3.extent(cultiveData, d => d.lmr)

        if (activePesticides.length > 0) {
            cultiveData = cultiveData.filter(d => activePesticides.includes(d.rank))
            if (cultiveData.length === 0 ) return
        }

        let nodes = []

        cultiveData.forEach(d => {
            const { legislacao, rank, lmr } = d
            const id = legislacao + '-' + rank
            nodes.push({ id, rank, lmr, legislacao })
        })

        const data = d3.groups(cultiveData,
            d => d.rank,
            d => d.legislacao
        ).map(row => {
            const [ rank, legisGroup ] = row
            const name = legisGroup[0][1][0].ia
            const brLMR = legisGroup[0][1][0].lmr
            const euLMR = legisGroup[1][1][0].lmr
            const ratio = brLMR / euLMR
            return { rank, name, brLMR, euLMR, ratio }
        })

        

        pestData.push({cultive, data, nodes, extentLMR})
    })

    return pestData
}

export default getPestData
