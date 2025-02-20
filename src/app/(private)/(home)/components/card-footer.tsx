'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'

export const CardFooterComponent = () => {
  return (
    <CardFooter className='mt-6 w-full pt-4 sm:pt-0 lg:mt-0'>
      <div className='flex w-full flex-col justify-between space-y-2.5 lg:flex-row lg:items-center'>
        <span className='text-sm font-semibold text-muted-foreground'>
          1 de 6 linhas selecionadas
        </span>

        <div className='flex items-center gap-2'>
          <Button
            variant='black'
            size='sm'
            className='flex flex-1 items-center gap-2 text-sm font-semibold lg:flex-grow-0'
          >
            <LucideChevronLeft className='size-4 text-white' />
            Anterior
          </Button>

          <Button
            variant='gray'
            size='sm'
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
