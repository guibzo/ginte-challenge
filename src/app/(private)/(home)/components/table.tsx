'use client'

import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LucideEllipsis } from 'lucide-react'

export const TableComponent = () => {
  return (
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
          {Array.from({ length: 6 }).map((_, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <div className='flex items-center'>
                    <Checkbox />
                  </div>
                </TableCell>
                <TableCell>Latoya Bartoletti</TableCell>
                <TableCell>Alison48@hotmail.com</TableCell>
                <TableCell>489-742-5107</TableCell>
                <TableCell>20/06/2000</TableCell>
                <TableCell>Rua XYZ</TableCell>
                <TableCell>
                  <div className='flex justify-end'>
                    <LucideEllipsis className='size-6' />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
