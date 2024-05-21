import cns from 'classnames'

import ArrowIcon from 'assets/forward.svg?react'

import s from './ButtonForward.module.scss'

type Props = {
  fashion?: 'default' | 'greenapple'
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
  className?: string
  testId?: string
  isDisabled?: boolean
}

export function ButtonForward({
  fashion = 'default',
  onClick,
  children,
  className,
  testId,
  isDisabled,
}: Props) {
  return (
    <button
      className={cns(
        s.wrap,
        { [s.greenapple]: fashion === 'greenapple' },
        className,
      )}
      onClick={onClick}
      data-test-id={testId}
      disabled={isDisabled}
    >
      {children}
      <div className={s.iconBox}>
        <ArrowIcon />
      </div>
    </button>
  )
}
