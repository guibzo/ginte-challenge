'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useCustomersCtx } from '@/contexts/customers-context'
import { usePagination } from '@/hooks/use-pagination'
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'

export const CardFooterComponent = () => {
  const { checkedItems } = useCustomersCtx()

  const { handleChangePage } = usePagination({
    itemsPerPage: 6,
    totalItems: 60,
  })

  const checkedLinesQtt = checkedItems.length

  return (
    <CardFooter className='mt-6 w-full pt-4 lg:mt-0 lg:pt-0'>
      <div className='flex w-full flex-col justify-between space-y-2.5 lg:flex-row lg:items-center'>
        <span className='text-sm font-semibold text-muted-foreground'>
          {checkedLinesQtt ?? 0} de 10 linhas selecionadas
        </span>

        <div className='flex items-center gap-2'>
          <Button
            onClick={() => handleChangePage('previous')}
            variant='black'
            className='flex flex-1 items-center gap-2 text-sm font-semibold lg:flex-grow-0'
          >
            <LucideChevronLeft className='size-4 text-white' />
            Anterior
          </Button>

          <Button
            onClick={() => handleChangePage('next')}
            variant='gray'
            className='flex flex-1 items-center gap-2 text-sm font-semibold lg:flex-grow-0'
          >
            <LucideChevronRight className='size-4 text-white' />
            Próxima
          </Button>
        </div>
      </div>
    </CardFooter>
  )
}
