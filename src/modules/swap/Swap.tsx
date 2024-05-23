import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { ConnectWalletScreen } from 'modules/wallet/ui/ConnectWalletScreen'
import { Text } from 'shared/ui/common/Text'
import { FormSubmitter } from 'shared/ui/controls/FormSubmitter'
import { Form } from 'shared/ui/controls/FormNetworkGuarded'
import { InputControl } from 'shared/ui/controls/Input'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import { PageLoader } from 'shared/ui/layout/PageLoader'
import { Button } from 'shared/ui/controls/Button'
import * as formErrors from 'shared/constants/formErrors'
import { useSwapProof } from './hooks/useSwapProof'
import { useSwapFormData } from './hooks/useSwapFormData'
import { useSwapSubmit } from './hooks/useSwapSubmit'
import { SentTransaction } from './ui/SentTransaction'

import RociSVG from 'assets/asset-roci.svg?react'
import GoraSVG from 'assets/asset-gora.svg?react'
import WarningSVG from 'assets/warning-mark.svg?react'

import s from './Swap.module.scss'

type FormValues = {
  rociAmount: string
  goraAmount: string
}

export type SuccessSwapData = FormValues & {
  catId: number
  proof: string[]
}

export const Swap = () => {
  const { isWalletConnected } = useWeb3()
  const { catId, proof, isLoading } = useSwapProof()
  const { submit, isLoading: isSubmitLoading } = useSwapSubmit()
  const [txHash, setTxHash] = useState<string | undefined>(undefined)

  const formMethods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: { rociAmount: '', goraAmount: '' },
  })
  const { watch, setValue, formState } = formMethods
  const { rociAmount } = watch()
  const { isSubmitting } = formState

  const { rociBalance, goraBalance, goraPrice, goraAmount } = useSwapFormData({
    catId: Number(catId),
    rociAmount,
  })

  useEffect(() => {
    if (goraAmount) {
      return setValue('goraAmount', `${goraAmount}`)
    }
    setValue('goraAmount', '')
  }, [goraAmount])

  const handleSubmit = async (values: FormValues) => {
    if (submit && catId && proof) {
      const convertTxReceipt = await submit(
        values.rociAmount,
        Number(catId),
        proof,
      )
      setTxHash(convertTxReceipt.hash)
    }
  }

  if (!isWalletConnected) {
    return <ConnectWalletScreen />
  }

  if (isLoading) {
    return <PageLoader isFullHeight />
  }

  if (txHash) {
    return (
      <div className={s.tx}>
        <SentTransaction
          txHash={txHash}
          payAmount={rociAmount}
          receiveAmount={goraAmount ? `${goraAmount}` : undefined}
        />
        <Button
          className={s.continueBtn}
          fashion="accent"
          onClick={() => {
            setValue('rociAmount', '')
            setTxHash(undefined)
          }}
        >
          Continue
        </Button>
      </div>
    )
  }

  return (
    <Form className={s.form} formMethods={formMethods} onSubmit={handleSubmit}>
      <Text>1 $ROCI = {goraPrice ?? 0} $GORA</Text>
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
                Balance: {Number(rociBalance.toFixed(5))}
              </Text>
              {rociBalance > 0 && (
                <InputMaxAction
                  onClick={() =>
                    setValue('rociAmount', `${rociBalance}`, {
                      shouldValidate: true,
                    })
                  }
                />
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
              <GoraSVG />
            </div>
            <div className={s.info}>
              <Text size={12} color="secondary80" isInLine>
                Balance: {Number(goraBalance.toFixed(5))}
              </Text>
            </div>
          </div>
        }
      />
      {(!catId || !proof) && (
        <div className={s.notWhitelisted}>
          <WarningSVG />
          <Text color="warning">
            You're not whilelisted for conversion, please contact us{' '}
            <a href="https://t.me/rocifi" target="_blank">
              t.me/rocifi
            </a>
          </Text>
        </div>
      )}

      <FormSubmitter
        isSubmitting={isSubmitting}
        isDisabled={
          !rociAmount || !goraAmount || !catId || !proof || isSubmitLoading
        }
        firstStepText="Convert"
      />
    </Form>
  )
}
