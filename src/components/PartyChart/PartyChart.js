import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import raw from '../../static/data/data_votos_pl6299.json';
import './PartyChart.scss';

function PartyChart({ language }) {
    const ref = useRef(null)

    useEffect(() => {
        PartyChartD3.create(ref, language)
    }, [])

    return (
        <svg className="partychart" ref={ref} />
    )
}

const PartyChartD3 = {}

PartyChartD3.create = (ref, language) => {

  let root = { id: 'Root', category: 'root', children: [] }
  d3.group(raw, d => d.partido)
    .forEach((deputies, partyName) => {
      const children = deputies.map(d => ({ id: d.nome, category: 'deputy', party: partyName, uf: d.uf, voto: d.voto, wing: d.ideologia }) )
      const partido = { id: partyName, category: 'party', children, wing: children[0].wing }

      root.children.push(partido)
    })
    
  const width = 400
  const height = 400
  const margin = { top: 60, right: 30, bottom: 30, left: 30 }

  root = d3.hierarchy(root, d => d.children)
    .sum(d => 1)

  const packLayout = d3.pack()
    .size([width, height])
    .padding(4)

  packLayout(root)
  
  const svg = d3.select(ref.current)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  const packG = svg
    .append('g')
      .attr('class', 'pack-g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

  const cell = packG
    .selectAll('circle')
      .data(root.descendants())
      .enter()
    .append('circle')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
      .attr('stroke-width', 0)
      .attr('fill', d => {
        const category = d.data.category
        const wing = d.data.wing
        if (category === 'root') { return 'none' } else 
        if (category === 'party' && wing === 'Centro') { return '#b4d2ee' } else
        if (category === 'party' && wing === 'Esquerda') { return '#f79b8b' } else
        if (category === 'party' && wing === 'Direita') { return '#ffd281' } else
        { return 'white' }

        if (wing === 'Centro') { return '#4185c5' } else
        if (wing === 'Esquerda') { return '#d14564' } else
        if (wing === 'Direita') { return '#d3a85a' }

      })
      .attr('opacity', d => {
        const category = d.data.category
        const voto = d.data.voto
        if (category === 'party') { 
          return .8
         } else { return .6 }
      })
      .attr('stroke', d => {
        const category = d.data.category
        const voto = d.data.voto
        if (category != 'deputy') {
          return 'none'
        } else if (voto === 'Sim') {
          return 'cornflowerblue'
        } else {
          return 'darkorange'
        }
      })
      .attr('stroke-width', 3)


    

}

export default PartyChart