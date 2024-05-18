import useSWR from 'swr'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { useEthersSigner } from 'modules/blockchain/hooks/useEthersSigner'
import {
  ContractGORA,
  ContractROCI,
  ContractRociConverter,
} from 'modules/contracts/contracts'
import { weiToNum } from 'modules/blockchain/utils/parseWei'

type Args = {
  catId: number | undefined
  rociAmount: string
}

export const useSwapFormData = (args: Args) => {
  const { catId, rociAmount } = args
  const { chainId, walletAddress } = useWeb3()
  const signer = useEthersSigner()

  const { data } = useSWR(
    `swap-form-${chainId}-${signer}-${walletAddress}-${rociAmount}-${catId}`,
    async () => {
      if (!signer || !walletAddress || !catId) return

      const rociConverter = ContractRociConverter.connectWeb3({
        signer,
        chainId,
      })
      const rociToken = ContractROCI.connectWeb3({
        signer,
        chainId,
      })
      const goraToken = ContractGORA.connectWeb3({
        signer,
        chainId,
      })

      const [rociBalance, goraBalance, goraPrice] = await Promise.all([
        rociToken.balanceOf(walletAddress),
        goraToken.balanceOf(walletAddress),
        rociConverter.categoryPrice(catId),
      ])
      const priceRatio = Number(goraPrice) / 10000

      return {
        rociBalance: weiToNum(rociBalance, 18),
        goraBalance: weiToNum(goraBalance, 18),
        goraPrice: priceRatio,
        goraAmount: Number(rociAmount) * priceRatio,
      }
    },
    { keepPreviousData: true },
  )

  return {
    rociBalance: data?.rociBalance || 0,
    goraBalance: data?.goraBalance || 0,
    goraPrice: data?.goraPrice,
    goraAmount: data?.goraAmount
      ? Number(data.goraAmount.toFixed(5))
      : undefined,
  }
}
