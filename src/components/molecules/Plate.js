import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';

import getDropPathData from '../../lib/functions/getDropPathData';
import useContainerDimensions from '../../lib/hooks/useContainerDimensions';
import { selectIsMobile } from '../../features/mainSlice'

// Plate Props Example
// {
//   "id": "abobora",
//   "group": 1,
//   "img": { "src", "style" },
//   "isAvailable": true,
//   "isSelected": false,
//   "extent": [ 0.05, 1 ],
//   "data": [
//     { "id": "C18-abobora-br", "cd_ia": "C18", "legislacao": "br", "lmr": 0.1, "ratio": null }
//   ]
// }

export default function Plate(props) {
  const isMobile = useSelector(selectIsMobile)
  const { t, i18n } = useTranslation()

  const ref = useRef(null)
  const { size } = useContainerDimensions(ref)

  const plate = new PlateD3(ref, t, props.setPicked, { ...props, isMobile })

  useEffect(() => {
    plate.updateSizes(ref)
  }, [size])

  useEffect(() => {
    plate.translate()
  }, [i18n.language])
  
  useEffect(() => {
    plate.create()
  }, [])
    


  return (
    <div ref={ref} className="plate-wrapper">
        
      {!isMobile && (<div className="tooltip-trigger" />)}
        
      <svg>
        <defs>
          <radialGradient id="plate-gradient">
            <stop offset="0%" stopColor="#FFFFFF"></stop>
            <stop offset="40%" stopColor="#FFFFFF"></stop>
            <stop offset="65%" stopColor="#FBFBFB"></stop>
            <stop offset="65%" stopColor="#F6F6F6"></stop>
            <stop offset="95%" stopColor="#FAFAFA"></stop>
            <stop offset="97.5%" stopColor="#FEFEFE"></stop>
            <stop offset="100%" stopColor="#FEFEFE"></stop>
          </radialGradient>

        </defs>

        <g className="plateG">
          <circle className="plate-circle" fill="url(#plate-gradient)" ></circle>
          <line className="diagonal-line"></line>
          <circle className="plate-circle-inner"></circle>
        </g>
        <g className="countryG"></g>
        <g className="dropsG"></g>
      </svg>
        
      <div className="cultive-container">
        <img className="cultive-img" src={props.img.src} style={props.img.style} alt={props.name}/>
        <h1>{props.names}</h1>
      </div>
        
    </div>
  )
}


class PlateD3 {
  countryArcs = [
    { country:'eu', x: '25%', dy: '0', textAnchor: 'middle' },
    { country:'br', x: '25%', dy: '7px', textAnchor: 'middle' }
  ]

  plateProps = {
    outerRadiusRatio: .8,
    innerRadiusRatio: .4,
    lineRatio: .15,
  }

  arcGenerator = d3.arc()
    .innerRadius(45) // 45 as init value. Updates according to plate size
    .outerRadius(45) // 45 as init value. Updates according to plate size
    .startAngle(d => (d.country === 'br' ? 270 : -90) * Math.PI/180)
    .endAngle(90 * Math.PI/180)

   ttipMultiplierColor = d3.scaleLinear().domain([1, 20]).range(['#C17373', '#C23838'])


  constructor(ref, t, setPicked, { id, extent, data, isMobile }) {
    this.ref = ref
    this.isMobile = isMobile
    this.t = t
    this.setPicked = setPicked
    
    // -------- Data -------- //
    this.id = id
    this.extent = extent
    this.nodes = data.filter(d => d.lmr).map(d => ({
      ...d,
      x: (-5 + 10 * Math.random()) + this.getDelta(d),
      y: (-5 + 10 * Math.random()) + this.getDelta(d)
    }))


    // -------- Scales -------- //
    this.collideRadius = d3.scaleLinear().domain([0, extent[1]]).clamp(true)
    this.dropScale = d3.scaleLinear().domain([0, extent[1]]).clamp(true)
    this.ttipBarScale = d3.scaleLinear().domain([0, extent[1]]).range([0, 120])


    // -------- Simulation -------- //
    this.fCollide = d3.forceCollide().strength(1).radius(10)
    this.fRadius = d3.forceRadial().strength(.8).radius(65)
    this.fX = d3.forceX().x(d => this.getDelta(d)).strength(.05)
    this.fY = d3.forceY().y(d => this.getDelta(d)).strength(.05)
    
    this.simulation = d3.forceSimulation()
      .nodes(this.nodes)
      .force("collide", this.fCollide)
      .force("radius", this.fRadius)
      .force("x", this.fX)
      .force("y", this.fY)
      .velocityDecay(.75)
  }

  getDelta(d) {
    return 45 * (d.legislacao === 'br' ? 1 : -1)
  }

  create() {
    const wrapper = d3.select(this.ref.current)
    const svg = wrapper.select('svg')
    
    // -------- Country G -------- //
    const countryG = svg
      .select('g.countryG')
    
    const countryData = countryG.selectAll('g')
      .data(this.countryArcs, d => d.key)
  
    const countryEnter = countryData.enter()
      .append('g')
        .attr('class', 'countryG-arc')
    
    countryEnter
      .append('path')
        .style('opacity', .2)
        .attr('id', d => `country-arc-${d.country}`)
        .attr('d', this.arcGenerator)
  
    countryEnter
      .append('text')
        .attr('dy', d => d.dy)
      .append('textPath')
        .attr('startOffset', d => d.x)
        .attr('xlink:href', d => `#country-arc-${d.country}`)
        .style('text-anchor', d => d.textAnchor)

    this.translate()
  
  
    // -------- Drops G -------- //
  
    const dropsG = svg.select('g.dropsG')
  
    const nodeG = dropsG
      .selectAll('g.drop')
        .data(this.nodes, d => d.id) //`${d.id}-${params.width.toFixed(1)}`
        .enter()
      .append('g')
        .attr('class', d => `drop`)
        .attr('x', d => this.collideRadius(d.lmr))
        .attr('y', d => this.collideRadius(d.lmr))
        .attr('transform', 'translate(0, 0)')
  
    const drops = nodeG.append('g')
      .selectAll('path')
        .data(d => d3.zip([
          'drop-shadow',
          'pest-' + d.cd_ia,
          'drop-light-shadow',
          'drop-light-darker',
          'drop-light-lighter'
        ], getDropPathData()))
        .enter()
      .append('path')
        .attr('class', d => d[0])
        .attr('d', d => d[1])
  
      if (this.isMobile) {
        drops
          .style('opacity', 0)
          .transition()
          .delay(50)
          .duration(500)
          .style('opacity', 1)
      }
  
    let tick = 0
    const tickRate = !this.isMobile ? 4 : 1 
  
    this.simulation.on("tick", () => {
      if (tick % tickRate === 0) {
        nodeG.attr('transform', d => {
          const r = this.collideRadius(d.lmr)
          return `translate(${d.x - r}, ${d.y - r})`}
        )
      }
      tick++
    })

    // 
    d3.select(this.ref.current)
      .select('.tooltip-trigger')
      .on('mouseenter', (e) => {
        this.setPicked({ id: this.id, data: this.nodes, maxMRL: this.extent[1], e })
        
        d3.select(this.ref.current).select('svg').classed('hovered', true)
            
      })
      .on('mouseleave', () => {
        this.setPicked(undefined)
        d3.select(this.ref.current).select('svg').classed('hovered', false)
      })
  }


  updateSizes() {
    const wrapper = d3.select(this.ref.current)
    
    const width = +wrapper.style('width').replace('px', '')
    const height = +wrapper.style('height').replace('px', '')
    const svgSize = Math.min(width, height)
    
    const svg = wrapper.select('svg')
      .attr('width', svgSize)
      .attr('height', svgSize)
    
    const svgWidth = +svg.attr('width')
    const svgHeight = +svg.attr('height')
    const center = svgWidth/2
  
    this.arcGenerator
      .innerRadius(.427 * width)
      .outerRadius(.427 * width)

    this.collideRadius.range([(2.8/240) * width, (24.5/240) * width])
    this.dropScale.range([(.2/240) * width, (1.5/240) * width]) 
  
    this.fRadius.radius(width > 0 ? (65/240) * width : 65)
    this.fCollide.radius(((extra) => (d) => this.collideRadius(d.lmr) + extra)(1))
    

    svg
      .select('.dropsG')
        .attr('transform', `translate(${center}, ${center})`)
      .selectAll('g.drop > g')
        .attr('transform', d => {
          const scale = this.dropScale(d.lmr)
          return `scale(${scale})`
        })

    // Reshape plate
    svg
      .selectAll('.plateG circle')
        .attr('cx', center)
        .attr('cy', center)

    svg
      .select('.plate-circle')
        .attr('r', center * this.plateProps.outerRadiusRatio)

    svg
      .select('.plate-circle-inner')
        .attr('r', center * this.plateProps.innerRadiusRatio)

    svg
      .select('.plateG line')
        .attr('x1', svgWidth * this.plateProps.lineRatio)
        .attr('y1', svgHeight * (1 - this.plateProps.lineRatio))
        .attr('x2', svgWidth * (1 - this.plateProps.lineRatio))
        .attr('y2', svgHeight * this.plateProps.lineRatio)

    svg
      .select('.countryG')
        .attr('transform', `translate(${center}, ${center})`)
  }


  translate() {
    const wrapper = d3.select(this.ref.current)
    const svg = wrapper.select('svg')
  
    svg.selectAll('g.countryG > g > text > textPath')
      .text(d => this.t(`country.${d.country}.name`))
  }




  // const plateCircle = wrapper.select('.plate-circle')
    

}




PlateD3.update = (ref, params, isMobile) => {




  // if (!params.forceHasRun && params.width > 1) {
  //   PlateD3.drawDrops(ref, params, isMobile)
  // }

  // PlateD3.setHoverEvents(ref, params)
  // PlateD3.drawCountryLabel(ref, params)

  // // Transform country arcs
  // svg
  //   .select('.countryG')
  //     .attr('transform', `translate(${center}, ${center})`)
      


  

  // // Reshape plate
  // svg
  //   .selectAll('.plateG circle')
  //     .attr('cx', center)
  //     .attr('cy', center)

  // svg
  //   .select('.plate-circle')
  //     .attr('r', center * params.plate.outerRadiusRatio)

  // svg
  //   .select('.plate-circle-inner')
  //     .attr('r', center * params.plate.innerRadiusRatio)

  // svg
  //   .select('.plateG line')
  //     .attr('x1', svgWidth * params.plate.lineRatio)
  //     .attr('y1', svgHeight * (1 - params.plate.lineRatio))
  //     .attr('x2', svgWidth * (1 - params.plate.lineRatio))
  //     .attr('y2', svgHeight * params.plate.lineRatio)


}   

PlateD3.destroy = (ref) => {
}




class PlateParams {

  plate = {
    outerRadiusRatio: .8,
    innerRadiusRatio: .4,
    lineRatio: .15,
  }


  constructor(names, data, extent, width, languageId) {
    this.names = names
    this.width = width
    this.forceHasRun = false

    this.setLanguage(languageId)
    this.setData(data, extent)
    this.adjustWidthSensitive(width)
  }

  setLanguage(languageId) {
    this.name = this.names[languageId]
    this.languageId = languageId
  }

  setData(data, extent) {
    this.data = data
    this.extent = extent
    this.maxLMR = extent[1]
    
    this.nodes = this.getNodes()
  }


  getNodes() {
    return this.data
      .filter(d => d.lmr)
      .map(d => ({
        ...d,
        x: -5 + 10 * Math.random() + this.getDelta(d),
        y: -5 + 10 * Math.random() + this.getDelta(d)
      }))
  } 



}