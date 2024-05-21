export type TxStatus = 'empty' | 'signing' | 'pending' | 'failed' | 'success'

export type TxStatusObj = {
  status: TxStatus
  isEmpty: boolean
  isFailed: boolean
  isPending: boolean
  isSuccess: boolean
}
