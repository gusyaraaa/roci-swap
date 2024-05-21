import { useCallback } from 'react'

import { openWindow } from 'shared/utils/openWindow'
import {
  getBlockExplorerLink,
  BlockExplorerEntities,
} from '../utils/getBlockExplorerLink'
import { useWeb3 } from './useWeb3'

export function useBlockExplorerOpener(
  hash: string | undefined | null,
  entity: BlockExplorerEntities,
  chainIdArg?: number,
) {
  const { chainId } = useWeb3()

  return useCallback(() => {
    if (!hash) return
    const link = getBlockExplorerLink(chainIdArg ?? chainId, hash, entity)
    openWindow(link)
  }, [chainIdArg, chainId, entity, hash])
}
