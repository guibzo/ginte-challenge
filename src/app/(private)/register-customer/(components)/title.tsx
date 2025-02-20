'use client'

import type { Customer } from '@/app/@types/customer'
import { Title } from '@/components/title'
import { LucideCircleChevronLeft } from 'lucide-react'

export const EditCustomerTitle = ({ name }: Customer) => {
  return (
    <div className='flex items-center gap-4'>
      <LucideCircleChevronLeft className='-mb-1.5 size-8 text-app-green-200' />
      <Title>Editando: {name}</Title>
    </div>
  )
}
