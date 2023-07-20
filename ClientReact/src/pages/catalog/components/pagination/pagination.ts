function pagination(current: number, total:number): string[] {
  if (total <= 1) return ['1']

  const center = [current - 2, current - 1, current, current + 1, current + 2],
  filteredCenter = center.filter((p) => p > 1 && p < total)


  const stringifiedCenter = filteredCenter.map(value => {return value.toString()})

  const includeThreeLeft = current === 5,
  includeThreeRight = current === total - 4,
  includeLeftDots = current > 5,
  includeRightDots = current < total - 4;

  if (includeThreeLeft) stringifiedCenter.unshift("2")
  if (includeThreeRight) stringifiedCenter.push(`${total - 1}`)

  if (includeLeftDots) stringifiedCenter.unshift('...');
  if (includeRightDots) stringifiedCenter.push('...');

  return stringifiedCenter
}

export default pagination