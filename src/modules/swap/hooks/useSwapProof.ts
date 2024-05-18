import { useQuery } from '@tanstack/react-query'
import { VITE_GET_PROOF_API_URL } from 'config'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'

export const useSwapProof = () => {
  const { walletAddress } = useWeb3()

  const { data, isPending } = useQuery({
    queryKey: ['proof', walletAddress],
    queryFn: () =>
      fetch(`${VITE_GET_PROOF_API_URL}/${walletAddress}`).then(res =>
        res.json(),
      ),
    enabled: !!walletAddress,
  })

  return {
    catId: data?.catId,
    proof: data?.proof,
    isLoading: isPending,
  }
}
