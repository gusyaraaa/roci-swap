import MetamaskSVG from 'assets/metamask.svg?react'
import WalletConnectSVG from 'assets/walletconnect.svg?react'

export const WALLET_ICONS: Record<string, React.ReactNode | undefined> = {
  MetaMask: <MetamaskSVG />,
  WalletConnect: <WalletConnectSVG />,
}
