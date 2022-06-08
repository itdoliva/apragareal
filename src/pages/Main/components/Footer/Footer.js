import { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import getDrop from '../../functions/getDrop';

function Footer() {
  const ref = useRef(null)

  useEffect(() => {
    FooterD3.create(ref)
  }, [])

  return (
    <footer className="footer" ref={ref}>

      <div className="legend">
      </div>

      <div className="legend color">
        <div className="legend-header">
          <span className="legend-title strong">Cor</span>
          <span className="legend-title">Ingrediente Ativo</span>
        </div>

        <div className="legend-body">
          <div className="color-blocks">
            {[1, 2, 3, 5, 6, 7, 9, 10].map(d => (
              <div className={'color-'+d}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="legend size">
        <div className="legend-header">
          <span className="legend-title strong">Tamanho</span>
          <span className="legend-title">LMR</span>
        </div>

        <div className="legend-body">
          <svg></svg>
        </div>
      </div>

    </footer>
  )
}

const FooterD3 = {}

FooterD3.create = (ref) => {
  const footer = d3.select(ref.current)

  FooterD3.drawDrops(footer)
}

FooterD3.drawDrops = (ref) => {

  const drop = getDrop(0)

  const classNames = [
    'drop-shadow',
    'drop-size',
    'drop-light-shadow',
    'drop-light-darker',
    'drop-light-lighter'
  ]

  const dropConf = drop.map((e, i) => [e, classNames[i]])

  const scales = [ .3, .375, .45, .525, .6]
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

export default Footer
