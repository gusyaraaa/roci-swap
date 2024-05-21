import cns from 'classnames'

import s from './ProgressBar.module.scss'

type Props = {
  color?: 'branded' | 'greenapple' | 'error'
  isFilled?: boolean
  isCentered?: boolean
  className?: string
}

export function ProgressBar({
  color = 'branded',
  isFilled,
  isCentered,
  className,
}: Props) {
  return (
    <div
      className={cns(s.progressWrap, s[`color--${color}`], className, {
        [s.isFilled]: isFilled,
        [s.isCentered]: isCentered,
      })}
    >
      {!isFilled &&
        Array.from(Array(10)).map((_, i) => (
          <div key={i} className={s.progressSection} />
        ))}
    </div>
  )
}
