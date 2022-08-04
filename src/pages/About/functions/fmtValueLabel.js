function fmtValueLabel(value, lang) {
    value = (value / 1000).toFixed(1).toString()
    if (lang == "br") {
        return value
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' mil ton'
    } else {
        return value
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' kiloton'
    }

}

export default fmtValueLabel