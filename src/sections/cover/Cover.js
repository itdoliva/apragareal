import slideup from '../../static/imgs/slideup.png';
import { ReactComponent as Logo } from '../../static/imgs/apragareal.svg';
import { useTranslation } from 'react-i18next';

function Cover({ colorBlocks }) {
  const { t, i18n } = useTranslation();
  
  return (
    <section className="cover">

      <div className="logo-container">
        <Logo className="app-logo" color="white"/>
        <ul className="colorful-border">{colorBlocks}</ul>
      </div>

      <div className="quotation">
        <span className="quote">&quot;{t('hero')}&quot;</span>
        <span className="author">&mdash; Jean Rostand</span>
      </div>

      <img className="slideup" src={slideup} />

    </section>
  )
}

export default Cover;