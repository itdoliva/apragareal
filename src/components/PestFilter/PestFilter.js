const nth = function(d) {
    const dString = String(d);
    const last = +dString.slice(-2);
    if (last > 3 && last < 21) return 'th';
    switch (last % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

function PestFilter(props) {

    const formatRank = () => props.language.id === "br"
            ? props.rank + "º"
            : props.rank + nth(props.rank)

    return (
        <button onClick={props.toggle} className={props.active ? "pest-filter active" : "pest-filter"}>

            <div>
                <span className="pest-filter-rank">{formatRank()}</span>
                <div className="pest-filter-bullet" 
                    style={{backgroundColor: `var(--pest-${props.id})`}} />
            </div>
            
            
            <div className="pest-filter-label">
                <span>{props.label[props.language.id]}</span>
            </div>

        </button>
    );
}

export default PestFilter;
