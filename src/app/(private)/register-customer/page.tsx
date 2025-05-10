import { LucidePlus } from 'lucide-react'
import type { Metadata } from 'next'

import { Title } from '@/components/title'

import { RegisterCustomerForm } from './(components)/form'

export const metadata: Metadata = {
  title: 'Cadastrar Cliente',
}

export default function Page() {
  return (
    <>
      <div className='flex items-center gap-4'>
        <LucidePlus className='-mb-1.5 size-8 text-app-green-200' />

        <Title>Cadastrar Cliente</Title>
      </div>

      <RegisterCustomerForm />
    </>
  )
}
