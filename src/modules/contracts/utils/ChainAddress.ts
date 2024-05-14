import { mainnet, sepolia } from 'wagmi/chains'
import { getAddress } from 'ethers'
import { TEST_MODE } from 'config'

import { AddressesMap } from '../types'

export class ChainAddress {
  private name: string
  private addressesMap: AddressesMap
  private testAddressesMap: AddressesMap | undefined

  constructor(name: string, bunch: AddressesMap, testBunch?: AddressesMap) {
    this.name = name
    this.addressesMap = bunch
    this.testAddressesMap = testBunch
  }

  get(chainId: number) {
    const address = this.addressesMap[chainId]

    if (TEST_MODE) {
      const testAddress =
        this.testAddressesMap && this.testAddressesMap[chainId]

      const addressWithFallback = testAddress ?? address

      if (addressWithFallback) {
        return getAddress(addressWithFallback)
      }
    } else if (address) {
      return getAddress(address)
    }

    const chainName = {
      [mainnet.id]: mainnet.name,
      [sepolia.id]: sepolia.name,
    }[chainId]
    throw new Error(`${this.name} does not support chain ${chainName}`)
  }

  getName() {
    return this.name
  }
}
