import { Title } from '@/components/title'
import { Card, CardContent } from '@/components/ui/card'
import type { Metadata } from 'next'
import { CardFooterComponent } from './components/card-footer'
import { CardHeaderComponent } from './components/card-header'
import { TableComponent } from './components/table'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Page() {
  return (
    <div>
      <Title>Clientes</Title>

      <Card className='mt-8'>
        <CardHeaderComponent />

        <CardContent>
          <TableComponent />
        </CardContent>

        <CardFooterComponent />
      </Card>
    </div>
  )
}
