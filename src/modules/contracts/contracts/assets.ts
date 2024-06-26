import { mainnet, sepolia } from 'wagmi/chains'

import { createContractHelpers } from 'modules/contracts/utils/createContractHelpers'
import * as generated from 'generated'

export const ContractROCI = createContractHelpers({
  name: 'ROCI',
  factory: generated.ROCI__factory,
  version: '1.0.0',
  address: {
    [mainnet.id]: '0xF51092Fe93B4E9282f42c459F05D93D2D079549e',
    [sepolia.id]: '0x047144832d2544EEFEe65FC09042bDc98EB58054',
  },
})

export const ContractGORA = createContractHelpers({
  name: 'GORA',
  factory: generated.GORA__factory,
  version: '1.0.0',
  address: {
    [mainnet.id]: '0x3b9b5AD79cbb7649143DEcD5afc749a75F8e6C7F',
    [sepolia.id]: '0x0e86aCa06227Bb71ee27D0bAFcaE273374Dd2215',
  },
})
