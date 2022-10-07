import lmrData from "../static/data/data_lmr.json";
import * as d3 from 'd3';

function getCultivesData(cultives, pesticides, isMobile) {
  const activePest = pesticides
    .filter(d => d.active)
    .map(d => d.id)

  const fLmrData = lmrData.filter(d => activePest.length === 0 || activePest.includes(d.cd_ia))

  const cultivesData = cultives
    .filter(d => d.isAvailable || (isMobile && d.isSelected))
    .map(cultive => {
      const cultiveLmrData = fLmrData.filter(d => d.cultivo === cultive.id)

      return {
        ...cultive,
        extent: d3.extent(cultiveLmrData, d => d.lmr),
        data: cultiveLmrData.map(d => ({
          id: d.id,
          cd_ia: d.cd_ia,
          legislacao: d.legislacao,
          lmr: d.lmr,
          ratio: d.ratio
        }))
      }
    })
    .filter(d => d.data.length > 0)

  return cultivesData
}

export default getCultivesData
