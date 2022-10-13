import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import getDrop from '../../functions/getDrop';

export default function SizeLegend() {

    const ref = useRef(null)

    useEffect(() => {
        LegendD3.create(ref)
    }, [])
    return (
        <svg ref={ref}></svg>
    )
}


const LegendD3 = {}

LegendD3.create = (ref) => {
  const svg = d3.select(ref.current)

  LegendD3.drawDrops(svg)
}

LegendD3.drawDrops = (svg) => {

  const drop = getDrop(0)

  const classNames = [
    'drop-shadow',
    'drop-size',
    'drop-light-shadow',
    'drop-light-darker',
    'drop-light-lighter'
  ]

  const dropConf = drop.map((e, i) => [e, classNames[i]])

  const scales = [ .2, .3, .4, .5]

  const padding = 24
  const w = +svg.style('width').replace('px', '') - 2*padding
  const h = +svg.style('height').replace('px', '')

  const blockWidth = w / scales.length

  const enter = svg
    .selectAll('g.legendDropG')
      .data(scales)
      .enter()

  const dropsG = enter
    .append('g')
      .attr('class', 'legendDropG')
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