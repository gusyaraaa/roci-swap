import { mainnet } from 'wagmi/chains'

import { useWeb3 } from './useWeb3'

const getBlockExplorerName = (chainId: number) => {
  switch (chainId) {
    case mainnet.id:
      return 'Etherscan'
    default:
      return 'Block explorer'
  }
}

export const useBlockExplorerName = (chainIdArg?: number) => {
  const { chainId: chainIdWeb3 } = useWeb3()
  const chainId = chainIdArg ?? chainIdWeb3

  return getBlockExplorerName(chainId)
}
