import * as d3 from 'd3';
import {ReactComponent as Skull} from '../../static/imgs/skull.svg';
import { useTranslation } from 'react-i18next';

const multiplierColor = d3.scaleLinear()
  .domain([1, 20])
  .range(['#C17373', '#C23838'])

  // `data` holds data for currently selected cultive
  export default function PestTable({ id, data, pesticides }) {
    const { t, i18n } = useTranslation()

    const rows = []
  
    pesticides.forEach(pesticide => {
      const { id, approved } = pesticide
  
      const f = data.filter(d => d.cd_ia === id)
  
      if (!f.length) { return }
  
      const br = f.find(d => d.legislacao === 'br')
      const eu = f.find(d => d.legislacao === 'eu')
  
      rows.push({
        id,
        label: t(`pesticides.${id}`),
        approved,
        euLMR: eu.lmr,
        brLMR: br.lmr,
        ratio: approved && eu.lmr > 0 ? br.ratio : false
      })
      
    })
    
    return (
    <div className="table">
  
      <div className="table-title">
        <span className="main">{t(`cultives.${id}`)}</span>
        <span className="sub">{t("mrl.initials")} - {t("mrl.name")}</span>
      </div>
  
      <div className="table-body">
        <div className="table-grid">
          <div className="table-grid--header table-grid--row">
            <div className="col col-name">{t("legend.color.value")}</div>
            <div className="col col-name">{t("country.eu.name")}</div>
            <div className="col col-name">{t("country.br.name")}</div>
            <div className="col"></div>
          </div>
  
          <div className="table-grid--body">
            <div className="table-grid--body__inner">
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
                      <span className="banned">{t("ban")}</span>
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
      </div>
  
    </div>
    )
  }