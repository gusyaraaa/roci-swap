import cns from 'classnames'
import { Link } from 'react-router-dom'

import { Button } from '../Button'

import ArrowIcon from 'assets/back.svg?react'

import s from './RoundCTAButton.module.scss'

type Props = {
  size: number
  borderOffset: number
  href?: string
  fashion?: 'primary' | 'error' | 'purple' | 'cyan'
  isExternal?: boolean
  onClick?: React.MouseEventHandler
  className?: string
  classNameBg?: string
  children?: React.ReactNode
  icon?: React.ReactNode
  isCentered?: boolean
  isDisabled?: boolean
  testId?: string
}

export function RoundCTAButton({
  size,
  borderOffset,
  href,
  fashion = 'primary',
  isExternal = true,
  onClick,
  className,
  classNameBg,
  children,
  testId,
  isCentered,
  isDisabled,
  icon,
}: Props) {
  const bgCoeff = 1 - (borderOffset * 2) / size
  const props = {
    onClick: !isDisabled ? onClick : undefined,
    className: cns(s.root, className, s[`fashion--${fashion}`], {
      [s.isCentered]: isCentered,
      [s.isDisabled]: isDisabled,
    }),
    style: {
      '--roundCtaBtn__size': `${size}px`,
      '--roundCtaBtn__borderOffset': `${borderOffset}px`,
      '--roundCtaBtn__bgCoeff': `${bgCoeff}`,
    } as React.CSSProperties,
    children: (
      <>
        <div className={cns(s.bg, classNameBg)} />
        {children}
        <Button isSquare size={40} fashion="secondary" isDisabled={isDisabled}>
          {icon || <ArrowIcon className={s.arrow} />}
        </Button>
      </>
    ),
    'data-test-id': testId,
  }

  if (!isDisabled) {
    if (href && isExternal) {
      return <a {...props} href={href} target="_blank" rel="noreferrer" />
    }

    if (href) {
      return <Link {...props} to={href} />
    }
  }

  return <div {...props} />
}
