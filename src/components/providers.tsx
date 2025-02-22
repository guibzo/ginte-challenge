'use client'

import { Toaster } from '@/components/ui/sonner'
import { CustomersProvider } from '@/contexts/customers-context'
import { queryClient } from '@/lib/query-client'
import { QueryClientProvider } from '@tanstack/react-query'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CustomersProvider>
        <Toaster />

        {children}
      </CustomersProvider>
    </QueryClientProvider>
  )
}
