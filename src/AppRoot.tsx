import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

import { Swap } from 'modules/swap'
import { ModalProvider } from 'modules/modal/providers/ModalProvider'
import { config } from 'modules/blockchain/config'
import { AppLayout } from 'shared/ui/layout/AppLayout'

import 'styles/fonts.scss'
import 'styles/global.scss'
import 'styles/variables.scss'

dayjs.extend(utc)
dayjs.extend(tz)

const queryClient = new QueryClient()

export const AppRoot = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AppLayout>
            <Swap />
          </AppLayout>
        </ModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
