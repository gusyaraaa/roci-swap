import { ActionToContinueScreen } from 'shared/ui/common/ActionToContinueScreen'
import { useConnectWalletModal } from '../ConnectWalletModal'

export const ConnectWalletScreen = () => {
  const modalConnectModal = useConnectWalletModal()

  return (
    <ActionToContinueScreen
      title="Wallet is not connected"
      actionTitle="Please"
      actionText={
        <>
          Connect
          <br /> wallet
        </>
      }
      actionHint="to continue using app"
      buttonTestId="connect-wallet-guard-button"
      onClick={() => modalConnectModal.open({})}
    />
  )
}
