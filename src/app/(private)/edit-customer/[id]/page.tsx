'use client'

import { Title } from '@/components/title'
import { useCustomersCtx } from '@/contexts/customers-context'
import { LucideCircleChevronLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { EditCustomerForm } from './(components)/form'

export default function Page() {
  const { findCustomerById } = useCustomersCtx()
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const customer = findCustomerById(id)

  useEffect(() => {
    if (!customer) {
      router.replace('/')
    }
  }, [customer, router])

  if (!customer) return null

  return (
    <>
      <title>Editar Cliente</title>

      <div className='flex items-center gap-4'>
        <LucideCircleChevronLeft className='-mb-1.5 size-8 text-app-green-200' />
        <Title>Editando: {customer.name}</Title>
      </div>

      <EditCustomerForm {...customer} />
    </>
  )
}
