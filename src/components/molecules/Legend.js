import { useTranslation } from "react-i18next"

export default function Legend({ id, children }) {
  const { t } = useTranslation()
  
  return (
    <div className={`legend-container ${id}`}>

      <div className="legend-header">
        
        <span className="legend-header-title strong">
          {t(`legend.${id}.name`)}
        </span>

        <a href="#key-terms">
          <span className="legend-header-title">
            {t(`legend.${id}.value`)}
          </span>
        </a>

      </div>

      <div className="legend-body">
        {children}
      </div>

    </div>
  )
}