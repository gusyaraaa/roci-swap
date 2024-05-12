import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import cns from 'classnames'

import { WALLET_ICONS } from 'modules/wallet/constants'

import s from './AddressIcon.module.scss'

type Props = {
  address: string
  walletName?: string | null | undefined
  className?: string
}

export const AddressIcon = ({ address, walletName, className }: Props) => {
  if (walletName) {
    const icon = WALLET_ICONS[walletName]

    if (icon) {
      return <div className={cns(s.walletIcon, className)}>{icon}</div>
    }
  }

  return (
    <div className={cns(s.jazzIcon, className)}>
      <Jazzicon
        diameter={40}
        seed={jsNumberForAddress(address)}
        paperStyles={{ borderRadius: 0 }}
      />
    </div>
  )
}
