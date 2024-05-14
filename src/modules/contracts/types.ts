import type { ChainAddress } from './utils/ChainAddress'
import { Provider, Signer } from 'ethers'

export interface ContractFactoryAbstract {
  name: string
  connect(
    address: string,
    signer: Signer | Provider | null | undefined,
  ): unknown
}

export type FactoryInstance<F extends ContractFactoryAbstract> = ReturnType<
  F['connect']
>

export type AddressesMap = Record<number, string | undefined>

export type ConnectWeb3Args = {
  chainId: number
  signer: Signer | null | undefined
}

export type ConnectWeb3Fn<F extends ContractFactoryAbstract> = (
  args: ConnectWeb3Args,
) => FactoryInstance<F>

export type ContractConnector<F extends ContractFactoryAbstract> = {
  factory: F
  chainAddress: ChainAddress
  connectWeb3: ConnectWeb3Fn<F>
}
