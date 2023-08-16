export default function tonBlockerizer(ton) {
    const blocks = []
    let kton = parseInt(Math.round(ton / 1000))
    while (kton > 0) {
      const decrement = Math.min(50, kton)
      kton -= decrement
      blocks.push(decrement)
    }
    return blocks
  }