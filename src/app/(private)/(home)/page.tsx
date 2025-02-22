import { Title } from '@/components/title'
import { Card } from '@/components/ui/card'
import type { Metadata } from 'next'
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
        <CardHeaderComponent />

        <CustomersTable />
        <ResponsiveCustomersTableCard />

        <CardFooterComponent />
      </Card>
    </div>
  )
}
