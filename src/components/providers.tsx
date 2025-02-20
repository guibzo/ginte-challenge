'use client'

import { CustomersProvider } from '@/contexts/customers-context'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <CustomersProvider>{children}</CustomersProvider>
    </NuqsAdapter>
  )
}
