import { Title } from '@/components/title'
import { Card } from '@/components/ui/card'
import { doFetchCustomers } from '@/queries/fetch-customers'
import type { Metadata } from 'next'
import { CardFooterComponent } from './components/card-footer'
import { CardHeaderComponent } from './components/card-header'
import { CustomersTable } from './components/customers-table'
import { ResponsiveCustomersTableCard } from './components/responsive-table-card'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Page() {
  const { customers } = await doFetchCustomers()

  return (
    <div>
      <Title>Clientes</Title>

      <Card className='mt-8'>
        <CardHeaderComponent />

        <CustomersTable customers={customers} />

        <ResponsiveCustomersTableCard customers={customers} />

        <CardFooterComponent />
      </Card>
    </div>
  )
}
