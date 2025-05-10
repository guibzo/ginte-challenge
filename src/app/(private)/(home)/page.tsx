import type { Metadata } from 'next'
import { Suspense } from 'react'

import { Title } from '@/components/title'
import { Card } from '@/components/ui/card'

import { CardFooterComponent } from './components/card-footer'
import { CardHeaderComponent } from './components/card-header/card-header'
import { CustomersTable } from './components/customers-table'
import { ResponsiveCustomersTableCard } from './components/responsive-table-card'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Page() {
  return (
    <div>
      <Title>Clientes</Title>

      <Card className='mt-8'>
        <Suspense>
          <CardHeaderComponent />

          <CustomersTable />
          <ResponsiveCustomersTableCard />

          <CardFooterComponent />
        </Suspense>
      </Card>
    </div>
  )
}
