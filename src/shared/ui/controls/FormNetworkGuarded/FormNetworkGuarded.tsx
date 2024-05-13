import { FieldValues } from 'react-hook-form'

import { ErrorGuardWrap } from 'shared/ui/common/ErrorGuardWrap'
import { LoaderLayout } from 'shared/ui/layout/LoaderLayout'
import { Form as FormSource, Props as PropsSource } from '../Form'

type Props<TFieldValues extends FieldValues> = PropsSource<TFieldValues> & {
  formError?: string | null | undefined
  isLoading?: boolean
}

export const Form = <TFieldValues extends FieldValues>(
  formProps: Props<TFieldValues>,
) => {
  return (
    <ErrorGuardWrap errorMessage={formProps.formError}>
      {formProps.isLoading && <LoaderLayout />}
      <FormSource {...formProps} />
    </ErrorGuardWrap>
  )
}
