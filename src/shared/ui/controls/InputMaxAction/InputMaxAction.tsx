import cns from 'classnames'

import { Text } from 'shared/ui/common/Text'

import s from './InputMaxAction.module.scss'

type Props = {
  onClick?: React.MouseEventHandler
  className?: string
  isDisabled?: boolean
  testId?: string
}

export function InputMaxAction({
  onClick,
  className,
  testId,
  isDisabled,
}: Props) {
  return (
    <Text
      size={12}
      weight={500}
      color="greenapple"
      isUppercased
      onClick={!isDisabled ? onClick : undefined}
      className={cns(s.inputMaxAction, className, { [s.disabled]: isDisabled })}
      testId={testId}
    >
      MAX
    </Text>
  )
}
