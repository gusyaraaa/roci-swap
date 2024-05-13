import { useState, forwardRef, useCallback } from 'react'
import cns from 'classnames'

import { FieldError } from 'shared/ui/controls/FieldError'

import s from './Input.module.scss'

type InputElement = HTMLInputElement | HTMLTextAreaElement

type Props = {
  id?: string
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  autofill?: string
  placeholder?: string
  autoComplete?: string
  maxLength?: number
  className?: string
  placeholderClassName?: string
  concat?: ('top' | 'bottom')[]
  rows?: number
  minRows?: number
  maxRows?: number
  error?: React.ReactNode
  action?: React.ReactNode
  testId?: string

  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  onlyNumber?: boolean
  withMargin?: boolean

  onChange?: React.ChangeEventHandler<InputElement>
  onKeyDown?: React.KeyboardEventHandler<InputElement>
  onKeyPress?: React.KeyboardEventHandler<InputElement>
  onFocus?: React.FocusEventHandler<InputElement>
  onBlur?: React.FocusEventHandler<InputElement>
}

function InputRaw(
  {
    className,
    placeholder,
    type = 'text',
    withMargin = true,
    onFocus,
    onBlur,
    value: valueProp,
    defaultValue,
    onChange,
    concat,
    error,
    action,
    onlyNumber,
    readOnly,
    disabled,
    autofill = 'off',
    autoComplete = 'off',
    testId,
    placeholderClassName,
    ...restProps
  }: Props,
  ref: React.Ref<InputElement>,
) {
  const [valueState, setValue] = useState('')
  const [isFocused, setFocused] = useState(false)

  const isTextarea = type === 'textarea'
  const Tag = isTextarea ? 'textarea' : 'input'
  const isControlled = Boolean(onChange)
  const value = isControlled ? valueProp : valueState

  const handleFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(true)
      onFocus?.(e)
    },
    [onFocus],
  )

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFocused(false)
      onBlur?.(e)
    },
    [onBlur],
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const localEvent = { ...e }
      // there may be a dot or a comma on the decimal mobile keyboard
      // depending on localization and browser
      localEvent.target.value = onlyNumber
        ? e.target.value.replace(',', '.')
        : e.target.value

      if (onlyNumber && isNaN(Number(localEvent.target.value))) {
        return
      }
      if (onChange) {
        onChange(localEvent)
      } else {
        setValue(localEvent.target.value)
      }
    },
    [onChange, onlyNumber],
  )

  const fieldProps = {
    ...restProps,
    autofill,
    autoComplete,
    readOnly,
    type: !isTextarea ? type : undefined,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChange: handleChange,
    value,
    defaultValue,
    className: s.field,
    disabled: disabled || readOnly,
    'data-test-id': testId,
  }

  return (
    <div
      className={cns(s.wrap, className, {
        [s.isError]: Boolean(error),
        [s.isFocused]: isFocused,
        [s.isDisabled]: disabled,
        [s.withMargin]: withMargin,
        [s.isConcatTop]: concat?.includes('top'),
        [s.isConcatBottom]: concat?.includes('bottom'),
        [s.isConcatTopBottom]:
          concat?.includes('top') && concat.includes('bottom'),
        // eslint-disable-next-line css-modules/no-undef-class
        [s.isReadOnly]: readOnly,
      })}
    >
      <div
        className={cns(
          s.placeholder,
          {
            [s.isMoved]: isFocused || Boolean(value) || Boolean(defaultValue),
          },
          placeholderClassName,
        )}
      >
        {placeholder}
      </div>
      <Tag
        {...fieldProps}
        ref={ref as any}
        type={type}
        inputMode={onlyNumber ? 'decimal' : undefined}
      />
      {action && <div className={s.actionWrap}>{action}</div>}
      {error && <FieldError className={s.error}>{error}</FieldError>}
    </div>
  )
}

export const Input = forwardRef<InputElement, Props>(InputRaw)
