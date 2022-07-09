import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import getDrop from '../../functions/getDrop';
import './Plate.css';


export default function Plate({ language, cultivo, names, extent, img, data, margins }) {

    const ref = useRef(null)

    const [name, setName] = useState(names[language.id])

    useEffect(() => {
        PlateD3.create(ref, name, data, language, extent)
        return PlateD3.destroy(ref)
    }, [])

    useEffect(() => {
        const newName = names[language.id]
        PlateD3.update(ref, newName, data, language, extent)
        setName(newName)
    }, [language])

    return (
        <li 
          ref={ref} 
          className="plate-wrapper"
          style={{marginLeft: margins.left, marginRight: margins.right}}>
            <div className="tooltip-trigger" />
            <svg className="plate-svg">
              <defs />
            </svg>

            <img src={img.src} style={img.style} className="cultive-svg" alt={name}/>

            <div className="drops-wrapper" />
        </li>
    )
}


const params = {}

params.plateRadiusRatio = .8
params.plateInnerRadiusRatio = .4
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

PlateD3.selections = {}

PlateD3.arcGenerator = d3.arc()

// Drop Arcs
PlateD3.create = (ref, name, data, language, extent) => {
    PlateD3.drawPlate(ref)
    PlateD3.drawCountryLabel(ref, language)
    PlateD3.drawDrops(ref, data, extent)
    PlateD3.setHoverEvents(ref, name, data, extent)
}

PlateD3.drawPlate = (ref) => {
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
      .data(params.plateGradient)
      .enter()
    .append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
  
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
      .attr('class', 'plate-inner-circle')
  
}

PlateD3.drawCountryLabel = (ref, language) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')

  const countryG = svg
    .append('g')
      .attr('class', 'countryG')
    .selectAll('g')
      .data(params.countryArcs, () => language.id)
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

PlateD3.drawDrops = (ref, data, extentLMR) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')

  const dropsG = svg
    .append('g')
      .attr('class', 'dropsG')

  // Scales
  const collideRadius = d3.scaleLinear()
    .domain([0, extentLMR[1]])
    .range([2.8, 24.5])
    .clamp(true)

  
  const transformScale = d3.scaleLinear()
    .domain([0, extentLMR[1]])
    .range([.2, 1.5])
    .clamp(true)

  const nodeRadius = (extra) => (d) => collideRadius(d.lmr) + extra

  const delta =  45

  // Changing starting position
  const nodes = data.filter(d => d.lmr).map(d => ({
    ...d, 
    x: -5 + 10 * Math.random() + (d.legislacao === 'br' ? delta : -delta),
    y: -5 + 10 * Math.random() + (d.legislacao === 'br' ? delta : -delta)
  }))

  // Forces
  const xForce = d3.forceX()
    .x(d => d.legislacao === 'br'? delta : -delta)
    .strength(.05)
    
  const yForce = d3.forceY()
    .y(d => d.legislacao === 'br' ? delta : -delta)
    .strength(.05)
  
  const collideForce = d3.forceCollide(nodeRadius(1))
    .strength(1)

  const radialForce = d3.forceRadial(65, 0, 0)
    .strength(.8)
    
  const simulation = d3.forceSimulation(nodes)
    .force("collide", collideForce)
    .force("radial", radialForce)
    .force("x", xForce)
    .force("y", yForce)
    .velocityDecay(.75)

  // // Draw
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
          'pest-' + d.cd_ia,
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

PlateD3.ttipMouseEnter = (ref, name, data, extent) => function(d) {
  const wrapper = d3.select(ref.current)
  const plateCircle = wrapper.select('.plate-circle')
  const ttipWrapper = d3.select('.tooltip-wrapper')

  const barScale = d3.scaleLinear()
    .domain([0, extent[1]])
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
      .text(() => name)

  ttipWrapper.selectAll('.tooltip-card')
    .each(function() {
      const ttCard = d3.select(this)

      const reg = /(?!card-)\w\d+/g
      const cd_ia = reg.exec(ttCard.attr('class'))[0]

      const pestBR = data.find(d => d.cd_ia === cd_ia && d.legislacao === "br")
      const pestEU = data.find(d => d.cd_ia === cd_ia && d.legislacao === "eu")

      ttCard
        .classed('deactivate', !pestBR)

      const cardBR = ttCard.select('.br')
      const cardEU = ttCard.select('.en')

      if (pestBR && pestBR.lmr) {
        cardBR
          .select('.bar')
            .style('width', 2 + barScale(pestBR.lmr) + 'px')

        cardBR
          .select('.lmr')
            .text(pestBR.lmr)

        if (pestBR.ratio) {
          cardBR
            .select('.multiplier-wrapper')
              .style('background', multiplierColor(pestBR.ratio))
            .select('.multiplier')
              .text('x' + (pestBR.ratio >= 2 
                  ? pestBR.ratio.toFixed(0)
                  : pestBR.ratio.toFixed(1)
                  ))
        }
        
      }
    
      if (pestEU && pestEU.lmr) {
        cardEU
          .select('.bar')
            .style('width', 2 + barScale(pestEU.lmr) + 'px')

        cardEU
          .select('.lmr')
            .text(pestEU.lmr)
      } else if (pestEU && !pestEU.lmr) {
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
    y = y + (screenHeight - (y + tooltipHeight)) - 126
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

PlateD3.setHoverEvents = (ref, name, data, extent) => {
  d3.select(ref.current)
    .select('.tooltip-trigger')
    .on('mouseenter', PlateD3.ttipMouseEnter(ref, name, data, extent))
    .on('mouseleave', PlateD3.ttipMouseLeave(ref))
}


PlateD3.update = (ref, name, data, language, extent) => {
  const wrapper = d3.select(ref.current)
  const svg = wrapper.select('svg')
  const width = +svg.style('width').replace('px', '')
  const height = +svg.style('height').replace('px', '')
  const center = width/2
  const radius = center * params.plateRadiusRatio
  const innerRadius = center * params.plateInnerRadiusRatio

  PlateD3.setHoverEvents(ref, name, data, extent)

  // Update country arcs
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

PlateD3.destroy = (ref) => {
}