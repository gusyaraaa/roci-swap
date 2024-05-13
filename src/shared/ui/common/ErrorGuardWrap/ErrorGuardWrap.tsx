import { useSwitchChain } from 'wagmi'
import cns from 'classnames'

import { useWeb3 } from 'modules/blockchain/hooks/useWeb3'
import { Button } from 'shared/ui/controls/Button'
import { WarningCard } from '../WarningCard'

import s from './ErrorGuardWrap.module.scss'

type Props = {
  children?: React.ReactNode
  errorMessage?: string | null | undefined
}

export const ErrorGuardWrap = ({ children, errorMessage }: Props) => {
  const { isChainUnsupported, walletName, defaultChain } = useWeb3()
  const { switchChain } = useSwitchChain()

  return (
    <>
      {isChainUnsupported ? (
        <WarningCard
          title={
            <>
              Your wallet is connected to the chain that is not supported
              {walletName !== 'MetaMask' &&
                '. Please switch chain on your wallet app, and reconnect it.'}
            </>
          }
          content={
            walletName === 'MetaMask' && (
              <Button
                size={40}
                fashion="secondary"
                onClick={() => switchChain({ chainId: defaultChain })}
                className={s.cta}
              >
                Switch network
              </Button>
            )
          }
        />
      ) : (
        errorMessage && <WarningCard title={errorMessage} />
      )}
      <div
        className={cns({
          [s.isFaded]: isChainUnsupported || errorMessage,
        })}
      >
        {children}
      </div>
    </>
  )
}
