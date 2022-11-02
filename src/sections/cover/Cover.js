import { ReactComponent as Logo } from '../../static/imgs/apragareal.svg';
import { useSelector } from 'react-redux'

import { selectLanguage } from '../../features/mainSlice'

function Cover({ colorBlocks }) {
  const language = useSelector(selectLanguage)
  
  return (
    <section className="sec-cover">

      <div className="logo-container">
        <Logo className="app-logo" color="white"/>
        <div className="colorful-border">{colorBlocks}</div>
      </div>

      <div className="quotation">
        <span className="quote">&quot;{language.quote}&quot;</span>
        <span className="author">&mdash; Jean Rostand</span>
      </div>

    </section>
  )
}

export default Cover;