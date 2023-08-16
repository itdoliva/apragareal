import { useSelector } from 'react-redux'


import range from '../../lib/functions/range'
import getPestType from '../../lib/functions/getPestType'
import tonBlockerizer from '../../lib/functions/tonBlockerizer'

import { selectIsMobile } from '../../features/mainSlice'
import { useTranslation } from 'react-i18next'


function TextData({ pesticides }) {
  const { t, i18n } = useTranslation()
  const isMobile = useSelector(selectIsMobile)

  return !isMobile 
    ? (
      <section className="text rank">
        <h4 className="text-align-center">{t("country.br.name")}, 2020</h4>
        <h2 className="text-align-center">{t("rank")}</h2>

        <div>

          <div className="desc-panel">
            <h4>Perigoso na Europa,<br/>Liberado no Brasil</h4>
            <div className="text-block">
              <p>Embora os efeitos nocivos causados pelos agrotóxicos sejam os mesmos em todo o globo, dos 10 ingredientes ativos mais utilizados¹ no Brasil, <span className="inline-legend banned"><span /><span>6 foram banidos na União Europeia</span></span> - alguns há décadas.</p>
              <p>Nesta mesma lista, os <span className="inline-legend approved"><span /><span>3 ingredientes ativos permitidos em ambas as legislações - e analisados neste projeto²</span></span> - possuem limites de concentração muito mais frouxos no Brasil para a maioria dos alimentos dos nossos pratos, incluindo o arroz e o feijão, base da alimentação brasileira. </p>
              
              <p className="footnote">¹ A lista dos 10 ingredientes ativos mais vendidos no Brasil em toneladas por ano é fornecida pelo IBAMA. O último ano com dados disponíveis era 2020 no acesso de Junho de 2022. Nesta análise, utilizou-se 'toneladas vendidas' como variável proxy, isto é, variável representante, de 'toneladas utilizadas'. <a className="link" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos" target="_blank">Acesse aqui.</a></p>
              <p className="footnote">² O <span className="inline-legend sulfur"><span /><span>enxofre, oitavo ingrediente ativo mais utilizado no Brasil em 2020</span></span>, não foi analisado neste projeto. Sua presença em diversos outros ingredientes ativos mais complexos dificultava comparações.</p>
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
      <p>Embora os efeitos nocivos causados pelos agrotóxicos sejam os mesmos em todo o globo, dos 10 ingredientes ativos mais utilizados¹ no Brasil, <span className="inline-legend banned"><span /><span>6 foram banidos na União Europeia</span></span> - alguns há décadas.</p>
      <p>Nesta mesma lista, os <span className="inline-legend approved"><span /><span>3 ingredientes ativos permitidos em ambas as legislações - e analisados neste projeto²</span></span> - possuem limites de concentração muito mais frouxos no Brasil para a maioria dos alimentos dos nossos pratos, incluindo o arroz e o feijão, base da alimentação brasileira. </p>
      
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

      <p className="footnote">¹ A lista dos 10 ingredientes ativos mais vendidos no Brasil em toneladas por ano é fornecida pelo IBAMA. O último ano com dados disponíveis era 2020 no acesso de Junho de 2022. Nesta análise, utilizou-se 'toneladas vendidas' como variável proxy, isto é, variável representante, de 'toneladas utilizadas'. <a className="link" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos" target="_blank">Acesse aqui.</a></p>
      <p className="footnote">² O <span className="inline-legend sulfur" /><span>enxofre, oitavo ingrediente ativo mais utilizado no Brasil em 2020</span>, não foi analisado neste projeto. Sua presença em diversos outros ingredientes ativos mais complexos dificultava comparações.</p>


    </section>
    )
  
}

export default TextData;