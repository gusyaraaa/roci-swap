import { useEffect, useState } from 'react'
import { useConnect, type Connector } from 'wagmi'

import { Modal, ModalProps } from 'modules/modal/ui/Modal'
import { WALLET_ICONS } from 'modules/wallet/constants'
import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { Text } from 'shared/ui/common/Text'
import { ConnectButton } from '../ConnectButton'

import s from './SwitchWalletModal.module.scss'

const WalletOption = ({
  connector,
  onClick,
}: {
  connector: Connector
  onClick: () => void
}) => {
  const { walletName } = useWeb3()
  const [ready, setReady] = useState(false)
  const Icon = WALLET_ICONS[connector.name]
  const shouldDisableMetamask =
    connector.name === 'MetaMask' && walletName === 'MetaMask'

  useEffect(() => {
    ;(async () => {
      const provider = await connector.getProvider()
      setReady(!!provider)
    })()
  }, [connector])

  return (
    <>
      <ConnectButton
        icon={Icon}
        onClick={onClick}
        disabled={!ready || shouldDisableMetamask}
        children={connector.name}
      />
      {shouldDisableMetamask ? (
        <Text size={12} color="secondary" tag="span">
          You can switch address via MetaMask UI
        </Text>
      ) : null}
    </>
  )
}

type Props = {
  width?: number
  title?: string
  onSuccess?: (walletAddress: `0x${string}`) => void
} & ModalProps

export const SwitchWalletModal = ({
  width = 750,
  title,
  onSuccess,
  ...modalProps
}: Props) => {
  const { connectors, connect } = useConnect()

  return (
    <Modal width={width} {...modalProps}>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        {title ?? 'Connect Wallet'}
      </Text>
      <div className={s.connectors}>
        {connectors.map((connector: Connector) => {
          return (
            <div className={s.buttonWrap} key={connector.uid}>
              <WalletOption
                connector={connector}
                onClick={() => connect({ connector })}
              />
            </div>
          )
        })}
      </div>
    </Modal>
  )
}
