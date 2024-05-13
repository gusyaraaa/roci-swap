import { useScrollLock } from 'shared/hooks/useScrollLock'

import LoaderSVG from 'assets/loader.svg?react'

import s from './LoaderLayout.module.scss'

export const LoaderLayout = () => {
  useScrollLock()
  return (
    <div className={s.root}>
      <LoaderSVG />
    </div>
  )
}
