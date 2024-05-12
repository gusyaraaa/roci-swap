import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { ModalProps } from 'modules/modal/ui/Modal'
import { SwitchWalletModal } from '../SwitchWalletModal'

type Props = {
  onSuccess?: () => void
} & ModalProps

export const ConnectWalletModal = (props: Props) => {
  const { isWalletConnected } = useWeb3()

  if (!isWalletConnected) {
    return <SwitchWalletModal {...props} />
  }

  return null
}
