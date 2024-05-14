import { mainnet, sepolia } from 'wagmi/chains'

import { createContractHelpers } from 'modules/contracts/utils/createContractHelpers'
import * as generated from 'generated'

export const ContractRociConverter = createContractHelpers({
  name: 'RociConverter',
  factory: generated.RociConverter__factory,
  version: '1.0.0',
  address: {
    [mainnet.id]: '',
    [sepolia.id]: '0xc5677EaA6e6e3c32B8Ed1D9Ac5a30A606989A72B',
  },
  testAddress: {
    [sepolia.id]: '0xc5677EaA6e6e3c32B8Ed1D9Ac5a30A606989A72B',
  },
})
