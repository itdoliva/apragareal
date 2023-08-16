export default function CultiveFilters({ fCultives, select, scroll }) {
  const onClickFactory = (id) => () => {
    select(id)
    scroll()
  }

  return (
    <div className="filters-row cultive">

      {fCultives.filter(d => d.isAvailable).map(d => (

        <button 
        key={'cultive-'+d.id}
        className={"filter-element cultive-btn" + (d.isSelected ? " selected" : "")} 
        onClick={onClickFactory(d.id)}>

          <img className="cultive-img" src={d.img.src} style={d.img.style} />

        </button>

      ))}

    </div>
  )
}