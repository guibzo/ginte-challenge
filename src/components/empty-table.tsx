import { LucideMailOpen } from 'lucide-react'

export const EmptyTable = () => {
  return (
    <div className='absolute bottom-1/2 left-1/2 top-1/2 flex w-full -translate-x-1/2 items-center justify-center'>
      <div className='flex flex-col items-center gap-2.5'>
        <LucideMailOpen className='size-20 text-muted-foreground' />
        <p className='text-xl font-semibold text-muted-foreground'>
          Nenhum item encontrado.
        </p>
      </div>
    </div>
  )
}
