import { useEffect, useRef } from 'react';
import { ParentsizeSVG } from '@cutting/svg';
import * as d3 from 'd3';
import fruit from '../../../../static/imgs/banana.svg';
import './Plate.css';

const params = {
    plateRadius: .8,
    plateInnerRadius: .3,
    line: .15,

}


export default function Plate(props) {

    const ref = useRef(null)
    const imgRef = useRef(null)

    useEffect(() => {
        PlateD3.create(ref, imgRef, props.cultive, props.pestData)
        return PlateD3.destroy(ref)
    }, [])

    useEffect(() => {
        PlateD3.update(ref, props.cultive, props.pestData)
    }, [props.pestData])

    return (
        <div ref={ref} className="plate-wrapper">
            {/* <img ref={imgRef} src={fruit} className="app-logo" alt="Logo de APRAGAREAL" /> */}
        </div>
    )
}

const PlateD3 = {}

PlateD3.create = (ref, imgRef, cultive, pestData) => {
    const svg = d3.select(ref.current).append('svg')

    // Defs
    const defs = svg.append('defs')
    
    //Create a radial plate-like gradient
    defs.append("radialGradient")
        .attr("id", "plate-gradient")
        .attr("cx", "50%")	//not really needed, since 50% is the default
        .attr("cy", "50%")	//not really needed, since 50% is the default
        .attr("r", "50%")	//not really needed, since 50% is the default
    .selectAll("stop")
        .data([
                {offset: "0%", color: "#FFFFFF"},
                {offset: "40%", color: "#FFFFFF"},
                {offset: "65%", color: "#FBFBFB"},
                {offset: "65%", color: "#F6F6F6"},
                {offset: "95%", color: "#FAFAFA"},
                {offset: "97.5%", color: "#FEFEFE"},
                {offset: "100%", color: "#FEFEFE"},
            ])
        .enter()
        .append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });
    

    // Plate
    const platesG = svg.append('g')
        .attr('class', 'plateG')

    platesG.append('circle')
        .attr('class', 'plate-circle')
        .style('fill', 'url(#plate-gradient)')

    // Line
    platesG.append('line')
        .attr('class', 'diagonal-line')

    // Inner Plate
    platesG.append('circle')
        .attr('class', 'plate-inner-circle')


    // Update
    PlateD3.update(ref, cultive, pestData)
}

PlateD3.update = (ref, cultive, pestData) => {
    const svg = d3.select(ref.current).select('svg')
    const width = +svg.style('width').replace('px', '')
    const height = +svg.style('height').replace('px', '')
    const center = width/2
    const radius = center * params.plateRadius
    const innerRadius = center * params.plateInnerRadius

    // Reshape plate
    svg.selectAll('.plateG circle')
        .attr('cx', center)
        .attr('cy', center)

    svg.select('.plate-circle')
        .attr('r', radius)

    svg.select('.plate-inner-circle')
        .attr('r', innerRadius)

    svg.select('.plateG line')
        .attr('x1', width * params.line)
        .attr('y1', height * (1-params.line))
        .attr('x2', width * (1-params.line))
        .attr('y2', height * params.line)

}   

PlateD3.destroy = (ref) => {}