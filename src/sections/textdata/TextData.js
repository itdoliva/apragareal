import BarChart from "../../components/BarChart/BarChart";

import { useSelector } from 'react-redux'

import { selectLanguage } from '../../features/mainSlice'

function TextData({ pesticides }) {
    const language = useSelector(selectLanguage)

    return (
      <section className="sec-text">
        <h1>SOBRE OS DADOS</h1>
        <div className="paragraph-wrapper double-column about">
          <h4>Ingredientes Ativos mais utilizados no Brasil</h4>
          <p>O Ingrediente Ativo (IA) é a principal substância química do agrotóxico.</p>
          <p>No Brasil, o IBAMA fornece a <a className="weblink" target="_blank" href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos">lista</a> dos 10 IA mais vendidos em toneladas no Brasil por ano. Em Junho de 2022, a lista mais recente encontrada foi referente ao ano de 2020.</p>
          
          <div className="listwrapper">
            <h5>Os 10 Ingredientes Ativos mais vendidos no Brasil em 2020</h5>
            <BarChart data={pesticides} language={language} />
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
    )
}

export default TextData;