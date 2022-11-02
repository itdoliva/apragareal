import BarChart from "../../components/BarChart/BarChart";
import PartyChart from "../../components/PartyChart/PartyChart";

import { useSelector } from 'react-redux'

import { selectLanguage } from '../../features/mainSlice'

function TextData({ pesticides }) {
    const language = useSelector(selectLanguage)

    return (
      <section className="sec-text data">

        <div className="text-element" style={{width: '400px'}}>
          <h2>Perigoso na Europa, liberado no Brasil</h2>
          <div className="text-block">
            <p>Embora os efeitos nocivos causados pelos agrotóxicos sejam os mesmos em todo o globo, dos 10 ingredientes ativos mais utilizados¹ no Brasil, 6 foram banidos na União Europeia - alguns há décadas.</p>
            <p>Nesta mesma lista, os 3 ingredientes ativos permitidos em ambas as legislações - e analisados² neste projeto - possuem limites de concentração muito mais frouxos no Brasil para a maioria dos alimentos dos nossos pratos, incluindo o arroz e o feijão, base da alimentação brasileira. </p>
            
            <p className="footnote">¹ A lista dos 10 ingredientes ativos mais vendidos no Brasil em toneladas por ano é fornecida pelo IBAMA. O último ano com dados disponíveis era 2020 no acesso de Junho de 2022. Nesta análise, utilizou-se 'toneladas vendidas' como variável proxy, isto é, variável representante, de 'toneladas utilizadas'. <a href="http://www.ibama.gov.br/agrotoxicos/relatorios-de-comercializacao-de-agrotoxicos" target="_blank">Acesse aqui.</a></p>
            <p className="footnote">² O enxofre, oitavo ingrediente ativo mais utilizado no Brasil em 2020, não foi analisado neste projeto. Sua presença em diversos outros ingredientes ativos mais complexos dificultava comparações.</p>
          </div>
        </div>

      </section>
    )
}

export default TextData;