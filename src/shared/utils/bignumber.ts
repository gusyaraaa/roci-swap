import bn from 'bignumber.js'

bn.set({
  EXPONENTIAL_AT: 20,
  DECIMAL_PLACES: 80,
})

export { bn }

export const BigNumberToBn = (value: bn, decimals: number) =>
  new bn(value.toString()).shiftedBy(-decimals)

export const convertToBn = (value: bn | string | number, decimals: number) => {
  if (bn.isBigNumber(value)) return BigNumberToBn(value, decimals)
  return new bn(value)
}

export const formatBn = (value: bn, decimals: number) =>
  value.toFormat(value.isInteger() ? 0 : decimals, 2)
