'use client'

import { LucidePencil } from 'lucide-react'
import Link from 'next/link'
import { Fragment } from 'react'

import { EmptyTable } from '@/components/empty-table'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { useCustomersCtx } from '@/contexts/customers-context'
import { usePagination } from '@/hooks/use-pagination'
import { fetchCustomersQuery } from '@/queries/tanstack/customers/fetch-customers'

import { ResponsiveCustomersTableSkeleton } from './responsive-customers-table-skeleton'

export const ResponsiveCustomersTableCard = () => {
  const { checkedItems, toggleItem, searchQuery } = useCustomersCtx()
  const { currentPage } = usePagination({
    itemsPerPage: 10,
  })

  const { data: customers, isLoading } = fetchCustomersQuery({
    page: currentPage,
    itemsPerPage: 10,
    search: searchQuery,
  })

  const hasCustomersData = !isLoading && customers

  return (
    <ul className='lg:hidden'>
      <Separator className='bg-border' />

      {hasCustomersData &&
        customers.length > 0 &&
        customers.map((customer) => {
          const formattedPhone = customer.phone.replace(
            /(\d{2})(\d{5})(\d{4})/,
            '($1) $2-$3',
          )

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
                      <span>{formattedPhone}</span>
                      <span>{customer.address}</span>
                    </div>
                  </div>

                  <Link href={`/edit-customer/${customer.id}`}>
                    <Button
                      variant='outline'
                      size='icon'
                      className='flex items-center justify-center border-amber-500 bg-amber-500'
                    >
                      <LucidePencil className='size-5 text-white' />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Separator className='bg-border' />
            </Fragment>
          )
        })}

      {isLoading && <ResponsiveCustomersTableSkeleton />}

      {hasCustomersData && customers.length === 0 && (
        <div className='h-[496px] w-full'>
          <EmptyTable />
        </div>
      )}
    </ul>
  )
}
