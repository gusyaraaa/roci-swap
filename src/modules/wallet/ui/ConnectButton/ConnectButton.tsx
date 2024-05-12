import cns from 'classnames'

import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { Text, TextColor } from 'shared/ui/common/Text'

import s from './ConnectButton.module.scss'

export type Props = {
  textColor?: TextColor
  icon: React.ReactNode
  children: React.ReactNode
  onClick: React.MouseEventHandler
  className?: string
  disabled?: boolean
}

export const ConnectButton = (props: Props) => {
  const { textColor, icon, onClick, children, className, disabled } = props

  const { isMobile } = useMediaBreakpoints()

  return (
    <button
      onClick={onClick}
      className={cns(s.connectButton, className)}
      disabled={disabled}
    >
      <div className={s.icon}>{icon}</div>
      <Text size={isMobile ? 20 : 16} weight={500} color={textColor}>
        {children}
      </Text>
    </button>
  )
}
