'use client'

import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCustomersCtx } from '@/contexts/customers-context'
import { useMediaQuery } from '@/hooks/use-media-query'
import { formatMediaQueryIntoPX } from '@/utills/format-media-query-into-px'
import { LucideChevronLeft, LucideSearch, LucideTrash2 } from 'lucide-react'

export const CardHeaderComponent = () => {
  const { checkedItems: customers } = useCustomersCtx()
  const isMobile = useMediaQuery(formatMediaQueryIntoPX(1024))

  const hasCheckedItems = Boolean(customers.length > 0)
  const customersNames = customers.map((customer) => customer.name).join(', ')

  return (
    <CardHeader className='mb-6 pb-0 lg:mb-0 lg:pb-0'>
      <div className='flex flex-col justify-between space-y-2.5 lg:flex-row lg:items-center'>
        <>
          <Input
            aria-describedby='search-email-or-name'
            className='w-full lg:w-[360px]'
            placeholder='Pesquise por nome ou e-mail'
            autoComplete='off'
            endIcon={<LucideSearch className='size-5 text-muted-foreground' />}
          />

          <span id='search-email-or-name' className='sr-only'>
            Pesquise por nome ou e-mail
          </span>
        </>

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
                  <span className='font-semibold text-destructive'>
                    CUIDADO:
                  </span>
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
              cliente, incluindo histórico de empréstimos e faturas, serão
              removidos permanentemente.
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
      </div>
    </CardHeader>
  )
}
