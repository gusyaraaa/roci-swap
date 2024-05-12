import cns from 'classnames'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'

import s from './ButtonWithIcon.module.scss'

type Props = {
  text: string
  icon: React.ReactNode
  className?: string
  fashion?: 'accent' | 'error'
  testId?: string
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: React.MouseEventHandler
}

export const ButtonWithIcon = (props: Props) => {
  const {
    text,
    icon,
    className,
    fashion = 'accent',
    isLoading,
    testId,
    isDisabled,
    onClick,
  } = props

  return (
    <div
      className={cns(
        s.wrap,
        s[`fashion--${fashion}`],
        { [s.isLoading]: isLoading },
        { [s.isDisabled]: isDisabled },
        className,
      )}
    >
      <Text size={12} isUppercased tag="span" color="inherit">
        {text}
      </Text>
      <Button
        size={40}
        isSquare
        fashion={fashion}
        isClickable={Boolean(onClick)}
        onClick={onClick}
        isDisabled={isDisabled}
        testId={testId}
      >
        {icon}
      </Button>
    </div>
  )
}
