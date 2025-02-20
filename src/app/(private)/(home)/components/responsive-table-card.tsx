'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useCustomersCtx } from '@/contexts/customers-context'
import { LucidePencil } from 'lucide-react'
import { Fragment } from 'react'
import { mockCustomers } from './mock-customers'

export const ResponsiveTableCard = () => {
  const { checkedItems, toggleItem } = useCustomersCtx()

  return (
    <ul className='lg:hidden'>
      <Separator className='bg-border' />

      {mockCustomers.map((customer) => {
        return (
          <Fragment key={customer.id}>
            <Card className='rounded-none border-0'>
              <CardContent className='flex items-center justify-between gap-2.5'>
                <div className='flex items-center gap-3'>
                  <Checkbox
                    onCheckedChange={() => toggleItem(customer)}
                    className='size-6'
                    checked={checkedItems.some((c) => c.id === customer.id)}
                  />

                  <div className='flex flex-col gap-1 text-sm text-white'>
                    <span>{customer.name}</span>
                    <span>{customer.email}</span>
                    <span>{customer.phone}</span>
                    <span>{customer.address}</span>
                  </div>
                </div>

                <Button
                  variant='outline'
                  size='icon'
                  className='flex items-center justify-center border-amber-500 bg-amber-500'
                >
                  <LucidePencil className='size-5 text-white' />
                </Button>
              </CardContent>
            </Card>

            <Separator className='bg-border' />
          </Fragment>
        )
      })}
    </ul>
  )
}
