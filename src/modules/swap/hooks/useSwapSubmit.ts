import useSWR from 'swr'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { useEthersSigner } from 'modules/blockchain/hooks/useEthersSigner'
import { strToWei } from 'modules/blockchain/utils/parseWei'
import {
  ContractROCI,
  ContractRociConverter,
} from 'modules/contracts/contracts'

export const useSwapSubmit = () => {
  const { chainId, walletAddress } = useWeb3()
  const signer = useEthersSigner()

  const { data, isLoading } = useSWR(
    `swap-submit-${chainId}-${signer}-${walletAddress}`,
    async () => {
      if (!signer || !walletAddress) return

      const rociConverter = ContractRociConverter.connectWeb3({
        signer,
        chainId,
      })
      const rociToken = ContractROCI.connectWeb3({
        signer,
        chainId,
      })
      const rociConverterAddress = await rociConverter.getAddress()

      const submit = async (
        rociAmount: string,
        catId: number,
        proof: string[],
      ) => {
        const weiAmount = strToWei(rociAmount, 18)
        const allowance = await rociToken.allowance(
          walletAddress,
          rociConverterAddress,
        )

        if (allowance - weiAmount < 0) {
          const approveTxReceipt = await rociToken.approve(
            rociConverterAddress,
            weiAmount,
          )
          await signer.provider.waitForTransaction(approveTxReceipt.hash)
        }
        const convertTxReceipt = await rociConverter.convert(
          weiAmount,
          catId,
          proof,
        )
        return convertTxReceipt
      }

      return { submit }
    },
    { keepPreviousData: true },
  )

  return {
    submit: data?.submit,
    isLoading: isLoading || !data,
  }
}
