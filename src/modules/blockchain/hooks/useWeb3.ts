import { useAccount, useEnsAvatar, useEnsName } from 'wagmi'
import { DEFAULT_CHAIN } from 'config'

export const useWeb3 = () => {
  const { address, isConnected, connector, chainId } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

  return {
    isWalletConnected: isConnected,
    walletAddress: address,
    ensName,
    ensAvatar,
    chainId: chainId ?? DEFAULT_CHAIN,
    walletName: connector?.name as 'MetaMask' | 'WalletConnect' | undefined,
  }
}
