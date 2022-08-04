import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../static/imgs/apragareal.svg';
import pesticides from '../../static/data/data_pesticides.json';
import profilePicture from '../../static/imgs/profile.png';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import fmtValueLabel from "./functions/fmtValueLabel";

import './style.scss';

function About({ language, changeLanguage }) {
  const ref = useRef(null)

  useEffect(() => {
    BarChartD3.create(ref, language)
  }, [])

  return (
    <div className="about-page">

    <header>

      <div className="header-wrapper">
        <Logo className="app-logo" color="white"/>
        <div className="colorful-border">
            {pesticides.filter(d => d.show).map(d => (
              <div key={d.id} className={'pest-' + d.id}></div>
            ))}
          </div>
        
        <div className='background'>
          <div className='background-image'/>
        </div>

        <ul className="menu">
          <li><Link to="/" >Home</Link></li>
          <li><button onClick={changeLanguage}>{language.name}</button></li>
        </ul>
      </div>
      
    </header>

    <section>

      <div className="quotation">
        <p className="quote">&quot;{language.quote}&quot;</p>
        <p className="author">&mdash; Jean Rostand</p>
      </div>

      <div className="paragraph-wrapper">
        {language.aboutMainText.map((d, i) => (
          <p key={i + d.slice(0, 3).toLowerCase()}>{d}</p>
        ))}
      </div>
      
    </section>

    <section>
      <h1>SOBRE OS DADOS</h1>
      <div className="paragraph-wrapper">
        <h4>Ingredientes Ativos mais utilizados no Brasil</h4>
        <p>Ingrediente Ativo (IA) ou Princípio Ativo é a principal substância química que confere propriedades biocidas a um agrotóxico.</p>
        <p>O IBAMA fornece a <a className="weblink" target="_blank" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos">lista</a> dos 10 IA mais vendidos em toneladas no Brasil por ano. Em Junho de 2022, a lista mais recente encontrada foi referente ao ano de 2020.</p>
        
        <div className="listwrapper">
          <h5>Os 10 Ingredientes Ativos mais vendidos no Brasil em 2020</h5>
          <svg className="barchart" ref={ref}></svg>
        </div>
        <p>Sob a ausência de dados dos IA mais utilizados nas lavouras brasileiras, a lista acima foi adotada como representante dos IA mais utilizados.</p>
        
        <h4>Limite Máximo de Resíduos no Brasil e na União Europeia</h4>
        <p>O parâmetro estabelecido para determinar a concentração máxima de agrotóxicos nos alimentos que chegam às nossas mesas se chama Limite Máximo de Resíduos (LMR).</p>
        <p>Cada país possui parâmetros específicos para cada agrotóxico e cultivo. No Brasil, os LMR são determinados pela Anvisa e podem ser consultados e baixados através deste <a className="weblink" target="_blank" href="https://www.gov.br/anvisa/pt-br/acessoainformacao/dadosabertos/informacoes-analiticas/monografias-de-agrotoxicos">dashboard</a>.</p>
        <p>A União Europeia conta com uma seção bem estruturada do site governamental destinada apenas às informações sobre agrotóxicos. Por isso, o processo de obtenção da informação estrangeira foi mais fácil que a nacional. Os dados de LMR da União Europeia podem ser obtidos através deste <a className="weblink" target="_blank" href="https://ec.europa.eu/food/plant/pesticides/eu-pesticides-database/mrls/?event=search.pr">link</a>.</p>

        <h4>Limpeza e Filtragem</h4>
        <p>Após a coleta em Junho de 2022 dos dados acima, filtrou-se os cultivos tratados no Brasil e na União Europeia com pelo menos um dos 10 IA mais utilizados no Brasil.</p>
      </div>
    </section>

    <section>
      <h1>SOBRE MIM</h1>
      <div className="columns">
          <img src={profilePicture}/>
        <div className="paragraph-wrapper">
          <p>Italo Oliveira é engajado com causas ambientais e de saúde social. Grande admirador dos mares, dos fenômenos climáticos e da dança contemporânea, deseja que o futuro seja possível e justo. Por isso, adotou o veganismo como estilo de vida e se esforça para levá-lo adiante.</p>
          <p>Busca unir sua especialidade em comunicação visual ao desejo de viver transformações sociais e socioeconômicas, pois compreende que mudanças em uma sociedade ocorrem por pressão de um povo informado com fatos.</p>
        </div>
      </div>
    </section>

  </div>
  );
}

const BarChartD3 = {}

BarChartD3.create = (ref, language) => {
  const svg = d3.select(ref.current)

  const figurePad = 18
  const yticklabelWidth = 90
  const valueLabelWidth = 60
  const tickMargin = 8

  const width = +svg.style('width').replace('px', '')
  const height = +svg.style('height').replace('px', '')
  
  const yScale = d3.scaleBand()
    .domain(pesticides.map(d => d.id))
    .range([figurePad, height - 2*figurePad])
    .padding(.175)

  const bandwidth = yScale.bandwidth()

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(pesticides, d => d.salesTon)*1.25])
    .range([0, width - 2*figurePad - yticklabelWidth - valueLabelWidth - 2*tickMargin])

  const xAxisGenerator = d3
    .axisTop(xScale)
    .ticks(5)
    .tickFormat(d3.format('.2s'))
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
    .append('g')
      .attr('class', 'yticklabels')

  const xaxis = canvas
    .append('g')
      .attr('class', 'xaxis')
      .attr('transform', `translate(${yticklabelWidth + tickMargin}, ${figurePad - tickMargin})`)
      .call(xAxisGenerator)

  const plotarea = canvas
    .append('g')
      .attr('class', 'plotarea')
      .attr('transform', `translate(${yticklabelWidth + tickMargin}, 0)`)

  const bars = plotarea
    .append('g')
      .attr('class', 'bars')

  const values = plotarea
    .append('g')
      .attr('class', 'values')

  const triggers = canvas
    .append('g')
      .attr('class', 'trigger')

  pesticides.forEach(function(d) {

      const y = yScale(d.id)
      const barWidth = xScale(d.salesTon)

      const ticklabel = yticklabels
        .append('text')
          .attr('class', d.id)
          .attr('x', yticklabelWidth)
          .attr('y', y)
          .attr('dy', bandwidth*.75)
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
          .attr('dy', bandwidth*.75)
          .text(fmtValueLabel(d.salesTon, language.id))

      triggers
        .append('rect')
          .attr('x', 0)
          .attr('y', y)
          .attr('width', width)
          .attr('height', bandwidth)
          .on('mouseenter', () => {
            ticklabel.classed('strong', true)
            value.classed('strong', true)
            bar.classed('strong', true)
          })
          .on('mouseleave', () => {
            ticklabel.classed('strong', false)
            value.classed('strong', false)
            bar.classed('strong', false)
          })

    })
}

export default About;
