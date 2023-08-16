import PestFilter from '../atoms/PestFilter'
import { useTranslation } from 'react-i18next';


export default function PestFilters({ fPesticides, toggle, scroll }) {

  const { t, i18n } = useTranslation();

  const onClickFactory = (id) => () => {
    toggle(id)
    scroll()
  }

  return (
    <div className="pest-filter-container">
      <span className="filter-title">{t("filter")}</span>
      <div className="btns-wrapper">

        {fPesticides.filter(d => d.show).map(d => (

          <PestFilter key={d.id} toggle={onClickFactory(d.id)} {...d}  /> 

        ))}

      </div>
    </div>
  )
}