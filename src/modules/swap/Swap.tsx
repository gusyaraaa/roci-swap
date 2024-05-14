import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { ConnectWalletScreen } from 'modules/wallet/ui/ConnectWalletScreen'
import { Text } from 'shared/ui/common/Text'
import { FormSubmitter } from 'shared/ui/controls/FormSubmitter'
import { Form } from 'shared/ui/controls/FormNetworkGuarded'
import { InputControl } from 'shared/ui/controls/Input'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import * as formErrors from 'shared/constants/formErrors'
import { useSwapFormData } from './useSwapFormData'

import RociSVG from 'assets/asset-roci.svg?react'
import GoraSVG from 'assets/asset-gora.svg?react'

import s from './Swap.module.scss'

type FormValues = {
  rociAmount: string
  goraAmount: string
}

export const Swap = () => {
  const { isWalletConnected } = useWeb3()

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { rociAmount: '', goraAmount: '' },
  })

  const { watch, setValue, formState } = formMethods
  const { rociAmount } = watch()
  const { isSubmitting } = formState

  const {
    rociBalance,
    goraBalance,
    goraPrice,
    goraAmount,
    isFetching,
    isLoading,
  } = useSwapFormData({
    rociAmount,
  })

  useEffect(() => {
    if (isFetching) {
      return setValue('goraAmount', 'loading...')
    }
    if (goraAmount) {
      return setValue('goraAmount', `${goraAmount}`)
    }
    setValue('goraAmount', '')
  }, [goraAmount])

  const handleClickMaxAmount = (name: 'rociAmount') => () => {
    setValue(name, `${rociBalance}`, { shouldValidate: true })
  }

  const handleSubmit = (values: FormValues) => {
    console.log(values)
  }

  if (!isWalletConnected) {
    return <ConnectWalletScreen />
  }

  return (
    <Form className={s.form} formMethods={formMethods} onSubmit={handleSubmit}>
      <InputControl
        className={s.input}
        name="rociAmount"
        placeholder="You pay"
        concat={['bottom']}
        onlyNumber
        rules={{
          required: formErrors.required,
          validate: (val: string) =>
            formErrors.weiParsing(val, 18) ||
            formErrors.floorValue(val, 18) ||
            formErrors.minValue(val, goraPrice, 18) ||
            formErrors.balance(val, rociBalance, '$ROCI', 18) ||
            true,
        }}
        action={
          <div className={s.action}>
            <div className={s.asset}>
              <Text size={18} isInLine isUppercased>
                $Roci
              </Text>
              <RociSVG />
            </div>
            <div className={s.info}>
              <Text size={12} color="secondary80" isInLine>
                Balance:{' '}
                {isLoading ? 'loading...' : Number(rociBalance.toFixed(5))}
              </Text>
              {rociBalance > 0 && (
                <InputMaxAction onClick={handleClickMaxAmount('rociAmount')} />
              )}
            </div>
          </div>
        }
      />
      <InputControl
        className={s.input}
        name="goraAmount"
        placeholder="You receive"
        concat={['top']}
        onlyNumber
        readOnly
        action={
          <div className={s.action}>
            <div className={s.asset}>
              <Text size={18} isInLine isUppercased>
                $Gora
              </Text>
              <GoraSVG className={s.goraSVG} />
            </div>
            <div className={s.info}>
              <Text size={12} color="secondary80" isInLine>
                Balance:{' '}
                {isLoading ? 'loading...' : Number(goraBalance.toFixed(5))}
              </Text>
            </div>
          </div>
        }
      />

      <FormSubmitter
        isSubmitting={isSubmitting}
        isDisabled={isLoading || isFetching || !rociAmount}
        firstStepText="Convert"
      />
    </Form>
  )
}
