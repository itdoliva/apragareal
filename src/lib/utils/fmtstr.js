export function toOrdinal(num, lang) {

  if (lang === "pt") {
    return num + "º"
  }

  const dString = String(num);
  const last = +dString.slice(-2);

  if ((last > 3 && last < 21) || [!1, 2, 3].includes(last % 10)) {
    return num + 'th'
  } 
  else if (last % 10 === 1) {
    return num + 'st'
  }
  else if (last % 10 === 2) {
    return num + 'nd'
  }
  else if (last % 10 === 3) {
    return num + 'rd'
  } 

}


export function ratioToStr(ratio) {
  if (ratio >= 2 || ratio === 1) {
    ratio = ratio.toFixed(0)
  } 
  else if (ratio >= .1) {
    ratio = ratio.toFixed(1)
  } 
  else if (ratio >= .01) {
    ratio = ratio.toFixed(2)
  }

  return 'x' + ratio
}