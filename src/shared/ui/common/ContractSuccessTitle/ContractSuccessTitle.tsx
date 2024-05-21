import { useBlockExplorerOpener } from 'modules/blockchain/hooks/useBlockExplorerOpener'
import { useBlockExplorerName } from 'modules/blockchain/hooks/useBlockExplorerName'
import type { TxStatus } from 'modules/blockchain/types'
import { Text } from 'shared/ui/common/Text'
import { ProgressBar } from 'shared/ui/common/ProgressBar'
import { ButtonForward } from 'shared/ui/controls/ButtonForward'

import s from './ContractSuccessTitle.module.scss'

type Props = {
  txHash: string | null | undefined
  status: TxStatus
  children?: React.ReactNode
}

export function ContractSuccessTitle({ txHash, status, children }: Props) {
  const handleOpen = useBlockExplorerOpener(txHash, 'tx')
  const blockExplorerName = useBlockExplorerName()
  const color =
    status === 'failed'
      ? 'error'
      : status === 'pending' || status === 'signing' || status === 'success'
        ? 'greenapple'
        : 'branded'

  return (
    <div className={s.wrap}>
      <Text
        size={40}
        weight={700}
        color={color}
        isUppercased
        className={s.title}
      >
        {children}
      </Text>

      <ProgressBar
        color={color}
        isFilled={!(status === 'pending' || status === 'signing')}
        className={s.progress}
      />

      <ButtonForward onClick={handleOpen}>
        <Text
          tag="span"
          size={12}
          weight={500}
          isUppercased
          className={s.linkText}
        >
          Show on <span className={s.explorer}>{blockExplorerName}</span>
        </Text>
      </ButtonForward>
    </div>
  )
}
