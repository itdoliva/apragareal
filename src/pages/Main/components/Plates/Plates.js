import Plate from './Plate'

import normalizeStr from '../../functions/normalizeStr';

function Plates(props) {
  return (
    <ul className="plates-wrapper">
      {props.data.map(d => (
        <Plate 
        key={normalizeStr(d.cultive) + '-' + d.data.map(d => d.rank).join('-')}
        language={props.language}
        {...d} />
      ))}
      <li className="plate-wrapper" />
    </ul>
  )
}

export default Plates