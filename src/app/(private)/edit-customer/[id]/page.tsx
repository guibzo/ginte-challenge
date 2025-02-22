import type { Metadata } from 'next'
import { EditCustomerForm } from './(components)/form'
import { EditCustomerTitle } from './(components)/title'

export const metadata: Metadata = {
  title: 'Editar Cliente',
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <>
      <EditCustomerTitle editingCustomerId={id} />
      <EditCustomerForm editingCustomerId={id} />
    </>
  )
}
