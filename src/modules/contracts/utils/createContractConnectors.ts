import { noSigner } from 'shared/constants/errors'
import type { ChainAddress } from './ChainAddress'
import type {
  FactoryInstance,
  ContractFactoryAbstract,
  ConnectWeb3Fn,
  ContractConnector,
} from '../types'

type Args<F> = {
  factory: F
  chainAddress: ChainAddress
}

export function createContractConnectors<F extends ContractFactoryAbstract>({
  factory,
  chainAddress,
}: Args<F>): ContractConnector<F> {
  type Instance = FactoryInstance<F>

  const connectWeb3: ConnectWeb3Fn<F> = ({ chainId, signer }) => {
    if (!signer) throw Error(noSigner)
    return factory.connect(chainAddress.get(chainId), signer) as Instance
  }

  return {
    factory,
    chainAddress,
    connectWeb3,
  }
}
