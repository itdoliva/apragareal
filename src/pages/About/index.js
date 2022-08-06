import pesticides from '../../static/data/data_pesticides.json';
import profilePicture from '../../static/imgs/profile.png';
import BarChart from "./components/BarChart/BarChart";
import NavBar from "./components/NavBar/NavBar"

import './style.scss';

function About({ language, changeLanguage }) {

  return (
    <div className="about-page">

    <NavBar language={language} changeLanguage={changeLanguage} />

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


export default About;
