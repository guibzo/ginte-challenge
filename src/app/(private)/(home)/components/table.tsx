'use client'

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
import { LucidePencil } from 'lucide-react'
import { mockCustomers } from './mock-customers'

export const TableComponent = () => {
  const { checkedItems, toggleItem } = useCustomersCtx()

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

          <TableBody>
            {mockCustomers.map((customer) => {
              return (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className='flex items-center'>
                      <Checkbox
                        checked={checkedItems.some((c) => c.id === customer.id)}
                        onCheckedChange={() => toggleItem(customer)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.birthdate}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <div className='flex justify-end'>
                      <Button
                        variant='outline'
                        size='icon'
                        className='flex items-center justify-center border-amber-500 bg-amber-500'
                      >
                        <LucidePencil className='size-5 text-white' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </CardContent>
  )
}
