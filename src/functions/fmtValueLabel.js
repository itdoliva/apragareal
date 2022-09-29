function fmtValueLabel(value, lang) {
    value = (value / 1000).toFixed(1).toString()
    if (lang == "br") {
        return value
            .replace('.', ',')
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' kt'
    } else {
        return value
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' kt'
    }

}

export default fmtValueLabel