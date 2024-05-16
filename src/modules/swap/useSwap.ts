import useSWR from 'swr'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { ACCOUNTS_ADDRESSES } from 'config'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { useEthersSigner } from 'modules/blockchain/hooks/useEthersSigner'
import { ContractRociConverter } from 'modules/contracts/contracts'
import { anotherTree } from 'shared/constants/errors'

export const useSwap = () => {
  const { chainId, walletAddress } = useWeb3()
  const signer = useEthersSigner()

  const { data, isLoading } = useSWR(
    `swap-${chainId}-${signer}-${walletAddress}`,
    async () => {
      if (!signer || !walletAddress) return

      const rociConverter = ContractRociConverter.connectWeb3({
        signer,
        chainId,
      })
      const addresses = ACCOUNTS_ADDRESSES.map(account => [
        account.address,
        account.catId,
      ])

      const tree = StandardMerkleTree.of(addresses, ['address', 'uint32'])
      const contractRoot = await rociConverter.root()

      if (tree.root !== contractRoot) throw Error(anotherTree)

      let catId = undefined
      let proof = undefined
      for (const [i, v] of tree.entries()) {
        if (v[0] === walletAddress) {
          catId = v[1]
          proof = tree.getProof(i)
        }
      }

      return {
        catId,
        proof,
      }
    },
    { keepPreviousData: true },
  )

  return {
    catId: data?.catId,
    proof: data?.proof,
    isLoading: isLoading || !data,
  }
}
