import { memo } from 'react'

import LogoSVG from 'assets/logo.svg?react'

import s from './Header.module.scss'

export const Header = memo(() => {
  return (
    <div className={s.wrapper}>
      <LogoSVG />
    </div>
  )
})
