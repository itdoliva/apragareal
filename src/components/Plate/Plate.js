import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import * as d3 from 'd3';

import PlateParams from './PlateParams';
import getDrop from '../../functions/getDrop';
import useContainerDimensions from '../../hooks/useContainerDimensions';
import { selectLanguage, selectIsMobile } from '../../features/mainSlice'

export default function Plate({ name, img, extent, data }) {
  

    const language = useSelector(selectLanguage)
    const isMobile = useSelector(selectIsMobile)

    const ref = useRef(null)
    const { width, size } = useContainerDimensions(ref)
    const params = new PlateParams(name, data, extent, size, language.id)

    useEffect(() => {
        PlateD3.create(ref, params)
        return PlateD3.destroy(ref)
    }, [])

    useEffect(() => {
      PlateD3.update(ref, params, isMobile)
    }, [params])

    return (
        <div 
          ref={ref} 
          className="plate-wrapper">
            
            {!isMobile && (<div className="tooltip-trigger" />)}
            
            <svg>
              <defs />
            </svg>
            
            <div className="cultive-container">
              <img className="cultive-img" src={img.src} style={img.style} alt={name}/>
            </div>
            
        </div>
    )
}

const PlateD3 = {}

PlateD3.selections = {}

PlateD3.arcGenerator = d3.arc()


// Drop Arcs
PlateD3.create = (ref, params) => {
    PlateD3.drawPlate(ref, params)
    PlateD3.setGroups(ref)
}

PlateD3.drawPlate = (ref, params) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')
  const defs = svg.select('defs')
        
  //Create a radial plate-like gradient
  defs
    .append("radialGradient")
      .attr("id", "plate-gradient")
      .attr("cx", "50%")	//not really needed, since 50% is the default
      .attr("cy", "50%")	//not really needed, since 50% is the default
      .attr("r", "50%")	//not really needed, since 50% is the default
    .selectAll("stop")
      .data(params.plate.gradient)
      .enter()
    .append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.color);
  
  // Plate
  const plateG = svg
    .append('g')
      .attr('class', 'plateG')

  plateG
    .append('circle')
      .attr('class', 'plate-circle')
      .style('fill', 'url(#plate-gradient)')

  // Diagonal Line
  plateG
    .append('line')
      .attr('class', 'diagonal-line')

  // Inner Plate
  plateG
    .append('circle')
      .attr('class', 'plate-circle-inner')
  
}

PlateD3.setGroups = (ref) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')

  svg
    .append('g')
      .attr('class', 'countryG')

  svg
    .append('g')
      .attr('class', 'dropsG')
    .append('g')

}

PlateD3.drawCountryLabel = (ref, params) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')

  const g = svg
    .select('g.countryG')
    .selectAll('g')
      .data(params.countryArcs, d => d.key)

  g.exit().remove()

  const enter = g
    .enter()
    .append('g')
      .attr('class', 'countryG-arc')

  enter
    .append('path')
      .style('opacity', .2)
      .attr('id', d => `country-arc-${d.country}`)
      .attr('d', d => PlateD3.arcGenerator(d.arcConf))

  enter
    .append('text')
      .attr('dy', d => d.dy)
    .append('textPath')
      .attr('startOffset', d => d.x)
      .attr('xlink:href', d => `#country-arc-${d.country}`)
      .style('text-anchor', d => d.textAnchor)
      .text(d => d.text)
}


PlateD3.drawDrops = (ref, params, isMobile) => {
  
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')

  // // Draw
  const nodeG = svg.select('g.dropsG > g')
    .selectAll('g.drop')
      .data(params.nodes, d => `${d.id}-${params.width.toFixed(1)}`)
      .enter()
    .append('g')
      .attr('class', 'drop')
      .attr('y', d => d.y - params.collideRadiusScale(d.lmr))
      .attr('x', d => d.x - params.collideRadiusScale(d.lmr))
 

  nodeG
    .each(function(d) {
      const drop = getDrop()

      const classNames = [
        'drop-shadow',
        'pest-' + d.cd_ia,
        'drop-light-shadow',
        'drop-light-darker',
        'drop-light-lighter'
      ]

      const dropConf = drop.map((e, i) => ({
        pathD: e,
        className: classNames[i]
      }))

      const g = d3.select(this).append('g')

      const drops = g
        .selectAll('path')
          .data(dropConf)
          .enter()
        .append('path')
          .attr('class', dd => dd.className)
          .attr('d', dd => dd.pathD)

      if (isMobile) {
        drops
          .style('opacity', 0)
          .transition()
          .delay(50)
          .duration(500)
          .style('opacity', 1)
      }
    })



    let tick = 0
    const tickRate = !isMobile ? 4 : 1 
    params.forceSimulation.on("tick", () => {
      if (tick % tickRate === 0) {
        nodeG
        .attr('transform', d => {
          const radius = params.collideRadiusScale(d.lmr)
          return `translate(${d.x - radius}, ${d.y - radius})`
        })
      }
      tick++
    })

    params.forceHasRun = true
      
  

}

PlateD3.ttipMouseEnter = (ref, params) => function(d) {
  const wrapper = d3.select(ref.current)
  const plateCircle = wrapper.select('.plate-circle')
  const ttipWrapper = d3.select('.tooltip-wrapper')

  const barScale = d3.scaleLinear()
    .domain([0, params.maxLMR])
    .range([0, 120])


  const multiplierColor = d3.scaleLinear()
    .domain([1, 20])
    .range(['#C17373', '#C23838'])

  plateCircle
    .classed('stronger', true)

  ttipWrapper
    .classed('transparent', false)

  ttipWrapper
    .select('.tooltip-header-title')
      .text(() => params.name)

  const data = params.data
  ttipWrapper.selectAll('.tooltip-card')
    .each(function() {
      const card = d3.select(this)

      const regex = /(?!card-)\w\d+/g
      const cd_ia = regex.exec(card.attr('class'))[0]

      const pestBR = data.find(d => d.cd_ia === cd_ia && d.legislacao === "br")
      const pestEU = data.find(d => d.cd_ia === cd_ia && d.legislacao === "eu")

      card
        .classed('deactivate', !pestBR)

      const cardBR = card.select('.br')
      const cardEU = card.select('.en')

      if (pestBR && pestBR.lmr) {
        cardBR
          .select('.bar')
            .style('width', 2 + barScale(pestBR.lmr) + 'px')

        cardBR
          .select('.lmr')
            .text(pestBR.lmr)

        if (pestBR.ratio) {
          let fmtRatio = pestBR.ratio
          if (fmtRatio >= 2 || fmtRatio === 1) {
            fmtRatio = fmtRatio.toFixed(0)
          } 
          else if (fmtRatio >= .1) {
            fmtRatio = fmtRatio.toFixed(1)
          } 
          else if (fmtRatio >= .01) {
            fmtRatio = fmtRatio.toFixed(2)
          }

          cardBR
            .select('.multiplier-wrapper')
              .style('background', multiplierColor(pestBR.ratio))
              .style('opacity', 1)
            .select('.multiplier')
              .text('x' + fmtRatio)

        } else if (pestBR.ratio === 0) {
          cardBR
            .select('.multiplier-wrapper')
              .style('opacity', 0)
        }
        
      }
    
      if (pestEU && pestEU.lmr) {
        cardEU
          .select('.bar')
            .style('width', 2 + barScale(pestEU.lmr) + 'px')

        cardEU
          .select('.lmr')
            .text(pestEU.lmr)
      } 
      else if (pestEU && !pestEU.lmr) {
        cardEU
          .select('.lmr')
            .text('0')
      }
      
    })

  const screen = d3.select('.App')
  const screenWidth = +screen.style('width').replace('px', '')
  const screenHeight = +screen.style('height').replace('px', '')
  const tooltipWidth = +ttipWrapper.style('width').replace('px', '')
  const tooltipHeight = +ttipWrapper.style('height').replace('px', '')

  let x = d.x - d.offsetX + 200
  let y = d.y - d.offsetY + 128

  
  if (screenHeight - (y + tooltipHeight) < 0) {
    y = y + (screenHeight - (y + tooltipHeight)) - 24
  } 

  if (screenWidth - (x + tooltipWidth) < 0) {
    x = x - tooltipWidth - 204
  }

  ttipWrapper
    .style('top', y+'px')
    .style('left', x+'px');
  
}

PlateD3.ttipMouseLeave = (ref) => () => {
  const wrapper = d3.select(ref.current)
  const plateCircle = wrapper.select('.plate-circle')
  const ttipWrapper = d3.select('.tooltip-wrapper')

  plateCircle
    .classed('stronger', false)

  ttipWrapper
    .classed('transparent', true)

}

PlateD3.setHoverEvents = (ref, params) => {
  d3.select(ref.current)
    .select('.tooltip-trigger')
    .on('mouseenter', PlateD3.ttipMouseEnter(ref, params))
    .on('mouseleave', PlateD3.ttipMouseLeave(ref))
}

PlateD3.update = (ref, params, isMobile) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')
  const svgWidth = +svg.style('width').replace('px', '')
  const svgHeight = +svg.style('height').replace('px', '')
  const center = svgWidth/2

  params.adjustWidthSensitive()


  if (!params.forceHasRun && params.width > 1) {
    PlateD3.drawDrops(ref, params, isMobile)
  }

  PlateD3.setHoverEvents(ref, params)
  PlateD3.drawCountryLabel(ref, params)

  

  // Transform country arcs
  svg
    .select('.countryG')
      .attr('transform', `translate(${center}, ${center})`)
      

  svg
    .select('.dropsG')
      .attr('transform', `translate(${center}, ${center})`)

  // Force Drops
  svg
    .selectAll('g.dropsG g.drop > g')
      .attr('transform', d => `scale(${params.transformScale(d.lmr)})`)

  

  // Reshape plate
  svg
    .selectAll('.plateG circle')
      .attr('cx', center)
      .attr('cy', center)

  svg
    .select('.plate-circle')
      .attr('r', center * params.plate.outerRadiusRatio)

  svg
    .select('.plate-circle-inner')
      .attr('r', center * params.plate.innerRadiusRatio)

  svg
    .select('.plateG line')
      .attr('x1', svgWidth * params.plate.lineRatio)
      .attr('y1', svgHeight * (1 - params.plate.lineRatio))
      .attr('x2', svgWidth * (1 - params.plate.lineRatio))
      .attr('y2', svgHeight * params.plate.lineRatio)


}   

PlateD3.destroy = (ref) => {
}