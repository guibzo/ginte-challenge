import { LucideAlertCircle, LucideCheckCircle2 } from 'lucide-react'

type CustomToastProps = {
  type?: 'error' | 'success'
  title?: string
  description?: string
  error?: any
}

export const CustomToast = ({
  type = 'success',
  description,
  title,
  error,
}: CustomToastProps) => {
  return (
    <>
      {type === 'success' && (
        <div className='flex items-center gap-2'>
          <LucideCheckCircle2 className='size-6 items-center stroke-emerald-500' />

          <div>
            <h2 className='font-bold'>
              {title ? title : 'Alterado com sucesso'}
            </h2>

            <p className='text-xs text-muted-foreground'>
              {description
                ? description
                : 'Seus dados foram modificados com sucesso'}
            </p>
          </div>
        </div>
      )}

      {type === 'error' && (
        <div className='flex items-center gap-2'>
          <LucideAlertCircle className='size-6 items-center stroke-red-500' />

          <div>
            <h2 className='font-bold'>
              {title ?? 'Ocorreu um erro ao tentar realizar essa ação.'}
            </h2>

            <p className='text-xs text-muted-foreground'>
              {error?.message ?? error ?? 'Tente novamente mais tarde'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
