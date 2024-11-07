export default function (start: number, stop?: number, step: number = 1) {
  const result = []

  if (start && stop) {
    for (let i = start; i < stop; i = i + step) {
      result.push(i)
    }
  } else if (start && !stop) {
    for (let i = 0; i < start; i = i + step) {
      result.push(i)
    }
  }

  return result
}
