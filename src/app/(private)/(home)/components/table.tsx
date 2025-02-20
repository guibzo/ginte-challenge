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
import { LucidePencil } from 'lucide-react'

export const TableComponent = () => {
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
