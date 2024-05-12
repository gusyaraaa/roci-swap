export const trimMiddleString = (
  string: string,
  left: number,
  right?: number,
): string => {
  const rightSymbols = right ?? left
  const sum = left + rightSymbols
  if (sum <= 0) return ''
  if (sum * 2 >= string.length) return string

  const leftPart = string.slice(0, left)
  const rightPart = string.slice(-rightSymbols)

  return `${leftPart}...${rightPart}`
}
