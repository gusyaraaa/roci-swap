import { mainnet, sepolia } from 'wagmi/chains'

import { createContractHelpers } from 'modules/contracts/utils/createContractHelpers'
import * as generated from 'generated'

export const ContractRociConverter = createContractHelpers({
  name: 'RociConverter',
  factory: generated.RociConverter__factory,
  version: '1.0.0',
  address: {
    [mainnet.id]: '',
    [sepolia.id]: '0xbF74Cef2051B7DdbCFE4868149feBAD00f1C120D',
  },
  testAddress: {
    [sepolia.id]: '0xbF74Cef2051B7DdbCFE4868149feBAD00f1C120D',
  },
})
