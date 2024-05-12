import { PropsWithChildren } from 'react'

import { Header } from '../Header'

import s from './AppLayout.module.scss'

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  )
}
