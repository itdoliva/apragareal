import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import fruit from '../../../../static/imgs/banana.svg';
import './Plate.css';


export default function Plate({ cultive, data, nodes, extentLMR }) {

    const ref = useRef(null)

    useEffect(() => {
        PlateD3.create(ref, data, nodes, extentLMR)
        return PlateD3.destroy(ref)
    }, [])

    useEffect(() => {
        PlateD3.update(ref, data, nodes)
    }, [data])

    return (
        <li ref={ref} className="plate-wrapper">
            <img src={fruit} className="cultive-svg" alt={cultive} />
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
    text: 'European Union',
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
    text: 'Brazil',
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
PlateD3.create = (ref, data, nodes, extentLMR) => {
    const svg = d3.select(ref.current).append('svg')

    PlateD3.drawPlate(svg)
    PlateD3.drawCountryLabel(svg)
    PlateD3.drawDrops(svg, nodes, extentLMR)

    // Update
    PlateD3.update(ref, data)
}


PlateD3.drawPlate = (svg) => {
  const defs = svg.append('defs')
        
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


PlateD3.drawCountryLabel = (svg) => {
  const countryG = svg
    .append('g')
      .attr('class', 'countryG')
    .selectAll('g')
      .data(params.countryArcs)
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
      .text(d => d.text)
}


PlateD3.drawDrops = (svg, nodes, extentLMR) => {
  
  const dropsG = svg
    .append('g')
      .attr('class', 'dropsG')

  // Scales
  const dropScale = d3.scaleLinear()
    .domain(extentLMR)
    .range([3, 18])
    .clamp(true)

  const nodeRadius = (extra) => (d) => dropScale(d.lmr) + extra

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
  
  const collideForce = d3.forceCollide(nodeRadius(2))
    .strength(1)

  const radialForce = d3.forceRadial(60, 0, 0)
    .strength(.3)
    
  const simulation = d3.forceSimulation(nodes)
    .force("collide", collideForce)
    .force("radial", radialForce)
    .force("x", xForce)
    .force("y", yForce)
    

  // Draw
  const nodeG = dropsG
    .append('g')
    .selectAll("circle")
      .data(nodes)
      .enter()
    .append('circle')
      .attr('class', d => 'drop-' + d.rank + ' ' + d.legislacao)
      .attr("r", nodeRadius(0))
      .attr('y', d => d.y)
      .attr('x', d => d.x)
      
  simulation.on("tick", () => {
    nodeG
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
})

}


PlateD3.update = (ref, data) => {
  const svg = d3.select(ref.current).select('svg')
  const width = +svg.style('width').replace('px', '')
  const height = +svg.style('height').replace('px', '')
  const center = width/2
  const radius = center * params.plateRadiusRatio
  const innerRadius = center * params.plateInnerRadiusRatio
  
  svg
    .select('.countryG')
      .attr('transform', `translate(${center}, ${center})`)

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