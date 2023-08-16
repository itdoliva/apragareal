import { ReactComponent as Skull } from '../../static/imgs/skull.svg';
import { useTranslation } from 'react-i18next';
import { ratioToStr } from '../../lib/utils/fmtstr';
import * as d3 from 'd3';

const multiplierColor = d3.scaleLinear()
  .domain([1, 20])
  .range(['#C17373', '#C23838'])

const barWidth = d3.scaleLinear()
  .range([0, 120])

function TooltipCard({ pesticide, maxMRL, data, e }) {
  const { t, i18n } = useTranslation()
  const { id, approved } = pesticide

  const countries = ["br", "eu"]

  if (maxMRL) {
    barWidth.domain([0, maxMRL])
  }

  return (
    <div className={`tooltip-card card-${id} ${!data.length ? 'deactivate' : ''}`}>
      
      <div className="tooltip-card-header">
        {t(`pesticides.${id}`)}
      </div>

      <div className="tooltip-card-body">
        
        {countries.map(country => {
          const datum = data.find(d => d.legislacao === country)

          // Bar Width
          const width = (datum ? 2 + barWidth(datum.lmr) : 0) + 'px'

          const ratio = datum?.ratio ? datum.ratio : 0
          
          return (
            <div key={pesticide.id + '-' + country} className="tooltip-card-row">

              <span className="country-label">
                {t(`country.${country}.short`)}
              </span>

              {country === "eu" && !approved 
              ? (
                <div className="tooltip-card-bar-wrapper">
                  <span className="banned-label">{t("ban")}</span>
                </div>
              ) 
              : (
                <div className="tooltip-card-bar-wrapper">
                  <div className="bar" style={{ width }} />
                  
                    <span>
                      <span className="lmr">{datum?.lmr}</span>
                      <span className="measure-unit"> mg/kg</span>
                    </span>
                </div>
              )}

              {country === "br" && approved && (
                <div className="multiplier-wrapper" style={{ opacity: +!!ratio, background: multiplierColor(ratio)}}>
                  <span className="multiplier">{ratio ? ratioToStr(ratio) : ''}</span>
                </div>
              )}

              {country === "br" && !approved && (
                <div className="skull-wrapper">
                  <Skull />
                </div>
              )}


            </div>
          )
        })}

      </div>
    </div>
  )
}

export default TooltipCard