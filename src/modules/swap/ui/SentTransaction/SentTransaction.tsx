import { useMemo } from 'react'

import { useTransactionDetails } from 'modules/blockchain/hooks/useTransactionDetails'
import { formatAsset } from 'modules/blockchain/utils/formatAsset'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'

import s from './SentTransaction.module.scss'

type Props = {
  txHash?: string
  payAmount?: string
  receiveAmount?: string
  stillInProgress?: boolean
  warning?: React.ReactNode
  onSuccess?: () => void
}

export function SentTransaction({
  txHash,
  payAmount,
  receiveAmount,
  stillInProgress,
  warning,
  onSuccess,
}: Props) {
  const { isMobile } = useMediaBreakpoints()
  const { txStatus, txGasCost } = useTransactionDetails({
    hash: txHash,
    defaultStatus: 'pending',
    onSuccess,
  })

  const textFromStatus = useMemo(() => {
    if (txStatus.isFailed) {
      return (
        <>
          has <br />
          failed
        </>
      )
    }

    if (txStatus.isPending || stillInProgress) {
      return (
        <>
          in <br />
          progress
        </>
      )
    }

    if (txStatus.isSuccess) {
      return (
        <>
          <br />
          successful
        </>
      )
    }
  }, [
    txStatus.isFailed,
    txStatus.isPending,
    txStatus.isSuccess,
    stillInProgress,
  ])

  return (
    <div className={s.wrap}>
      <ContractSuccessTitle
        status={
          txStatus.isSuccess && stillInProgress ? 'pending' : txStatus.status
        }
        txHash={txHash}
      >
        Convert {textFromStatus}
      </ContractSuccessTitle>

      {txStatus.isSuccess && warning}
      <div className={s.row}>
        <InfoFieldValue
          label="Type of transaction"
          value="Convert"
          className={s.column}
        />
        <InfoFieldValue
          label="Gas cost"
          value={txGasCost ? formatAsset(txGasCost) : 'pending...'}
          sign={txGasCost ? 'ETH' : undefined}
          className={s.column}
        />
      </div>
      <div className={s.row}>
        <InfoFieldValue
          label="Pay"
          value={
            payAmount ? Number(Number(payAmount).toFixed(5)) : 'pending...'
          }
          sign={payAmount ? '$ROCI' : undefined}
          className={s.column}
        />
        <InfoFieldValue
          label="Receive"
          value={receiveAmount ? receiveAmount : 'pending...'}
          sign={receiveAmount ? '$GORA' : undefined}
          className={s.column}
        />
      </div>
    </div>
  )
}
