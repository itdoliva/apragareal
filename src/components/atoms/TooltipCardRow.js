import { useTranslation } from "react-i18next"
import * as d3 from 'd3'

const multiplierColor = d3.scaleLinear()
  .domain([1, 20])
  .range(['#C17373', '#C23838'])

const barWidth = d3.scaleLinear()
  .range([0, 120])

function TooltipCardRow({ country, pest, data }) {
  const { t } = useTranslation()

  const { id, approved } = pest

  useEffect(() => {
    if (hovered?.data) barScale.domain([0, hovered.maxMLR])
  }, [ hovered ])

  return (

  )
}