import { WC_PROJECT_ID } from 'config'
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    walletConnect({
      showQrModal: true,
      projectId: WC_PROJECT_ID,
      qrModalOptions: {
        themeMode: 'light',
        themeVariables: {
          '--wcm-z-index': '9999',
          '--wcm-accent-color': '#3da2ff',
          '--wcm-background-color': '#9E00FF',
        },
        enableExplorer: false,
        explorerExcludedWalletIds: 'ALL',
        explorerRecommendedWalletIds: 'NONE',
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
