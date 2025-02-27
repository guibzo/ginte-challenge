'use client'

import { doDeleteCustomers } from '@/actions/customers/do-delete-customers'
import { Button } from '@/components/ui/button'
import { CustomToast } from '@/components/ui/custom-toast'
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
import { queryClient } from '@/lib/query-client'
import { formatMediaQueryIntoPX } from '@/utills/format-media-query-into-px'
import { LucideChevronLeft, LucideTrash2 } from 'lucide-react'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

export const CardHeaderDeleteCustomers = () => {
  const { checkedItems: customers, clearCheckedItems } = useCustomersCtx()
  const isMobile = useMediaQuery(formatMediaQueryIntoPX(1024))

  const customersIds = [...customers.map((customer) => customer.id)]
  const doDeleteCustomersWithBindedIds = doDeleteCustomers.bind(null, {
    ids: customersIds,
  })

  const [state, formAction, isSubmitting] = useActionState(
    doDeleteCustomersWithBindedIds,
    {
      message: '',
      code: 0,
    },
  )

  const hasCheckedItems = Boolean(customers.length > 0)
  const customersNames = customers.map((customer) => customer.name).join(', ')

  useEffect(() => {
    if (!state.code) return

    if (state.code === 204) {
      queryClient.invalidateQueries({ queryKey: ['fetch-customers'] })
      queryClient.invalidateQueries({ queryKey: ['get-customers-count'] })

      clearCheckedItems()
    }

    setTimeout(() => {
      const toastProps = {
        title: state.message,
        type: state.code === 204 ? 'success' : ('error' as any),
        error: state.message,
      }

      toast(<CustomToast {...toastProps} />)
    }, 0)
  }, [state])

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
        <form action={formAction} className='space-y-4'>
          <DialogHeader>
            <DialogTitle asChild>
              <h2 className='inline-flex gap-1 text-base'>
                <strong className='font-semibold text-destructive'>
                  CUIDADO:
                </strong>
                <span className='font-medium text-zinc-950'>
                  {' '}
                  Você está prestes a excluir um cliente!
                </span>
              </h2>
            </DialogTitle>
          </DialogHeader>

          <Separator />

          <p className='text-sm'>
            Tem certeza de que deseja excluir permanentemente o(a) cliente(s){' '}
            <strong className='font-semibold text-destructive'>
              {customersNames}
            </strong>
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

            <DialogClose asChild>
              <Button
                type='submit'
                variant='destructive'
                className='flex w-fit items-center gap-1.5 px-2.5 text-sm font-semibold'
                disabled={isSubmitting}
              >
                <LucideTrash2 className='size-4 text-white' />
                Excluir
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
