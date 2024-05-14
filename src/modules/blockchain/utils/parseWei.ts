import { BigNumberish, formatUnits, parseUnits } from 'ethers'
import { PropertyMapper } from 'shared/utils/utilTypes'

export const weiToStr = (wei: BigNumberish, decimals: number) =>
  formatUnits(wei, decimals)

export const weiToNum = (wei: BigNumberish, decimals: number) =>
  Number(weiToStr(wei, decimals))

export const strToWei = (str: string, decimals: number) =>
  parseUnits(str, decimals)

export const numToWei = (num: number, decimals: number) =>
  strToWei(num.toString(), decimals)

export const recordNumToWei = <T>(
  record: PropertyMapper<T, number>,
  decimals: number,
) => {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      numToWei(value as number, decimals),
    ]),
  ) as PropertyMapper<T, BigNumberish>
}
