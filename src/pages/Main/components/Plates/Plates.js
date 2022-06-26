import { image } from 'd3';
import Plate from './Plate';

function Plates({ data, language }) {
  return (
    <ul className="plates-wrapper">
      {data.map(d => (
        <Plate 
        key={d.cultivo + '-' + d.data.map(d => d.id).join('-')}
        language={language}
        {...d} />
      ))}
      <li className="plate-wrapper" />
    </ul>
  )
}

export default Plates