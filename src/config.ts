import { mainnet, sepolia } from 'wagmi/chains'

export const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID ?? ''
export const DEFAULT_CHAIN = import.meta.env.DEFAULT_CHAIN ?? mainnet.id
export const SUPPORTED_CHAINS = [mainnet.id, sepolia.id]
