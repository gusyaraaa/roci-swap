import { bn } from 'shared/utils/bignumber'

export function formatAsset(value: string | number | undefined | null) {
  if (value === null || value === undefined || value === '') {
    return ''
  }

  const commaDigits = 18

  const valueBn = new bn(value)

  const minValue = 1 / 10 ** commaDigits
  if (valueBn.isGreaterThan(0) && valueBn.isLessThan(minValue)) {
    return `<${minValue}`
  }

  return valueBn.toFixed(6)
}
