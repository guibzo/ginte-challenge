'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react'

export const CardFooterComponent = () => {
  return (
    <CardFooter className='w-full pt-0 sm:pt-0'>
      <div className='flex w-full items-center justify-between'>
        <span className='text-sm font-semibold text-muted-foreground'>
          1 de 6 linhas selecionadas
        </span>

        <div className='flex items-center gap-2'>
          <Button
            variant='black'
            size='sm'
            className='flex items-center gap-2 text-sm font-semibold'
          >
            <LucideChevronLeft className='size-4 text-white' />
            Anterior
          </Button>

          <Button
            variant='gray'
            size='sm'
            className='flex items-center gap-2 text-sm font-semibold'
          >
            <LucideChevronRight className='size-4 text-white' />
            Próxima
          </Button>
        </div>
      </div>
    </CardFooter>
  )
}
