'use client'

import { EmptyTable } from '@/components/empty-table'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCustomersCtx } from '@/contexts/customers-context'
import { usePagination } from '@/hooks/use-pagination'
import { fetchCustomersQuery } from '@/queries/tanstack/customers/fetch-customers'
import { LucidePencil } from 'lucide-react'
import Link from 'next/link'
import { CustomersTableSkeleton } from './customers-table-skeleton'

export const CustomersTable = () => {
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
    <CardContent className='hidden lg:block'>
      <div className='rounded-md border border-border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]' />
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Nascimento</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead className='text-right'>Ações</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className='relative'>
            {hasCustomersData &&
              customers.length > 0 &&
              customers?.map((customer) => {
                const formattedPhone = customer.phone.replace(
                  /(\d{2})(\d{5})(\d{4})/,
                  '($1) $2-$3',
                )

                return (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className='flex items-center'>
                        <Checkbox
                          checked={checkedItems.some(
                            (c) => c.id === customer.id,
                          )}
                          onCheckedChange={() => toggleItem(customer)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{formattedPhone}</TableCell>
                    <TableCell>{customer.birthdate}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                    <TableCell>
                      <div className='flex justify-end'>
                        <Link href={`/edit-customer/${customer.id}`}>
                          <Button
                            variant='outline'
                            size='icon'
                            className='flex items-center justify-center border-amber-500 bg-amber-500'
                          >
                            <LucidePencil className='size-5 text-white' />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

            {isLoading && <CustomersTableSkeleton />}
          </TableBody>
        </Table>

        {hasCustomersData && customers.length === 0 && (
          <div className='relative h-[570px] w-full'>
            <EmptyTable />
          </div>
        )}
      </div>
    </CardContent>
  )
}
