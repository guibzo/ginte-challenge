import type { ReactNode } from 'react'

export const FormError = ({ children }: { children: ReactNode }) => {
  return <p className='text-sm text-destructive'>{children}</p>
}
