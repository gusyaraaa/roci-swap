import { TEST_MODE } from 'config'
import { createContractConnectors } from './createContractConnectors'
import { ChainAddress } from './ChainAddress'
import type { AddressesMap, ContractFactoryAbstract } from '../types'

type CreatorArgs<F> = {
  name: string
  version: string
  testVersion?: string
  factory: F
  address: AddressesMap
  testAddress?: AddressesMap
}

export function createContractHelpers<F extends ContractFactoryAbstract>({
  name,
  factory,
  version,
  testVersion,
  address,
  testAddress,
}: CreatorArgs<F>) {
  const chainAddress = new ChainAddress(name, address, testAddress)
  const connector = createContractConnectors({
    factory,
    chainAddress,
  })

  return {
    ...connector,
    version: TEST_MODE && testVersion ? testVersion : version,
  }
}
