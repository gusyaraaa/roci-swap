import { mainnet, sepolia } from 'wagmi/chains'
import { Buffer } from 'buffer'

window.Buffer = Buffer

export const WC_PROJECT_ID = import.meta.env.VITE_WC_PROJECT_ID ?? ''
export const DEFAULT_CHAIN = import.meta.env.VITE_DEFAULT_CHAIN ?? mainnet.id
export const TEST_MODE = import.meta.env.VITE_TEST_MODE ?? 'false'
export const VITE_GET_PROOF_API_URL =
  import.meta.env.VITE_GET_PROOF_API_URL ?? ''

export const SUPPORTED_CHAINS: number[] =
  TEST_MODE === 'false' ? [mainnet.id] : [sepolia.id]
