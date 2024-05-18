import { mainnet, sepolia } from 'wagmi/chains'
import { Buffer } from 'buffer'

window.Buffer = Buffer

export const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID ?? ''
export const DEFAULT_CHAIN = import.meta.env.DEFAULT_CHAIN ?? mainnet.id
export const SUPPORTED_CHAINS = [mainnet.id, sepolia.id]
export const TEST_MODE = import.meta.env.TEST_MODE ?? false
export const VITE_GET_PROOF_API_URL =
  import.meta.env.VITE_GET_PROOF_API_URL ?? ''
