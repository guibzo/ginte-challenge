import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { LucideLogOut, LucidePlus, LucideUsers2 } from 'lucide-react'

export const Sidebar = () => {
  return (
    <div className='flex w-full max-w-[260px] flex-1 flex-col border-r border-r-border p-6'>
      <div className='mx-auto'>
        <Logo />
      </div>

      <ul className='mt-12 space-y-3'>
        <Button
          variant='ghost'
          className='bg-app-green-100/15 hover:bg-app-green-100/20 flex w-full items-center justify-start gap-2'
        >
          <LucideUsers2 className='text-app-green-200 size-6' />
          <span className='font-semibold text-zinc-900'>Clientes</span>
        </Button>

        <Button
          variant='ghost'
          className='flex w-full items-center justify-start gap-2'
        >
          <LucidePlus className='text-app-green-200 size-6' />
          <span className='font-semibold text-zinc-900'>Cadastrar Cliente</span>
        </Button>
      </ul>

      <div className='mt-auto'>
        <Button
          variant='ghost'
          className='flex w-full items-center justify-start gap-2 text-destructive/90 hover:text-destructive'
        >
          <LucideLogOut className='size-6' />
          <span className='font-semibold'>Sair</span>
        </Button>
      </div>
    </div>
  )
}
