import { useSelector } from 'react-redux'
import { selectLanguage, selectIsMobile } from '../../features/mainSlice'

import maoxian from '../../static/imgs/maoxian-apples.jpeg'

function TextIntro() {

  const isMobile = useSelector(selectIsMobile)
  
  return !isMobile 
    ? (
    <section className="section sec-text intro">

      <div className="double-column">

        <div className="column">
          <img className="maoxian" src={maoxian} />
          <div className="text-block">
            <p className="caption">Polinização de macieiras realizada por mãos humanas em Maoxian, China. Alternativa encontrada após o uso indiscriminado de agrotóxicos acarretar na queda dos insetos polinizadores. Por dia, um único trabalhador é capaz de realizar o processo em apenas 5 a 10 árvores. Hoje, as macieiras perdem espaço para outras frutas e vegetais independentes de polinização.</p>
          </div>
        </div>

        <div className="column">
          <h2>A Praga Real</h2>
          <div className="text-block">
            <p>Em um ecossistema, as mais variadas espécies estabelecem entre si amplas e complexas redes de associação que, independentemente de serem harmônicas ou não, consagram seus indivíduos ao papel de agentes fundamentais na manutenção do equilíbrio ecológico.</p>
            <p>A prática da monocultura representa o empobrecimento severo da biodiversidade vegetal e, por consequência, animal. O resultado é um ambiente simplificado e homogêneo onde as espécies favorecidas pelo alimento cultivado se encontram diante de um horizonte de recursos. Sob baixa ou nenhuma ameaça de seus inimigos naturais, essas populações experimentam um crescimento populacional desenfreado e recebem o título de pragas.</p>
            <p>Para combater essas espécies, um arsenal químico é estruturado. Herbicidas, inseticidas, fungicidas, entre outros biocidas compartilham entre si o envenenamento para muito além de seus destinos iniciais. Esses compostos químicos atravessam diversos ambientes e formas de vida, contaminando e se acumulando em ecossistemas distantes da área de aplicação e trazendo à tona efeitos nocivos e letais em espécies não alvo.</p>
           <p>Os impactos dos agrotóxicos também se alastram por toda a complexa cadeia da qual a espécie inicialmente acometida participa. Como uma praga silenciosa, o envenenamento é disseminado e toma enormes proporções. Lentamente, a raça humana se coloca na mira do próprio gatilho e o aciona.</p>
          </div>
        </div>

      </div>

    </section>
  )
  : (
    <div>

      <section className="sec-text intro">
        <div className="column">
            <img className="maoxian" src={maoxian} />
            <div className="text-block">
              <p className="caption">Polinização de macieiras realizada por mãos humanas em Maoxian, China. Alternativa encontrada após o uso indiscriminado de agrotóxicos acarretar na queda dos insetos polinizadores. Por dia, um único trabalhador é capaz de realizar o processo em apenas 5 a 10 árvores. Hoje, as macieiras perdem espaço para outras frutas e vegetais independentes de polinização.</p>
            </div>
          </div>
      </section>

      <section className="sec-text intro">
      <div className="column">
          <h2>A Praga Real</h2>
          <div className="text-block">
            <p>Em um ecossistema, as mais variadas espécies estabelecem entre si amplas e complexas redes de associação que, independentemente de serem harmônicas ou não, consagram seus indivíduos ao papel de agentes fundamentais na manutenção do equilíbrio ecológico.</p>
            <p>A prática da monocultura representa o empobrecimento severo da biodiversidade vegetal e, por consequência, animal. O resultado é um ambiente simplificado e homogêneo onde as espécies favorecidas pelo alimento cultivado se encontram diante de um horizonte de recursos. Sob baixa ou nenhuma ameaça de seus inimigos naturais, essas populações experimentam um crescimento populacional desenfreado e recebem o título de pragas.</p>
            <p>Para combater essas espécies, um arsenal químico é estruturado. Herbicidas, inseticidas, fungicidas, entre outros biocidas compartilham entre si o envenenamento para muito além de seus destinos iniciais. Esses compostos químicos atravessam diversos ambientes e formas de vida, contaminando e se acumulando em ecossistemas distantes da área de aplicação e trazendo à tona efeitos nocivos e letais em espécies não alvo.</p>
           <p>Os impactos dos agrotóxicos também se alastram por toda a complexa cadeia da qual a espécie inicialmente acometida participa. Como uma praga silenciosa, o envenenamento é disseminado e toma enormes proporções. Lentamente, a raça humana se coloca na mira do próprio gatilho e o aciona.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TextIntro;