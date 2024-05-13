import { useMediaBreakpoints } from 'shared/hooks/useMediaBreakpoints'
import { Text } from 'shared/ui/common/Text'
import { RoundCTAButton } from 'shared/ui/controls/RoundCTAButton'

import s from './ActionToContinueScreen.module.scss'

type Props = {
  title: React.ReactNode
  actionTitle: React.ReactNode
  actionText: React.ReactNode
  actionHint: React.ReactNode
  buttonTestId?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export function ActionToContinueScreen({
  title,
  actionTitle,
  actionText,
  actionHint,
  buttonTestId,
  onClick,
}: Props) {
  const { isMobile } = useMediaBreakpoints()
  return (
    <div className={s.wrap}>
      <Text
        size={16}
        weight={500}
        color="secondary"
        isUppercased
        isCentered
        className={s.title}
      >
        {title}
      </Text>

      <RoundCTAButton
        size={!isMobile ? 420 : 350}
        borderOffset={!isMobile ? 24 : 31}
        className={s.button}
        onClick={onClick}
        testId={buttonTestId}
      >
        <Text size={14} weight={500} color="secondary" isUppercased>
          {actionTitle}
        </Text>
        <Text size={36} weight={700} isUppercased>
          {actionText}
        </Text>
        <Text size={14} weight={500} color="secondary" isUppercased>
          {actionHint}
        </Text>
      </RoundCTAButton>
    </div>
  )
}
