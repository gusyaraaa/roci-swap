import { Text, TextSize, TextColor } from 'shared/ui/common/Text'

import s from './InfoFieldValue.module.scss'

type Props = {
  label?: React.ReactNode
  value?: React.ReactNode
  valueSize?: TextSize
  valueColor?: TextColor
  sign?: React.ReactNode
  secondaryValue?: React.ReactNode
  secondaryValueSize?: TextSize
  secondaryValueColor?: TextColor
  secondaryValueSign?: React.ReactNode
  className?: string
  testId?: string
}

export function InfoFieldValue({
  label,
  value,
  valueSize = 16,
  valueColor = 'default',
  sign,
  secondaryValue,
  secondaryValueColor = 'secondary',
  secondaryValueSize = 14,
  secondaryValueSign,
  className,
  testId,
}: Props) {
  return (
    <div className={className}>
      <Text
        size={12}
        weight={500}
        isUppercased
        color="secondary"
        className={s.label}
      >
        {label}
      </Text>
      <Text
        color={valueColor}
        size={valueSize}
        weight={500}
        isUppercased
        className={s.value}
        testId={testId}
      >
        {value}
        {sign && (
          <>
            &nbsp;
            <span>{sign}</span>
          </>
        )}
      </Text>
      {/* This triple-check is here because zero-number value can be there */}
      {secondaryValue !== '' &&
        secondaryValue !== null &&
        secondaryValue !== undefined && (
          <Text
            color={secondaryValueColor}
            size={secondaryValueSize}
            isUppercased
            weight={500}
          >
            {value}
            {sign && (
              <>
                &nbsp;
                <span>{sign}</span>
              </>
            )}
          </Text>
        )}
    </div>
  )
}
