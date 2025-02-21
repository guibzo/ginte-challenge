import { Title } from '@/components/title'
import { doGetCustomerById } from '@/queries/get-customer-by-id'
import { LucideCircleChevronLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import { EditCustomerForm } from './(components)/form'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const customer = await doGetCustomerById(id)

  if (!customer) {
    redirect('/')
  }

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
