import { useRef, useState, useCallback } from 'react'
import { useDisconnect } from 'wagmi'
import cns from 'classnames'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'
import { AddressIcon } from 'modules/modal/ui/AddressIcon'
import { Text } from 'shared/ui/common/Text'
import { trimMiddleString } from 'shared/utils/trimMiddleString'
import { useClickOutside } from 'shared/hooks/useClickOutside'
import { ButtonWithIcon } from 'shared/ui/common/ButtonWithIcon'

import WalletSVG from 'assets/wallet.svg?react'
import ExitSVG from 'assets/exit.svg?react'

import s from './HeaderWallet.module.scss'

type Props = {
  className?: string
}

export function HeaderWallet({ className }: Props) {
  const refButton = useRef<HTMLDivElement | null>(null)
  const refMenu = useRef<HTMLDivElement | null>(null)

  const [isOpened, setOpened] = useState(false)
  const { isWalletConnected, walletAddress, walletName } = useWeb3()
  const connectWalletModal = useConnectWalletModal()
  const { disconnect } = useDisconnect()
  const handleClose = useCallback(() => setOpened(false), [])
  const handleToggle = useCallback(() => setOpened(v => !v), [])

  const handleDisconnect = useCallback(() => {
    handleClose()
    disconnect()
  }, [handleClose, disconnect])

  const handleClickAway = useCallback(
    (e: MouseEvent) => {
      if (
        e.target === refButton.current ||
        refButton.current?.contains(e.target as HTMLElement)
      ) {
        return
      }
      handleClose()
    },
    [handleClose],
  )

  useClickOutside(refMenu, handleClickAway)

  if (!isWalletConnected || !walletAddress) {
    return (
      <ButtonWithIcon
        text="Connect wallet"
        icon={<WalletSVG />}
        onClick={() => connectWalletModal.open({})}
        className={cns(s.connectButton, className)}
      />
    )
  }

  return (
    <span className={cns(s.wrap, className)}>
      <div ref={refButton} className={s.walletButton} onClick={handleToggle}>
        <Text size={16} weight={500} isUppercased={false} className={s.address}>
          {trimMiddleString(String(walletAddress), 6, 4)}
        </Text>
        <AddressIcon address={walletAddress} walletName={walletName} />
      </div>

      {isOpened && (
        <div ref={refMenu} className={s.menu}>
          <div className={s.content}>
            <div className={s.menuButton} onClick={handleDisconnect}>
              <div className={s.icon}>
                <ExitSVG />
              </div>
              <Text>log out</Text>
            </div>
          </div>
        </div>
      )}
    </span>
  )
}
