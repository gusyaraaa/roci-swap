import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from 'config'

export const useWeb3 = () => {
  const { address, isConnected, connector, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return {
    isWalletConnected: isConnected,
    walletAddress: address,
    ensName,
    ensAvatar,
    defaultChain: DEFAULT_CHAIN,
    chainId: chainId ?? DEFAULT_CHAIN,
    isChainUnsupported:
      chainId && !(SUPPORTED_CHAINS as number[]).includes(chainId),
    walletName: connector?.name as 'MetaMask' | 'WalletConnect' | undefined,
  }
}
