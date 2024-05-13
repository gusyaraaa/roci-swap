import { useForm } from 'react-hook-form'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { ConnectWalletScreen } from 'modules/wallet/ui/ConnectWalletScreen'
import { Text } from 'shared/ui/common/Text'
import { FormSubmitter } from 'shared/ui/controls/FormSubmitter'
import { Form } from 'shared/ui/controls/FormNetworkGuarded'
import { InputControl } from 'shared/ui/controls/Input'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import * as formErrors from 'shared/constants/formErrors'

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
  const { rociAmount, goraAmount } = watch()
  const { isSubmitting } = formState

  const handleClickMaxAmount = (name: 'rociAmount' | 'goraAmount') => {
    setValue(
      name,
      // `${
      //   walletBalance <= stakingPool.amountRemained
      //     ? walletBalance
      //     : stakingPool.amountRemained
      // }`,
      '1000',
      // { shouldValidate: true },
    )
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
            // formErrors.weiParsing(val, stakingPool.assetDecimals) ||
            // formErrors.floorValue(val, stakingPool.assetDecimals) ||
            // formErrors.minValue(val, 100, stakingPool.assetDecimals) ||
            // formErrors.maxValue(
            //   val,
            //   stakingPool.amountRemained || stakingPool.maxCapacity,
            //   stakingPool.assetDecimals,
            // ) ||
            // formErrors.balance(
            //   val,
            //   walletBalance,
            //   stakingPool.asset.label,
            //   stakingPool.assetDecimals,
            // ) ||
            true,
        }}
        action={
          <InputMaxAction onClick={() => handleClickMaxAmount('rociAmount')} />
        }
      />
      <InputControl
        className={s.input}
        name="goraAmount"
        placeholder="You receive"
        concat={['top']}
        onlyNumber
        rules={{
          required: formErrors.required,
          validate: (val: string) =>
            // formErrors.weiParsing(val, stakingPool.assetDecimals) ||
            // formErrors.floorValue(val, stakingPool.assetDecimals) ||
            // formErrors.minValue(val, 100, stakingPool.assetDecimals) ||
            // formErrors.maxValue(
            //   val,
            //   stakingPool.amountRemained || stakingPool.maxCapacity,
            //   stakingPool.assetDecimals,
            // ) ||
            // formErrors.balance(
            //   val,
            //   walletBalance,
            //   stakingPool.asset.label,
            //   stakingPool.assetDecimals,
            // ) ||
            true,
        }}
        action={
          <InputMaxAction onClick={() => handleClickMaxAmount('goraAmount')} />
        }
      />

      <FormSubmitter
        isSubmitting={isSubmitting}
        isDisabled={!rociAmount || !goraAmount}
        firstStepText="Convert"
      />
    </Form>
  )
}
