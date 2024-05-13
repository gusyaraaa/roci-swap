import { useCallback } from 'react'
import {
  FormProvider,
  UseFormReturn,
  UseFormHandleSubmit,
  FieldValues,
} from 'react-hook-form'

export type Props<TFieldValues extends FieldValues> = {
  formMethods: UseFormReturn<TFieldValues>
  onSubmit: Parameters<UseFormHandleSubmit<TFieldValues>>[0]
  autoComplete?: string
  className?: string
  children?: React.ReactNode
}

export const Form = <TFieldValues extends FieldValues>({
  formMethods,
  onSubmit,
  autoComplete = 'off',
  className,
  children,
}: Props<TFieldValues>) => {
  const submit = useCallback(
    async (...args: Parameters<typeof onSubmit>) => {
      try {
        await onSubmit(...args)
      } catch (error) {
        console.error(error)
      }
    },
    [onSubmit],
  )

  return (
    <FormProvider {...formMethods}>
      <form
        autoComplete={autoComplete}
        onSubmit={formMethods.handleSubmit(submit)}
        className={className}
        children={children}
      />
    </FormProvider>
  )
}
