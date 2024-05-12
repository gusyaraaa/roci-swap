import { useCallback, useContext, useMemo } from 'react'

import { modalContext, ModalComponentType } from '../providers/ModalProvider'

export const useModal = <P>(modal: ModalComponentType<P>) => {
  const { openModal, closeModal } = useContext(modalContext)

  const open = useCallback(
    (props: P) => openModal(modal, props),
    [openModal, modal],
  )

  const close = useCallback(() => closeModal(modal), [closeModal, modal])

  return useMemo(() => ({ open, close }), [open, close])
}

export const getUseModal = <P>(modal: ModalComponentType<P>) => {
  return () => useModal(modal)
}
