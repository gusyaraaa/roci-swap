import cns from 'classnames'

import { Text } from '../Text'

import WarningSVG from 'assets/warning-filled.svg?react'

import s from './WarningCard.module.scss'

type Props = {
  title: React.ReactNode | string
  content?: React.ReactNode
  className?: string
}

export const WarningCard = (props: Props) => {
  const { title, content, className } = props

  return (
    <div className={cns(s.wrap, className)}>
      <WarningSVG />
      {title ? (
        <Text size={14} weight={500} isCentered>
          {title}
        </Text>
      ) : null}
      {content}
    </div>
  )
}
