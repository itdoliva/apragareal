import { toOrdinal } from "../../lib/utils/fmtstr";
import { useTranslation } from 'react-i18next';

function PestFilter(props) {
    const { t, i18n } = useTranslation();

    return (
        <button onClick={props.toggle} className={props.active ? "pest-filter active" : "pest-filter"}>

            <div>
                <span className="pest-filter-rank">{toOrdinal(props.rank, i18n.resolvedLanguage)}</span>
                <div className="pest-filter-bullet" 
                    style={{backgroundColor: `var(--pest-${props.id})`}} />
            </div>
            
            
            <div className="pest-filter-label">
                <span>{t(`pesticides.${props.id}`)}</span>
            </div>

        </button>
    );
}

export default PestFilter;
