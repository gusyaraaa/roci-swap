import { Button } from 'shared/ui/controls/Button'

import s from './FormSubmitter.module.scss'

type Props = {
  isLocked?: boolean
  isSubmitting?: boolean
  isDisabled?: boolean
  firstStepText?: React.ReactNode
  submitTestId?: string
  confirmTestId?: string
  onClickUnlock?: () => void
  onConfirm?: () => void
}

export const FormSubmitter = ({
  isLocked,
  isSubmitting,
  isDisabled,
  firstStepText,
  submitTestId,
  confirmTestId,
  onClickUnlock,
  onConfirm,
}: Props) => {
  return (
    <div className={s.wrapper}>
      {!isLocked && (
        <Button
          type="submit"
          isLoading={isSubmitting}
          isDisabled={isDisabled}
          isFullWidth
          testId={submitTestId}
        >
          {firstStepText}
        </Button>
      )}
      {isLocked && (
        <div className={s.buttonsRow}>
          <Button
            isDisabled={isSubmitting}
            fashion="secondary"
            className={s.edit}
            onClick={onClickUnlock}
          >
            Edit
          </Button>
          <Button
            type={onConfirm ? 'button' : 'submit'}
            fashion="accent"
            className={s.confirm}
            isLoading={isSubmitting}
            isDisabled={isDisabled}
            testId={confirmTestId}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      )}
    </div>
  )
}
