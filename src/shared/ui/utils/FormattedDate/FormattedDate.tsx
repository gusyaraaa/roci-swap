import { useMemo } from 'react'
import dayjs from 'dayjs'

import s from './FormattedDate.module.scss'

type Props = {
  date: number
  format: string
}

export function FormattedDate({ date, format }: Props) {
  const [formattedDay, formattedTime] = useMemo(
    () =>
      dayjs
        .unix(date / 1000)
        .format(format)
        .split(' '),
    [date, format],
  )

  return (
    <span>
      {formattedDay} <span className={s.time}>{formattedTime}</span>
    </span>
  )
}
