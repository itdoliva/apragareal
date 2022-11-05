import * as d3 from 'd3';
import {ReactComponent as Skull} from '../../static/imgs/skull.svg';

const multiplierColor = d3.scaleLinear()
  .domain([1, 20])
  .range(['#C17373', '#C23838'])

export default function TooltipTable({ data, name, pesticides, language }) {

  const pivot = d3.group(data, d => d.cd_ia)
  window.data = pivot

  const rows = []

  pesticides.forEach(d => {
    const { id, label, approved } = d

    const arr = pivot.get(id)

    if (!arr) { return }

    const br = arr.find(d => d.legislacao === 'br')
    const eu = arr.find(d => d.legislacao === 'eu')

    rows.push({
      id,
      label: label[language.id],
      approved,
      euLMR: eu.lmr,
      brLMR: br.lmr,
      ratio: approved && eu.lmr > 0 ? br.ratio : false
    })
    
  })
  
  return (
  <div className="table">

    <h3>{name[language.id]}</h3>
    <h6>{language.lmr.short} - {language.lmr.long}</h6>

      <div className="table-grid">
        <div className="table-grid--header table-grid--row">
          <div className="col col-name">{language.legendLabel.color.value}</div>
          <div className="col col-name">{language.countryLabel.en.long}</div>
          <div className="col col-name">{language.countryLabel.br.long}</div>
          <div className="col"></div>
        </div>

        <div className="table-grid--body">
          {rows.map(d => (
            <div key={d.id} className="table-grid--row">

              <div className={`col col-value  col-${d.id}`}>
                <span>{d.label}</span>
              </div>

              {d.approved 
              ? (
                <div className="col col-value">
                  <span>{d.euLMR}</span>
                  <span className="measure-unit">mg/kg</span>
                </div>
              ) : (
                <div className="col col-value">
                  <span className="banned">{language.ban}</span>
                </div>
              )}
              
              <div className="col col-value">
                <span>{d.brLMR}</span>
                <span className="measure-unit">mg/kg</span>
              </div>

              <div className="col col-multiplier">


              {(d.approved && d.ratio > 0) && (
                <div 
                className="multiplier-wrapper" 
                style={{backgroundColor: multiplierColor(d.ratio)}}>
                  <span className="multiplier">{`x${d.ratio}`}</span>
                </div>
              )}

              {(d.approved && !d.ratio) && (
                ''
              )}

              {!d.approved && (
                <div className="skull-wrapper">
                  <Skull />
                </div>
              )}
                
              </div>

            </div>
          ))}
        </div>

      </div>
        
  </div>
  )
}