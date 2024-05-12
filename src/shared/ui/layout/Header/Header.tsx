import { memo } from 'react'

import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import LogoSVG from 'assets/logo.svg?react'

import s from './Header.module.scss'

export const Header = memo(() => {
  return (
    <div className={s.wrapper}>
      <LogoSVG />
      <div>
        <HeaderWallet />
      </div>
    </div>
  )
})
