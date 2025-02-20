'use client'

import { useCustomersCtx } from '@/contexts/customers-context'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { EditCustomerForm } from './(components)/form'
import { EditCustomerTitle } from './(components)/title'

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

      <EditCustomerTitle {...customer} />
      <EditCustomerForm {...customer} />
    </>
  )
}
