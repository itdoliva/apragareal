import { useParams } from "react-router-dom";
import * as d3 from 'd3';

export default class PlateParams {

  plate = {
    outerRadiusRatio: .8,
    innerRadiusRatio: .4,
    lineRatio: .15,
    gradient: [
      {offset: "0%",    color: "#FFFFFF"},
      {offset: "40%",   color: "#FFFFFF"},
      {offset: "65%",   color: "#FBFBFB"},
      {offset: "65%",   color: "#F6F6F6"},
      {offset: "95%",   color: "#FAFAFA"},
      {offset: "97.5%", color: "#FEFEFE"},
      {offset: "100%",  color: "#FEFEFE"},
    ]
  }

  #countryArcs = [
    {
      country:'eu',
      text: {en: 'European Union', br: 'União Europeia'},
      x: '25%',
      dy: '0',
      textAnchor: 'middle',
      arcConf: {
          innerRadius: 45, 
          outerRadius: 45,
          startAngle: -(90 * Math.PI/180),
          endAngle: (90 * Math.PI/180)
      }
    },
    {
      country:'br',
      text: {en: 'Brazil', br: 'Brasil'},
      x: '25%',
      dy: '7px',
      textAnchor: 'middle',
      arcConf: {
          innerRadius: 45, 
          outerRadius: 45,
          startAngle: (270 * Math.PI/180),
          endAngle: (90 * Math.PI/180),
      }
    }
  ]

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


  adjustWidthSensitive() {
    this.collideRadiusScale = this.getCollideRadiusScale()
    this.transformScale = this.getTransformScale()
    this.countryArcs = this.getCountryArcs()
    
    this.forceSimulation = this.getSimulation()
  }


  getDelta(d) {
    const delta = 45
    return d.legislacao === 'br' 
      ? delta 
      : -delta
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

  getCollideRadiusScale() {
    return d3.scaleLinear()
      .domain([.0, this.maxLMR])
      .range([(2.8/240) * this.width, (24.5/240) * this.width])
      .clamp(true)
  }

  getTransformScale() {
    return d3.scaleLinear()
      .domain([.0, this.maxLMR])
      .range([(.2/240) * this.width, (1.5/240) * this.width])
      .clamp(true)
  }


  getXForce() {
    return d3.forceX().x(d => this.getDelta(d)).strength(.05)
  }


  getYForce() {
    return d3.forceY().y(d => this.getDelta(d)).strength(.05)
  }


  getCollideForce() {
    const nodeRadius = (extra) => (d) => this.collideRadiusScale(d.lmr) + extra
    return d3.forceCollide(nodeRadius(1)).strength(1)
  }


  getRadialForceRadius() {
    return this.width > 0
      ? (65/240) * this.width 
      : 65
  }


  getRadialForce() {
    const radius = this.getRadialForceRadius()
    return d3.forceRadial(radius, 0, 0).strength(.8)
  }


  getSimulation() {
    return d3.forceSimulation(this.nodes)
      .force("collide", this.getCollideForce())
      .force("radius", this.getRadialForce())
      .force("x", this.getXForce())
      .force("y", this.getYForce())
      .velocityDecay(.75)
  }

  getCountryArcs() {
    const langId = this.languageId
    const radius = .427 * this.width
    return this.#countryArcs.map(d => ({
      key: `${d.country}-${langId}-${radius.toFixed(1)}`,
      ...d, 
      text: d.text[this.languageId],
      arcConf: {
        ...d.arcConf,
        innerRadius: radius, 
        outerRadius: radius
      }
    }))


  }


}