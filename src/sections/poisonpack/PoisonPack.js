import { useState, useEffect } from "react"
import rawVotes from "../../static/data/data_votos_pl6299.json"
import * as d3 from 'd3'
import { useSelector } from 'react-redux'

import { selectIsMobile } from '../../features/mainSlice'
import { useTranslation } from "react-i18next"

const votesArr = ["yes", "not", "out"]

export default function PoisonPack() {

  const { i18n, t } = useTranslation()

  const isMobile = useSelector(selectIsMobile)

  const ttInitStyle = {
    opacity: 0,
    top: '0%',
    left: '0%'
  }

  const [ ttStyle, setTtStyle ] = useState(ttInitStyle)

  const deputies = d3.hierarchy(rawVotes, d => d.children)

  // Add id to deputies
  deputies.leaves().forEach((node) => {
    const id = node.data.name
      .toLowerCase()
      .replace(/\s+/g, '')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    node.data.id = id
  })

  window.data = deputies

  const getNode = (id) => {
    return id 
      ? deputies.find(d => d.data.id === id)
      : deputies.find(d => d.data.id === 'root')
  }

  const getParentIfDeputy = (node) => node.data.category === 'deputy'
    ? node.parent
    : node

  const [ selected, setSelected ] = useState(getNode())

  const getSetSelected = (id) => () => setSelected(getNode(id))

  const getVotes = (node) => {
    const deputies = node.leaves()
    const total = deputies.length

    const votes = { total }
    votesArr.forEach(vote => {
      const voteCount = deputies.filter(dep => dep.data.vote === vote).length
      votes[vote] = voteCount
    })

    return votes
  }

  const [ votes, setVotes ] = useState(getVotes(getParentIfDeputy(selected)))

  useEffect(() => {
    setVotes(getVotes(getParentIfDeputy(selected)))
  }, [ selected ])


  const onMouseOut = () => {
    setSelected(getNode())
    
    setTtStyle(ttInitStyle)
  }

  return (
    <section className="text deputy">

      <h4 className={!isMobile ? "text-align-center" : ''}>
        {i18n.resolvedLanguage === "pt"
        ? "Câmara dos Deputados, Fevereiro 2022"
        : "Chamber of Deputies, February 2022"
        }
      </h4>

      <h2 className={!isMobile ? "text-align-center" : ''}>
      {i18n.resolvedLanguage === "pt"
        ? "Votação do Pacote do Veneno"
        : "Voting on the Poison Package"
        }
        
      </h2>

      {i18n.resolvedLanguage === "pt"
      ? (
        <p>Como se o alto grau de permissividade já não fosse insuportável, no dia 09 de Fevereiro de 2022, a maioria dos parlamentares brasileiros votou a favor da flexibilização dos critérios de controle e de autorização dessas substâncias por meio do <span className="strong">Projeto de Lei 6299/2002</span>, conhecido como PL do Veneno. Seguindo esta rota, o Brasil destrói as possibilidades para retirá-lo da lamentável e cruel posição ocupada desde 2008: o maior consumidor de agrotóxicos no mundo. <a target="_blank" className="link" href="https://www.dw.com/pt-br/o-que-est%C3%A1-em-jogo-no-pl-do-veneno/a-60738016">Saiba o que está em jogo na PL do Veneno</a>.</p>
      )
      : (
        <p>As if the high degree of permissiveness were not already unbearable, most Brazilian lawmakers voted in favor of relaxing the criteria for control and authorization of these substances through <span className="strong">Bill 6299/2002</span>. In this conjuncture, Brazil destroys the possibilities of removing itself from the lamentable and cruel position occupied since 2008: the world's largest consumer of pesticides.</p>
      )
      }

      

      <div className="deputy center-panel">

        <div className="legend-panel">
          {votesArr.map((vote, i) => (
            <div key={i} className="legend">
              <div className={"legend--square " + vote} />
              <span className="legend--label">{t(`votes.${vote}`)}</span>
            </div>
          ))}
        </div>


        <div className="main-panel">

          <h2 className="text-align-center">
            {getParentIfDeputy(selected).data.id === "root" ? t("plenary") : getParentIfDeputy(selected).data.name}
          </h2>

          <div className="bars">
            {votesArr.map((vote, i) => {
              const votePct = votes[vote] / votes.total
              const width = Math.round(100 * votePct * 10)/10 + '%'
              const label = Math.round(100 * votePct) + '%'
              let xtraClass = ''
              if (votePct <= .01) {
                xtraClass += 'none'
              } else if (votePct < .1) {
                xtraClass += 'hidden'
              }

              return (
                <div key={i} className={`bar ${vote} ${xtraClass}`} 
                style={{ width }}>
                  <span className="bar--label">{label}</span>
                </div>
              )
            })}
          </div>

          <div className="big-numbers">
            {votesArr.map((vote, i) => (
              <div key={i} className="big-number">
                <div className={`big-number--square ${vote}`} />
                <span className="big-number--label">{votes[vote]}</span>
              </div>
            ))}
          </div>

        </div>

        <div className="scroll">
          <div className="wing-grid">

            {deputies.children.map((wing, i) => (
              <h5 key={i} className="text-align-center" style={{gridColumn: i+1}}>
                {t(`wing.${wing.data.id}`)}
              </h5>
            ))}

            {deputies.children.map((wing, i) => (
              <div key={i} className="parties">
                {wing.children.map((d, j) => {
                  const { id, name } = d.data
                  const isHovered = getParentIfDeputy(selected).data.id === id
                  
                  return (
                    <span 
                      key={j}
                      onMouseOver={getSetSelected(id)} 
                      onMouseOut={onMouseOut} 
                      className={"party--label" + (isHovered ? ' hovered' : '')}>
                      {name}
                    </span>
                  )
                })}
              </div>
            ))}

            {deputies.children.map((wing, i) => (

              <div key={i} className="deputy-grid">
                {wing.leaves().map((deputy, j) => {
                  const partyId = deputy.parent.data.id
                  const { id, vote } = deputy.data
                  
                  const isFaden = (
                    selected.data.id !== 'root' && 
                    getParentIfDeputy(selected).data.id !== partyId
                  )
                  
                  return (
                    <div 
                      key={j}
                      className={"cell" + (isFaden ? ' faden' : '')}
                      onMouseOver={(e) => {
                        setSelected(getNode(id))
                        setTtStyle({ 
                          opacity: '100%', 
                          left: e.clientX + 'px', 
                          top: e.clientY + 'px'
                        })
                      }} 
                      onMouseOut={onMouseOut} >
                        <div className={`cell--square ${vote}`} />
                    </div>
                  )
                })}
              </div>
              
            ))}

          </div>
        </div>

      </div>

      {!isMobile && (
      <div style={ttStyle} className="deputy-tooltip">

        <span className="deputy-tooltip--party">
          {getParentIfDeputy(selected).data.name} - {selected.data.uf}
        </span>

        <span className="deputy-tooltip--name">
          {selected.data.name}
        </span>

      </div>
      )}

    </section>
  )
}