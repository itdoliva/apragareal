import {ReactComponent as KeepOut}  from '../../static/imgs/keepout.svg';


function TextKeyTerms() {
  return (
    <section id="key-terms" className="section sec-text key-terms">

      <div className="text-wrapper">

        <div className="text-element">
          <h2>Ingrediente Ativo</h2>
          <p>
            O <span className="strong">Ingrediente Ativo</span> (IA) é a principal substância química dos agrotóxicos. <span className="strong">Responsável pela ação contra as pragas</span>, sua concentração na água e nos alimentos deve ser nula ou a menor possível a fim de garantir o mínimo de impacto à saúde dos consumidores e ao meio ambiente.
          </p>
        </div>

        <div className="text-element">
          <h2>Limite Máximo de Resíduos - LMR</h2>
          <p>
            O parâmetro que <span className="strong">limita a concentração máxima permitida</span> de um Ingrediente Ativo em determinado alimento é o <span className="strong">Limite Máximo de Resíduos</span>, ou <span className="strong">LMR</span>. Sua definição é de responsabilidade da Anvisa no Brasil e pode ser consultada neste <a className="link" href="https://www.gov.br/anvisa/pt-br/acessoainformacao/dadosabertos/informacoes-analiticas/monografias-de-agrotoxicos" target="_blank">dashboard</a>. Os dados da União Europeia podem ser obtidos através <a className="link" href="https://ec.europa.eu/food/plant/pesticides/eu-pesticides-database/mrls/?event=search.pr" target="_blank">deste link</a>.
          </p>
        </div>

      </div>

      <KeepOut className="keep-out" />
      
    </section>
  )
}

export default TextKeyTerms;