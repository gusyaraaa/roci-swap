import cns from 'classnames'

import s from './Text.module.scss'

export type TextSize =
  | 12
  | 13
  | 14
  | 15
  | 16
  | 18
  | 20
  | 22
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor =
  | 'default'
  | 'secondary'
  | 'branded'
  | 'greenapple'
  | 'error'
  | 'errorSecondary'
  | 'greenapplesoft'
  | 'inherit'
  | 'ff36'
  | 'secondary80'
  | 'warning'

export type TextParams = {
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  isUppercased?: boolean
}

type Props = TextParams & {
  tag?: 'div' | 'span'
  truncateLines?: number
  isCentered?: boolean
  isInLine?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler
  className?: string
  testId?: string
}

export function Text({
  tag = 'div',
  size,
  color = 'default',
  weight = 500,
  truncateLines,
  isCentered,
  isUppercased,
  isInLine,
  children,
  onClick,
  className,
  testId,
}: Props) {
  const Tag = tag
  const isTruncateOne = truncateLines && truncateLines === 1
  const isTruncateMany = truncateLines && truncateLines > 1
  return (
    <Tag
      onClick={onClick}
      style={{
        ...(isTruncateMany ? { WebkitLineClamp: truncateLines } : {}),
      }}
      className={cns(
        s.text,
        className,
        s[`size--${size}`],
        s[`color--${color}`],
        s[`weight--${weight}`],
        {
          [s.isCentered]: isCentered,
          [s.isUppercased]: isUppercased,
          [s.truncateOne]: isTruncateOne,
          [s.truncateMany]: isTruncateMany,
          [s.isInLine]: isInLine,
        },
      )}
      data-test-id={testId}
    >
      {children}
    </Tag>
  )
}
