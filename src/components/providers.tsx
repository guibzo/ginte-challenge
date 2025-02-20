'use client'

import { Toaster } from '@/components/ui/sonner'
import { CustomersProvider } from '@/contexts/customers-context'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <NuqsAdapter>
      <CustomersProvider>
        <Toaster />

        {children}
      </CustomersProvider>
    </NuqsAdapter>
  )
}
