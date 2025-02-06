import { useSelector } from 'react-redux'
import { selectLanguage, selectIsMobile } from '../../features/mainSlice'

import maoxian from '../../static/imgs/maoxian-apples.jpeg'
import { useTranslation } from 'react-i18next'

function TextIntro() {
  const { i18n } = useTranslation()

  const isMobile = useSelector(selectIsMobile)
  
  return !isMobile 
    ? (
    <section className="text intro">

      <div className="double-column intro">

        <div className="column">
          <img className="maoxian" src={maoxian} />
          <div className="text-block">
            <p className="caption">{
              i18n.resolvedLanguage === "pt"
              ? "Polinização de macieiras realizada por mãos humanas em Maoxian, China. Alternativa encontrada após o uso indiscriminado de agrotóxicos acarretar na queda dos insetos polinizadores. Por dia, um único trabalhador é capaz de realizar o processo em apenas 5 a 10 árvores. Hoje, as maçãs perdem espaço para outras frutas e vegetais independentes de polinização."
              : "Pollinating apple trees by human hands in Maoxian, China. This alternative was found after the indiscriminate use of pesticides led to the decline of pollinating insects. Each day, a single worker is able to carry out the process on just 5 to 10 trees. Today, apples are losing ground to other fruits and vegetables that are independent of pollination."
            }</p>
          </div>
        </div>

        <div className="column">
          <h2>A Praga Real</h2>
          <div className="text-block">
            <p>{
              i18n.resolvedLanguage === "pt"
              ? "Em um ecossistema, as mais variadas espécies estabelecem entre si amplas e complexas redes de associação que, independentemente de serem harmônicas ou não, consagram seus indivíduos ao papel de agentes fundamentais na manutenção do equilíbrio ecológico."
              : "In an ecosystem, the most diverse species establish broad and complex networks of association with each other that, regardless of being harmonious or not, consecrate their individuals to the role of fundamental agents in maintaining ecological balance."
            }</p>
            <p>{
              i18n.resolvedLanguage === "pt"
              ? "A prática da monocultura representa o empobrecimento severo da biodiversidade vegetal e, por consequência, animal. O resultado é um ambiente simplificado e homogêneo onde as espécies favorecidas pelo alimento cultivado se encontram diante de um horizonte de recursos. Sob baixa ou nenhuma ameaça de seus inimigos naturais, essas populações experimentam um crescimento populacional desenfreado e recebem o título de pragas."
              : "The practice of monoculture represents severe impoverishment of plant biodiversity and, consequently, animal biodiversity. The result is a simplified and homogeneous environment where the species favored by the cultivated food are faced with a horizon of resources. Under low or no threat from their natural enemies, these populations experience uncontrolled population growth and receive the title of pests."
            }</p>
            <p>{
              i18n.resolvedLanguage === "pt"
              ? "Para combater essas espécies, um arsenal químico é estruturado. Herbicidas, inseticidas, fungicidas, entre outros biocidas compartilham entre si o envenenamento para muito além de seus destinos iniciais. Esses compostos químicos atravessam diversos ambientes e formas de vida, contaminando e se acumulando em ecossistemas distantes da área de aplicação e trazendo à tona efeitos nocivos e letais em espécies não alvo."
              : "To combat these species, a chemical arsenal is structured. Herbicides, insecticides, fungicides, and other biocides share poisoning far beyond their initial targets. These chemical compounds traverse various environments and forms of life, contaminating and accumulating in ecosystems far from the application area and bringing to light harmful and lethal effects on non-target species."
            }</p>
           <p>{
              i18n.resolvedLanguage === "pt"
              ? "Os impactos dos agrotóxicos também se alastram por toda a complexa cadeia da qual a espécie inicialmente acometida participa. Como uma praga silenciosa, o envenenamento é disseminado e toma enormes proporções. Lentamente, a raça humana se coloca na mira do próprio gatilho."
              : "The impacts of pesticides also spread throughout the complex chain in which the initially affected species participates. Like a silent plague, poisoning is disseminated and takes on enormous proportions. Slowly, the human race puts itself in the crosshairs of its own trigger and pulls it."
            }</p>
          </div>
        </div>

      </div>

    </section>
  )
  : (
    <section className="text intro">
      
      <article>
        <div>
          <img className="maoxian" src={maoxian} />
          <div className="text-block">
            <p className="caption">
            {
              i18n.resolvedLanguage === "pt"
              ? "Polinização de macieiras realizada por mãos humanas em Maoxian, China. Alternativa encontrada após o uso indiscriminado de agrotóxicos acarretar na queda dos insetos polinizadores. Por dia, um único trabalhador é capaz de realizar o processo em apenas 5 a 10 árvores. Hoje, as maçãs perdem espaço para outras frutas e vegetais independentes de polinização."
              : "Pollinating apple trees by human hands in Maoxian, China. This alternative was found after the indiscriminate use of pesticides led to the decline of pollinating insects. Each day, a single worker is able to carry out the process on just 5 to 10 trees. Today, apples are losing ground to other fruits and vegetables that are independent of pollination."
            }
              </p>
          </div>
        </div>
          
        <div>
          <h2>A Praga Real</h2>
          <div className="text-block">
            <p>
            {
              i18n.resolvedLanguage === "pt"
              ? "Em um ecossistema, as mais variadas espécies estabelecem entre si amplas e complexas redes de associação que, independentemente de serem harmônicas ou não, consagram seus indivíduos ao papel de agentes fundamentais na manutenção do equilíbrio ecológico."
              : "In an ecosystem, the most diverse species establish broad and complex networks of association with each other that, regardless of being harmonious or not, consecrate their individuals to the role of fundamental agents in maintaining ecological balance."
            }
            </p>
            <p>
            {
              i18n.resolvedLanguage === "pt"
              ? "A prática da monocultura representa o empobrecimento severo da biodiversidade vegetal e, por consequência, animal. O resultado é um ambiente simplificado e homogêneo onde as espécies favorecidas pelo alimento cultivado se encontram diante de um horizonte de recursos. Sob baixa ou nenhuma ameaça de seus inimigos naturais, essas populações experimentam um crescimento populacional desenfreado e recebem o título de pragas."
              : "The practice of monoculture represents severe impoverishment of plant biodiversity and, consequently, animal biodiversity. The result is a simplified and homogeneous environment where the species favored by the cultivated food are faced with a horizon of resources. Under low or no threat from their natural enemies, these populations experience uncontrolled population growth and receive the title of pests."
            }
            </p>
            <p>
            {
              i18n.resolvedLanguage === "pt"
              ? "Para combater essas espécies, um arsenal químico é estruturado. Herbicidas, inseticidas, fungicidas, entre outros biocidas compartilham entre si o envenenamento para muito além de seus destinos iniciais. Esses compostos químicos atravessam diversos ambientes e formas de vida, contaminando e se acumulando em ecossistemas distantes da área de aplicação e trazendo à tona efeitos nocivos e letais em espécies não alvo."
              : "To combat these species, a chemical arsenal is structured. Herbicides, insecticides, fungicides, and other biocides share poisoning far beyond their initial targets. These chemical compounds traverse various environments and forms of life, contaminating and accumulating in ecosystems far from the application area and bringing to light harmful and lethal effects on non-target species."
            }
            </p>
            <p>
            {
              i18n.resolvedLanguage === "pt"
              ? "Os impactos dos agrotóxicos também se alastram por toda a complexa cadeia da qual a espécie inicialmente acometida participa. Como uma praga silenciosa, o envenenamento é disseminado e toma enormes proporções. Lentamente, a raça humana se coloca na mira do próprio gatilho."
              : "The impacts of pesticides also spread throughout the complex chain in which the initially affected species participates. Like a silent plague, poisoning is disseminated and takes on enormous proportions. Slowly, the human race puts itself in the crosshairs of its own trigger and pulls it."
            }
            </p>
          </div>
        </div>
      </article>

    </section>
  )
}

export default TextIntro;