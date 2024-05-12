import cns from 'classnames'

import { useScrollLock } from 'shared/hooks/useScrollLock'
import { Button } from 'shared/ui/controls/Button'

import CloseSVG from 'assets/close.svg?react'

import s from './Modal.module.scss'

export type ModalProps = {
  onClose: () => void
}

type Props = ModalProps & {
  width?: number
  children?: React.ReactNode
  className?: string
  withCloseOnClickOutside?: boolean
  withVerticalAlignment?: boolean
}

export const Modal = ({
  width,
  children,
  className,
  withCloseOnClickOutside = true,
  withVerticalAlignment = true,
  onClose,
}: Props) => {
  useScrollLock()

  return (
    <div
      className={cns(s.wrap, {
        [s.withVerticalAlignment]: withVerticalAlignment,
      })}
    >
      <div className={s.scrollWrap}>
        <div
          className={s.overlay}
          onClick={withCloseOnClickOutside ? onClose : undefined}
        />
        <div
          className={cns(s.body, className)}
          style={width ? { maxWidth: width, width: '100%' } : { width: '100%' }}
          children={children}
          data-nosnippet
        />
        <Button
          isSquare
          fashion="secondary"
          className={s.close}
          onClick={onClose}
        >
          <CloseSVG />
        </Button>
      </div>
    </div>
  )
}
