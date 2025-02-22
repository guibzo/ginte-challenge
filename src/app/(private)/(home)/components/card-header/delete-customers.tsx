'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useCustomersCtx } from '@/contexts/customers-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatMediaQueryIntoPX } from '@/utills/format-media-query-into-px'
import { LucideChevronLeft, LucideTrash2 } from 'lucide-react'

export const CardHeaderDeleteCustomers = () => {
  const { checkedItems: customers } = useCustomersCtx()
  const isMobile = useMediaQuery(formatMediaQueryIntoPX(1024))

  const hasCheckedItems = Boolean(customers.length > 0)
  const customersNames = customers.map((customer) => customer.name).join(', ')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='sm'
          variant='destructive'
          disabled={!hasCheckedItems}
          className='flex items-center justify-between gap-2 font-semibold lg:justify-center'
        >
          Excluir selecionados
          <LucideTrash2 className='size-5' />
        </Button>
      </DialogTrigger>

      <DialogContent
        size='small'
        position={isMobile ? 'bottom-center' : 'center'}
      >
        <DialogHeader>
          <DialogTitle asChild>
            <div className='inline-flex gap-1 text-base'>
              <span className='font-semibold text-destructive'>CUIDADO:</span>
              <span className='font-medium text-zinc-950'>
                {' '}
                Você está prestes a excluir um cliente!
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Separator />

        <p className='text-sm'>
          Tem certeza de que deseja excluir permanentemente o(a) cliente(s){' '}
          <span className='font-semibold text-destructive'>
            {customersNames}
          </span>
          ? Esta ação não pode ser desfeita e todos os dados relacionados ao
          cliente, incluindo histórico de empréstimos e faturas, serão removidos
          permanentemente.
        </p>

        <Separator />

        <div className='flex items-center justify-end gap-2'>
          <DialogClose asChild>
            <Button
              variant='gray'
              className='flex w-fit items-center gap-1.5 px-2.5 text-sm font-semibold'
            >
              <LucideChevronLeft className='size-4 text-white' />
              Cancelar
            </Button>
          </DialogClose>

          <Button
            variant='destructive'
            className='flex w-fit items-center gap-1.5 px-2.5 text-sm font-semibold'
          >
            <LucideTrash2 className='size-4 text-white' />
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
