import { mainnet, sepolia } from 'wagmi/chains'

const BLOCK_EXPLORER_DOMAINS: { readonly [key: number]: string } = {
  [mainnet.id]: 'etherscan.io',
  [sepolia.id]: 'sepolia.etherscan.io',
} as const

export type BlockExplorerEntities = 'tx' | 'token' | 'address'

export const getBlockExplorerLink = (
  chainId: number,
  hash: string,
  entity: BlockExplorerEntities = 'tx',
) => {
  return `https://${BLOCK_EXPLORER_DOMAINS[chainId]}/${entity}/${hash}`
}
