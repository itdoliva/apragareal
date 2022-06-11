import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import fruit from '../../../../static/imgs/banana.svg';
import getDrop from '../../functions/getDrop';
import './Plate.css';


export default function Plate({ cultive, data, nodes, extentLMR, language }) {

    const ref = useRef(null)

    useEffect(() => {
        PlateD3.create(ref, cultive, data, nodes, extentLMR, language)
        return PlateD3.destroy(ref)
    }, [])

    useEffect(() => {
        PlateD3.update(ref, language)
    }, [language])

    return (
        <li ref={ref} className="plate-wrapper">
            <div className="tooltip-trigger"></div>
            <img src={fruit} className="cultive-svg" alt={cultive} />
            <svg>
              <defs></defs>
            </svg>
            
        </li>
    )
}


const params = {}

params.plateRadiusRatio = .8
params.plateInnerRadiusRatio = .3
params.plateLineRatio = .15
params.plateGradient = [
  {offset: "0%",    color: "#FFFFFF"},
  {offset: "40%",   color: "#FFFFFF"},
  {offset: "65%",   color: "#FBFBFB"},
  {offset: "65%",   color: "#F6F6F6"},
  {offset: "95%",   color: "#FAFAFA"},
  {offset: "97.5%", color: "#FEFEFE"},
  {offset: "100%",  color: "#FEFEFE"},
]

params.countryArcRadius = { innerRadius: 100, outerRadius: 100 }
params.countryArcs = [
  {
    country:'eu',
    text: {en: 'European Union', br: 'União Europeia'},
    x: '25%',
    dy: '0',
    textAnchor: 'middle',
    arcConf: {
        ...params.countryArcRadius,
        startAngle: -(90 * Math.PI/180),
        endAngle: (90 * Math.PI/180)
    },
    color: 'none'
  },
  {
    country:'br',
    text: {en: 'Brazil', br: 'Brasil'},
    x: '25%',
    dy: '7px',
    textAnchor: 'middle',
    arcConf: {
        ...params.countryArcRadius,
        startAngle: (270 * Math.PI/180),
        endAngle: (90 * Math.PI/180),
    },
    color: 'none'
  }
]

params.dropArcRadius = { innerRadius: 70, outerRadius: 70 }
params.dropArcs = [
  {
    country:'eu',
    arcConf: {
      ...params.dropArcRadius,
      startAngle: -(180 - 45 - 10) * Math.PI/180,
      endAngle: (45 - 10) * Math.PI/180
    },
    color: 'cornflowerblue'
  },
  {
    country:'br',
    arcConf: {
      ...params.dropArcRadius,
      startAngle: (45 + 10) * Math.PI/180,
      endAngle: (180 + 45 - 10) * Math.PI/180
    },
    color: 'cornflowerblue'
  }
]


const PlateD3 = {}

PlateD3.arcGenerator = d3.arc()

// Drop Arcs
PlateD3.create = (ref, cultive, data, nodes, extentLMR, language) => {
    const wrapper = d3.select(ref.current)
    const svg = wrapper.select('svg')
    const ttipTrigger = wrapper.select('.tooltip-trigger')

    PlateD3.drawPlate(svg)
    PlateD3.drawCountryLabel(svg, language)
    PlateD3.drawDrops(svg, nodes, extentLMR)
    PlateD3.setHoverEvents(svg, ttipTrigger, cultive, data, extentLMR)

    // Update
    PlateD3.update(ref, data)
}

PlateD3.setHoverEvents = (svg, ttipTrigger, cultive, data, extentLMR) => {
  const barScale = d3.scaleLinear()
    .domain(extentLMR)
    .range([4, 120])

  const multiplierColor = d3.scaleLinear()
    .domain([1, 20])
    .range(['#C17373', '#C23838'])

  const tooltip = d3.select('.tooltip-wrapper')
  const plateCircle = svg.select('.plate-circle')


  ttipTrigger.on('mouseenter', function(d) {

    tooltip
        .classed('deactivate', false)
      .select('.tooltip-header-title')
        .text(cultive)

    plateCircle
      .classed('stronger', true)

    tooltip.selectAll('.tooltip-card')
      .each(function() {
        const ttCard = d3.select(this)

        const reg = /(?!card-)\d+/g
        const rank = +reg.exec(ttCard.attr('class'))

        const pest = data.find(d => d.rank === rank)

        ttCard
          .classed('deactivate', !pest)

        if (!pest) {
          return
        }

        const cardBR = ttCard.select('.br')
        const cardEU = ttCard.select('.eu')

        cardBR
        .select('.bar')
          .style('width', barScale(pest.brLMR) + 'px')

        cardBR
          .select('.lmr')
            .text(pest.brLMR)

        cardBR
          .select('.multiplier-wrapper')
            .style('background', multiplierColor(pest.ratio))
          .select('.multiplier')
            .text('x' + (pest.ratio >= 2 
                ? pest.ratio.toFixed(0)
                : pest.ratio.toFixed(1)
                ))

        cardEU
          .select('.bar')
            .style('width', barScale(pest.euLMR) + 'px')

        cardEU
          .select('.lmr')
            .text(pest.euLMR)
      })

    const screen = d3.select('.App')
    const screenWidth = +screen.style('width').replace('px', '')
    const screenHeight = +screen.style('height').replace('px', '')
    const tooltipWidth = +tooltip.style('width').replace('px', '')
    const tooltipHeight = +tooltip.style('height').replace('px', '')

    let x = d.x - d.offsetX + 222
    let y = d.y - d.offsetY + 168

    
    if (screenHeight - (y + tooltipHeight) < 0) {
      y = y + (screenHeight - (y + tooltipHeight)) - 126
    } 

    if (screenWidth - (x + tooltipWidth) < 0) {
      x = x - tooltipWidth - 222
    }
    

    tooltip
      .style('top', y+'px')
      .style('left', x+'px');
    
    
  })

  ttipTrigger.on('mouseleave', () => {
    tooltip
      .classed('deactivate', true)

    plateCircle
      .classed('stronger', false)
  })
}

PlateD3.drawPlate = (svg) => {
  const defs = svg.select('defs')
        
  //Create a radial plate-like gradient
  defs
    .append("radialGradient")
      .attr("id", "plate-gradient")
      .attr("cx", "50%")	//not really needed, since 50% is the default
      .attr("cy", "50%")	//not really needed, since 50% is the default
      .attr("r", "50%")	//not really needed, since 50% is the default
    .selectAll("stop")
      .data(params.plateGradient)
      .enter()
    .append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
  
  // Plate
  const platesG = svg
    .append('g')
      .attr('class', 'plateG')

  platesG
    .append('circle')
      .attr('class', 'plate-circle')
      .style('fill', 'url(#plate-gradient)')

  // Diagonal Line
  platesG
    .append('line')
      .attr('class', 'diagonal-line')

  // Inner Plate
  platesG
    .append('circle')
      .attr('class', 'plate-inner-circle')
  
}


PlateD3.drawCountryLabel = (svg, language) => {
  const countryG = svg
    .append('g')
      .attr('class', 'countryG')
    .selectAll('g')
      .data(params.countryArcs, d => language.id)
      .enter()
    .append('g')
  
  countryG
    .append('path')
      .attr('id', d => `country-arc-${d.country}`)
      .attr('d', d => PlateD3.arcGenerator(d.arcConf))
      .style('fill', d => d.color)
      .style('opacity', .2)
  
  countryG
    .append('text')
      .attr('dy', d => d.dy)
    .append('textPath')
      .attr('startOffset', d => d.x)
      .attr('xlink:href', d => `#country-arc-${d.country}`)
      .style('text-anchor', d => d.textAnchor)
      .text(d => d.text[language.id])
}


PlateD3.drawDrops = (svg, nodes, extentLMR) => {
  
  const dropsG = svg
    .append('g')
      .attr('class', 'dropsG')

  // Scales
  const collideRadius = d3.scaleLinear()
    .domain(extentLMR)
    .range([2.8, 20.5])
    .clamp(true)

  
  const transformScale = d3.scaleLinear()
    .domain(extentLMR)
    .range([.2, 1.3])
    .clamp(true)

  const nodeRadius = (extra) => (d) => collideRadius(d.lmr) + extra

  const delta =  45

  // Changing starting position
  nodes = nodes.map(d => ({
    ...d, 
    x: -5 + 10 * Math.random() + (d.id.includes('br') ? delta : -delta),
    y: -5 + 10 * Math.random() + (d.id.includes('br') ? delta : -delta)
  }))

  // Forces
  const xForce = d3.forceX()
    .x(d => d.id.includes('br') ? delta : -delta)
    .strength(.05)
    
  const yForce = d3.forceY()
    .y(d => d.id.includes('br') ? delta : -delta)
    .strength(.05)
  
  const collideForce = d3.forceCollide(nodeRadius(1))
    .strength(1)

  const radialForce = d3.forceRadial(60, 0, 0)
    .strength(.3)
    
  const simulation = d3.forceSimulation(nodes)
    .force("collide", collideForce)
    .force("radial", radialForce)
    .force("x", xForce)
    .force("y", yForce)
    .velocityDecay(.75)

  // Draw
  const nodeG = dropsG
    .append('g')
    .selectAll('g')
      .data(nodes)
      .enter()
    .append('g')
      .attr('class', 'drop')
      .attr('y', d => d.y - collideRadius(d.lmr))
      .attr('x', d => d.x - collideRadius(d.lmr))

    nodeG
      .each(function(d) {
        const drop = getDrop()

        const classNames = [
          'drop-shadow',
          'drop-' + d.rank,
          'drop-light-shadow',
          'drop-light-darker',
          'drop-light-lighter'
        ]

        const dropConf = drop.map((e, i) => [e, classNames[i]])

        d3.select(this)
          .append('g')
            .attr('transform', `scale(${transformScale(d.lmr)})`)
          .selectAll('path')
            .data(dropConf)
            .enter()
          .append('path')
            .attr('class', dd => dd[1])
            .attr('d', dd => dd[0])
      })
      
  simulation.on("tick", () => {
    nodeG
      .attr('transform', d => `translate(${d.x - collideRadius(d.lmr)}, ${d.y - collideRadius(d.lmr)})`)
  })

}


PlateD3.update = (ref, language) => {
  const svg = d3.select(ref.current).select('svg')
  const width = +svg.style('width').replace('px', '')
  const height = +svg.style('height').replace('px', '')
  const center = width/2
  const radius = center * params.plateRadiusRatio
  const innerRadius = center * params.plateInnerRadiusRatio

  svg
    .select('.countryG')
      .attr('transform', `translate(${center}, ${center})`)
    .selectAll ('text textPath')
      .text(d => d.text[language.id])

  svg
    .select('.dropsG')
      .attr('transform', `translate(${center}, ${center})`)

  // Reshape plate
  svg
    .selectAll('.plateG circle')
      .attr('cx', center)
      .attr('cy', center)

  svg
    .select('.plate-circle')
      .attr('r', radius)

  svg
    .select('.plate-inner-circle')
      .attr('r', innerRadius)

  svg
    .select('.plateG line')
      .attr('x1', width * params.plateLineRatio)
      .attr('y1', height * (1 - params.plateLineRatio))
      .attr('x2', width * (1 - params.plateLineRatio))
      .attr('y2', height * params.plateLineRatio)


}   

PlateD3.destroy = (ref) => {}