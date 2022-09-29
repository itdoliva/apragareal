import * as d3 from 'd3';
import getDrop from './getDrop';

const LegendD3 = {}

LegendD3.create = (ref) => {
  const panel = d3.select(ref.current)

  LegendD3.drawDrops(panel)
}

LegendD3.drawDrops = (ref) => {

  const drop = getDrop(0)

  const classNames = [
    'drop-shadow',
    'drop-size',
    'drop-light-shadow',
    'drop-light-darker',
    'drop-light-lighter'
  ]

  const dropConf = drop.map((e, i) => [e, classNames[i]])

  const scales = [ .2, .275, .35, .425, .5]
  const nodes = scales.map((d, i) => ({id: i+1, scale: d}))

  const svg = ref
    .select('.legend.size .legend-body svg')

  const padding = 24
  const w = +svg.style('width').replace('px', '') - 2*padding
  const h = +svg.style('height').replace('px', '')

  const blockWidth = w / scales.length

  const dropsG = svg
    .selectAll('g')
      .data(scales)
      .enter()
    .append('g')
      .style('transform', (d, i) => {
        const x = padding + i*blockWidth + blockWidth/2
        const y = (h/2)*.85

        return `translate(${x}px, ${y}px) scale(${d})`
      })

  const movG = dropsG
    .append('g')

  movG
    .selectAll('path')
      .data(dropConf)
      .enter()
    .append('path')
      .attr('class', d => d[1])
      .attr('d', d => d[0])

  movG
    .each(function() {
      const group = d3.select(this)

      const bbox = group.node().getBoundingClientRect()
      const groupWidth = bbox.width
      const groupHeight = bbox.height

      group
        .style('transform', `translate(-${groupWidth/2}px, -${groupHeight/2}px)`)
    })
}

export default LegendD3;