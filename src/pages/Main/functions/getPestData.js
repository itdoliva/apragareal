import rawData from "../../../static/data/data_lmr.json";
import cultives from "../../../static/data/data_cultives.json";
import imgs from "../../../static/data/cultive_imgs";
import * as d3 from 'd3';

function getPestData(pesticides) {
  const active = pesticides
    .filter(d => d.active)
    .map(d => d.id)

  const filtered = rawData
  .filter(d => active.length > 0 
    ? active.includes(d.cd_ia)
    : true)

  const grouped = d3.group(filtered, d => d.cultivo)

  let pestData = []
  Object.keys(cultives)
    .forEach(cultivo => {
      const frame = grouped.get(cultivo)

      if (!frame) {
        return
      }

      const extent = d3.extent(
        rawData.filter(d => d.cultivo === cultivo), 
        d => d.lmr)

      const names = cultives[cultivo].name
      const img = imgs[cultivo]

      pestData.push({ 
        cultivo,
        names, 
        extent, 
        img, 
        data: frame.map(d => ({ 
          id: d.id,
          cd_ia: d.cd_ia, 
          legislacao: d.legislacao,
          lmr: d.lmr,
          ratio: d.ratio
        }))
      })
    })

  return pestData
}

export default getPestData
