
import { useTranslation } from "react-i18next";

function TextKeyTerms() {
  const { t, i18n } = useTranslation()

  return (
    <section id="key-terms" className="text key-terms flow-hidden">

      <article className="def-shadow">

        <div className="text-element">
          <h2>{t("activeSubs")}</h2>
          {i18n.resolvedLanguage === "pt" 
          ? (
            <p>
              O <span className="strong">Ingrediente Ativo</span> (IA) é a principal substância química dos agrotóxicos. <span className="strong">Responsável pela ação contra as pragas</span>, sua concentração na água e nos alimentos deve ser nula ou a menor possível a fim de garantir o mínimo de impacto à saúde dos consumidores e ao meio ambiente.
            </p>
          )
          : (
            <p>
              The <span className="strong">Active Substance</span> is the main chemical substance in pesticides. <span className="strong">Responsible for action against pests</span>, its concentration in water and food should be zero or as low as possible in order to ensure minimal impact on the health of consumers and the environment.
            </p>
          )
          }
          
        </div>

        <div className="text-element">
          <h2>{t("mrl.name")} - {t("mrl.initials")}</h2>
          {i18n.resolvedLanguage === "pt"
          ? (
            <p>
              O parâmetro que <span className="strong">limita a concentração máxima permitida</span> de um Ingrediente Ativo em determinado alimento é o <span className="strong">Limite Máximo de Resíduos</span>, ou <span className="strong">LMR</span>. Sua definição é de responsabilidade da Anvisa no Brasil e pode ser consultada neste <a className="link" href="https://www.gov.br/anvisa/pt-br/acessoainformacao/dadosabertos/informacoes-analiticas/monografias-de-agrotoxicos" target="_blank">dashboard</a>. Os dados da União Europeia podem ser obtidos através <a className="link" href="https://ec.europa.eu/food/plant/pesticides/eu-pesticides-database/mrls/?event=search.pr" target="_blank">deste link</a>.
            </p>
          ) 
          : (
            <p>
              The parameter that <span className="strong"> limits the maximum allowed concentration</span> of an Active Ingredient in a certain food is the <span className="strong">Maximum Residue Limit</span>, ou <span className="strong">MRL</span>. Its definition is the responsibility of ANVISA in Brazil and can be consulted on this <a className="link" href="https://www.gov.br/anvisa/pt-br/acessoainformacao/dadosabertos/informacoes-analiticas/monografias-de-agrotoxicos" target="_blank">dashboard</a>. European Union data can be obtained through <a className="link" href="https://ec.europa.eu/food/plant/pesticides/eu-pesticides-database/mrls/?event=search.pr" target="_blank">this link</a>.
            </p>
          )}
          
        </div>

      </article>

      
    </section>
  )
}

export default TextKeyTerms;