import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import fmtValueLabel from "../../functions/fmtValueLabel";
import './BarChart.scss';

function BarChart({ data, language}) {
  console.log(data, language)
    const ref = useRef(null)

    useEffect(() => {
        BarChartD3.create(ref, data, language)
    }, [])

    return (
        <svg className="barchart" ref={ref} />
    )
}

const BarChartD3 = {}

BarChartD3.create = (ref, data, language) => {
  const svg = d3.select(ref.current)

  const figurePad = 18
  const yticklabelWidth = 90
  const valueLabelWidth = 60
  const tickMargin = 8

  const width = +svg.style('width').replace('px', '')
  const height = +svg.style('height').replace('px', '')
  
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.id))
    .range([figurePad, height - 2*figurePad])
    .padding(.175)

  const bandwidth = yScale.bandwidth()

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.salesTon)*1.25])
    .range([0, width - 2*figurePad - yticklabelWidth - valueLabelWidth - 2*tickMargin])

  const xAxisGenerator = d3
    .axisTop(xScale)
    .ticks(5)
    .tickFormat(d3.format('.2s'), "+t")
    .tickSize(2)

  const figure = svg
    .append('g')
      .attr('class', 'figure')

  const canvas = figure
    .append('g')
      .attr('class', 'canvas')
      .attr('transform', `translate(${figurePad}, ${figurePad})`)
      .attr('width', width -2*figurePad)
      .attr('height', height -2*figurePad)

  const yticklabels = canvas
    .append('g')
      .attr('class', 'yaxis')
      .attr('transform', `translate(0, ${tickMargin})`)
    .append('g')
      .attr('class', 'yticklabels')

  const xaxis = canvas
    .append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(${yticklabelWidth + tickMargin}, ${figurePad + tickMargin*.5})`)
      .call(xAxisGenerator)
    .append('text')
      .attr('class', 'axislabel')
      .attr('x', xScale.range()[1]/2)
      .attr('y', 0)
      .attr('dy', -20)
      .text('Toneladas (t)')

  const plotarea = canvas
    .append('g')
      .attr('class', 'plotarea')
      .attr('transform', `translate(${yticklabelWidth + tickMargin}, ${tickMargin})`)

  const bars = plotarea
    .append('g')
      .attr('class', 'bars')

  const values = plotarea
    .append('g')
      .attr('class', 'values')

  const triggers = canvas
    .append('g')
      .attr('class', 'trigger')

  data.forEach(function(d) {

      const y = yScale(d.id)
      const barWidth = xScale(d.salesTon)

      const ticklabel = yticklabels
        .append('text')
          .attr('class', d.id)
          .attr('x', yticklabelWidth)
          .attr('y', y)
          .attr('dy', bandwidth*.5)
        .append('tspan')
          .attr('alignment-baseline', 'middle')
          .text(d.label.br)

      const bar = bars
        .append('rect')
          .attr('class', 'bar')
          .attr('y', y)
          .attr('width', barWidth)
          .attr('height', bandwidth)
          .attr('fill', d.color)

      const value = values
        .append('text')
          .attr('x', barWidth + tickMargin)
          .attr('y', y)
          .attr('dy', bandwidth*.5)
        .append('tspan')
          .attr('alignment-baseline', 'middle')
          .text(fmtValueLabel(d.salesTon, language.id))

      triggers
        .append('rect')
          .attr('x', 0)
          .attr('y', y)
          .attr('width', width)
          .attr('height', bandwidth)
          .on('mouseenter', function() {
            ticklabel.classed('strong', true)
            value.classed('strong', true)
            bar.classed('strong', true)
          })
          .on('mouseleave', function() {
            ticklabel.classed('strong', false)
            value.classed('strong', false)
            bar.classed('strong', false)
          })

    })
}


export default BarChart