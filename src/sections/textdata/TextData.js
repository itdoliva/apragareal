import { useSelector } from 'react-redux'


import range from '../../lib/functions/range'
import getPestType from '../../lib/functions/getPestType'
import tonBlockerizer from '../../lib/functions/tonBlockerizer'

import { selectIsMobile } from '../../features/mainSlice'
import { useTranslation } from 'react-i18next'


function TextData({ pesticides }) {
  const { t, i18n } = useTranslation()
  const isMobile = useSelector(selectIsMobile)

  const p1 = i18n.resolvedLanguage === "pt" 
  ? (
    <p>Embora os efeitos nocivos causados pelos agrotóxicos sejam os mesmos em todo o globo, dos 10 ingredientes ativos mais utilizados¹ no Brasil, <span className="inline-legend banned"><span /><span>6 foram banidos na União Europeia</span></span> - alguns há décadas.</p>
  )
  : (
    <p>Although the harmful effects caused by pesticides are the same worldwide, of the 10 most used active ingredients¹ in Brazil, <span className="inline-legend banned"><span /><span>6 have been banned in the European Union</span></span> - some for decades.
    </p>
  )

  const p2 = i18n.resolvedLanguage === "pt"
  ? (
    <p>Nesta mesma lista, os <span className="inline-legend approved"><span /><span>3 ingredientes ativos permitidos em ambas as legislações - e analisados neste projeto²</span></span> - possuem limites de concentração muito mais frouxos no Brasil para a maioria dos alimentos dos nossos pratos, incluindo o arroz e o feijão, base da alimentação brasileira.</p>
  )
  : (
    <p>On this same list, the <span className="inline-legend approved"><span /><span>3 active ingredients allowed in both legislations - and analyzed in this project²</span></span> - have much looser concentration limits in Brazil for most of the foods on our plates, including rice and beans, the basis of the Brazilian diet.</p>
  )

  const p3 = i18n.resolvedLanguage === "pt"
  ? (
    <p className="footnote">¹ A lista dos 10 ingredientes ativos mais vendidos no Brasil em toneladas por ano é fornecida pelo IBAMA. O último ano com dados disponíveis era 2020 no acesso de Junho de 2022. Nesta análise, utilizou-se 'toneladas vendidas' como variável proxy, isto é, variável representante, de 'toneladas utilizadas'. <a className="link" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos" target="_blank">Acesse aqui.</a></p>
  )
  : (
    <p className="footnote">¹ The list of the 10 most sold active ingredients in Brazil in tons per year is provided by IBAMA. The last year with available data was 2020 as of June 2022. In this analysis, 'tons sold' was used as a proxy variable, that is, a representative variable, for 'tons used'. <a className="link" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos" target="_blank">Visit it.</a></p>
  )

  const p4 = i18n.resolvedLanguage === "pt"
  ? (
    <p className="footnote">² O <span className="inline-legend sulfur"><span /><span>enxofre, oitavo ingrediente ativo mais utilizado no Brasil em 2020</span></span>, não foi analisado neste projeto. Sua presença em diversos outros ingredientes ativos mais complexos dificultava comparações.</p>
  )
  : (
    <p className="footnote">² <span className="inline-legend sulfur"><span /><span>Sulfur, the eighth most used active ingredient in Brazil in 2020</span></span>, was not analyzed in this project. Its presence in several other more complex active ingredients made comparisons difficult.</p>
  )

  return !isMobile 
    ? (
      <section className="text rank">
        <h4 className="text-align-center">{t("country.br.name")}, 2020</h4>
        <h2 className="text-align-center">{t("rank")}</h2>

        <div>

          <div className="desc-panel">
            
            {i18n.resolvedLanguage === "pt"
            ? (<h4>Perigoso na Europa,<br/>Liberado no Brasil</h4>)
            : (<h4>Dangerous in Europe,<br/>Released in Brasil</h4>)
            }

            <div className="text-block">
              {p1}
              {p2}
              {p3}
              {p4}
              
            </div>
          </div>

          <div className="rank-panel">

            <div className="ton-legend">
              <span className="ton-circle" />
              <span className="ton-legend--label">1000 {t("ton.name").toLowerCase()}s</span>
            </div>

            {pesticides.map((d, i) => {
              const pestType = getPestType(d)
              const blocks = tonBlockerizer(d.salesTon)

              return (
                <div key={d.id} className={`rank-card ${pestType}`}>

                  <div className="ton-rank">
                    <span>{d.rank}</span>
                  </div>

                  <div className="ton-pest">
                    {/* <span>{d.label[language.id]}</span> */}
                  </div>

                  {blocks.map((block, j) => {
                    const alignSelf = (blocks.length > 1 && j === blocks.length -1 ) ? 'start' : 'center'
                    return (
                      <div key={j} className="ton-matrix--column" style={{ alignSelf }}>
                        {range(block).map((d, jj) => (<span key={jj} className="ton-circle" />))}
                      </div>
                    )
                  })}

                </div>
              )
            })}

          </div>

        </div>

    </section>
    ) 
    : (
    <section className="text rank">
      <h4>{t("country.br.name")}, 2020</h4>
      <h2>{t("rank")}</h2>
      {p1}
      {p2}
      
      <div className="rank-panel">
        {pesticides.map((d, i) => (
          <div key={d.id} className={`rank-card ${getPestType(d)}`}>

            <div className="ton-rank">
              <span>{d.rank}</span>
            </div>

            <div className="ton-pest">
              {/* <span>{d.label[language.id]}</span> */}
            </div>

            <div className="ton-qty">
              <span>{parseInt(Math.round(d.salesTon / 1000))}</span>
              <span>kton</span>
            </div>

          </div>
        ))}

      </div>

      <div style={{display: "flex", justifyContent: "flex-end"}}>
        <span style={{fontSize: '.65rem', fontWeight: 300}}>1 kton = 1000 toneladas</span>
      </div>

      {p3}
      {p4}


    </section>
    )
  
}

export default TextData;