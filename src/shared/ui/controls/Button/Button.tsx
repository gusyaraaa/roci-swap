import { Link, Path } from 'react-router-dom'
import cns from 'classnames'

import LoaderSVG from 'assets/loader.svg?react'

import s from './Button.module.scss'

type ButtonSize = 24 | 30 | 40 | 56 | 60 | 72 | 147
type ButtonFashion =
  | 'primary'
  | 'secondary'
  | 'branded'
  | 'accent'
  | 'accent-light'
  | 'error'
  | 'default'

type Props = {
  link?: string | Partial<Path>
  size?: ButtonSize
  type?: 'button' | 'submit'
  fashion?: ButtonFashion
  isSquare?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
  isDisabled?: boolean
  isCentered?: boolean
  isClickable?: boolean
  onClick?: React.MouseEventHandler
  children?: React.ReactNode
  className?: string
  testId?: string
}

export function Button({
  link,
  size = 60,
  type = 'button',
  fashion = 'primary',
  onClick,
  isSquare,
  isFullWidth,
  isLoading,
  isDisabled,
  isCentered,
  children,
  isClickable = true,
  className,
  testId,
}: Props) {
  const props = {
    onClick: !isLoading && !isDisabled ? onClick : undefined,
    disabled: isDisabled || isLoading,

    className: cns(
      s.button,
      className,
      s[`size--${size}`],
      s[`fashion--${fashion}`],
      {
        [s.isSquare]: isSquare,
        [s.isFullWidth]: isFullWidth,
        [s.isLoading]: isLoading,
        [s.isDisabled]: isDisabled,
        [s.isCentered]: isCentered,
        [s.isClickable]: isClickable,
      },
    ),
    children: (
      <>
        <span className={s.content}>{children}</span>
        {isLoading && (
          <span className={s.loader}>
            <LoaderSVG />
          </span>
        )}
      </>
    ),
    'data-test-id': testId,
  }

  if (link && !isDisabled) {
    return <Link to={link} {...props} />
  }

  return <button type={type} {...props} />
}
