import { mainnet, sepolia } from 'wagmi/chains'

import { createContractHelpers } from 'modules/contracts/utils/createContractHelpers'
import * as generated from 'generated'
import { SUPPORTED_CHAINS } from 'config'

export const ContractRociConverter = createContractHelpers({
  name: 'RociConverter',
  factory: generated.RociConverter__factory,
  version: '1.0.0',
  address: {
    [mainnet.id]: SUPPORTED_CHAINS.includes(mainnet.id)
      ? '0x3E5715bB5d83cf4b127CD7DE6125E86Ab3a5934C'
      : '',
    [sepolia.id]: SUPPORTED_CHAINS.includes(sepolia.id)
      ? '0xbF74Cef2051B7DdbCFE4868149feBAD00f1C120D'
      : '',
  },
  testAddress: {
    [sepolia.id]: '0xbF74Cef2051B7DdbCFE4868149feBAD00f1C120D',
  },
})
