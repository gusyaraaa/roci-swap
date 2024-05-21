import { useCallback, useEffect, useRef } from 'react'
import { formatEther } from 'ethers'
import type { Block, TransactionReceipt } from 'ethers'

import { useSimpleReducer } from 'shared/hooks/useSimpleReducer'
import type { TxStatus, TxStatusObj } from '../types'
import { useWeb3 } from './useWeb3'
import { useEthersSigner } from './useEthersSigner'

type Args = {
  hash?: string | null
  defaultStatus?: TxStatus
  onSuccess?: () => void
  onFail?: () => void
}

type TxDetails = {
  block: Block | null
  receipt: TransactionReceipt | null
  status: TxStatus
  gasCost: number
}

const getDefaultDetails = (status: TxStatus) => ({
  block: null,
  receipt: null,
  gasCost: 0,
  status,
})

const convertStatusCodeToText = (statusCode: number | null | undefined) => {
  if (statusCode === 1) {
    return 'success'
  } else if (statusCode === 0) {
    return 'failed'
  }

  return 'pending'
}

export function useTransactionDetails({
  hash,
  defaultStatus = 'empty',
  onSuccess,
  onFail,
}: Args) {
  const { walletAddress, chainId } = useWeb3()
  const signer = useEthersSigner()
  const [details, setDetails] = useSimpleReducer<TxDetails>(
    getDefaultDetails(defaultStatus),
  )
  const shouldCallOnSuccess = useRef(true)

  const resetTransaction = useCallback(() => {
    setDetails(getDefaultDetails(defaultStatus))
  }, [setDetails, defaultStatus])

  useEffect(() => {
    resetTransaction()
  }, [walletAddress])

  useEffect(() => {
    if (!hash || !walletAddress) {
      return
    }

    const checkTransaction = async (
      e: TransactionReceipt | null | undefined,
    ) => {
      if (!e) {
        setDetails({ status: 'pending' })
        return
      }

      const txStatus = convertStatusCodeToText(e.status)
      const confirmations = await e.confirmations()
      if (
        (txStatus === 'success' && confirmations >= 1) ||
        txStatus === 'failed'
      ) {
        let gasCost: number = 0
        try {
          const { gasUsed, gasPrice } = e
          gasCost = Number(formatEther(gasUsed * gasPrice))
        } catch (error) {}

        if (txStatus === 'success' && shouldCallOnSuccess.current) {
          onSuccess?.()
          shouldCallOnSuccess.current = false
        }
        if (txStatus === 'failed') onFail?.()

        setDetails({
          receipt: e,
          gasCost,
          status: txStatus,
        })
      } else {
        setDetails({ status: 'pending' })
      }
    }

    let isMounted = true

    signer?.provider.getTransactionReceipt(hash).then(e => {
      if (isMounted) checkTransaction(e)
    })
    signer?.provider.on(hash, checkTransaction)

    return () => {
      isMounted = false
      signer?.provider.off(hash, checkTransaction)
    }
  }, [
    signer?.provider,
    hash,
    defaultStatus,
    setDetails,
    walletAddress,
    onSuccess,
    onFail,
  ])

  useEffect(() => {
    if (!details.receipt) {
      setDetails({ block: null })
      return
    }
    signer?.provider
      .getBlock(details.receipt.blockNumber)
      .then((block: Block) => {
        setDetails({ block })
      })
  }, [details.receipt, signer?.provider, setDetails])

  const txStatus: TxStatusObj = {
    status: details.status,
    isEmpty: details.status === 'empty',
    isFailed: details.status === 'failed',
    isPending: details.status === 'pending',
    isSuccess: details.status === 'success',
  }

  return {
    block: details.block,
    receipt: details.receipt,
    txGasCost: details.gasCost,
    txStatus,
    resetTransaction,
  }
}
