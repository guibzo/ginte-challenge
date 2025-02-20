'use client'
import { Button } from '@/components/ui/button'
import { CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LucideSearch, LucideTrash2 } from 'lucide-react'

export const CardHeaderComponent = () => {
  return (
    <CardHeader className='pb-0 sm:pb-0'>
      <div className='flex items-center justify-between'>
        <>
          <Input
            aria-describedby='search-email-or-name'
            className='w-[360px]'
            placeholder='Pesquise por nome ou e-mail'
            autoComplete='off'
            endIcon={<LucideSearch className='size-5 text-muted-foreground' />}
          />

          <span id='search-email-or-name' className='sr-only'>
            Pesquise por nome ou e-mail
          </span>
        </>

        <Button
          size='sm'
          variant='destructive'
          className='flex items-center gap-2 font-semibold'
        >
          Excluir selecionados
          <LucideTrash2 className='size-5' />
        </Button>
      </div>
    </CardHeader>
  )
}
