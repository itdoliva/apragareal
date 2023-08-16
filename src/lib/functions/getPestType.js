export default function getPestType(d) {
    if (d.id === 'S00') return 'sulfur'
    if (d.approved) return 'approved'
    return 'banned'
  }