import bn from 'bignumber.js'
import { strToWei } from 'modules/blockchain/utils/parseWei'
import { convertToBn, formatBn } from 'shared/utils/bignumber'

type TestArg = bn | string | number | null | undefined

export const required = 'This field is required'

export const floorValue = (value: string, decimals: number) => {
  const floor = convertToBn(1 / 10 ** decimals, decimals)
  return convertToBn(value, decimals).isLessThan(floor)
    ? `Please specify amount greater or equal to ${formatBn(floor, decimals)}`
    : false
}

export const maxValue = (value: string, max: TestArg, decimals: number) => {
  if (!max) return false
  const maxBn = convertToBn(max, decimals)
  return convertToBn(value, decimals).isGreaterThan(maxBn)
    ? `Please specify amount less or equal to ${formatBn(maxBn, decimals)}`
    : false
}

export const minValue = (value: string, min: TestArg, decimals: number) => {
  if (!min || (bn.isBigNumber(min) && min.isZero())) {
    return floorValue(value, decimals)
  }
  const minBn = convertToBn(min, decimals)
  return convertToBn(value, decimals).isLessThan(minBn)
    ? `Please specify amount greater or equal to ${formatBn(minBn, decimals)}`
    : false
}

export const weiParsing = (val: string, decimals: number) => {
  if (val.length) {
    try {
      strToWei(val, decimals)
      return false
    } catch (err) {
      return 'The value cannot be parsed'
    }
  } else {
    return true
  }
}

export const balance = (
  value: string,
  test: TestArg,
  asset: string | undefined | null | '',
  decimals: number,
  fieldName: string = 'Amount',
) => {
  if (
    test === null ||
    test === undefined ||
    (typeof test === 'string' && !test)
  )
    return false
  const testBn = convertToBn(test, decimals)
  return testBn.isLessThan(value)
    ? `${fieldName} exceeds your balance of ${formatBn(
        testBn,
        decimals,
      )} ${asset}.`
    : false
}
