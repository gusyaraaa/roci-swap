import { useMemo } from 'react'
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from 'config'

export const useWeb3 = () => {
  const { address, isConnected, connector, chainId } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  const isChainUnsupported = useMemo(() => {
    if (chainId) {
      return !SUPPORTED_CHAINS.includes(chainId)
    }
    return true
  }, [chainId])

  return {
    isWalletConnected: isConnected,
    walletAddress: address,
    ensName,
    ensAvatar,
    defaultChain: DEFAULT_CHAIN,
    chainId: chainId ?? DEFAULT_CHAIN,
    isChainUnsupported,
    walletName: connector?.name as 'MetaMask' | 'WalletConnect' | undefined,
  }
}
