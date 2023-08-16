import { useTranslation } from 'react-i18next';

export default function TypeFilters({ wrapperClass, cultiveTypes, toggle, scroll}) {

  const { t, i18n } = useTranslation();

  const onClickFactory = (id) => () => {
    toggle(id)
    scroll()
  }

  return (
    <div className={wrapperClass} >
      {cultiveTypes.map(d => (

        <button 
        key={'type-'+d.id} 
        className={"type-option" + (d.active ? " active" : "")}
        onClick={onClickFactory(d.id)}>
          {t(`cultiveGroups.${d.id}`)}
        </button>

      ))}
    </div>
  )
}