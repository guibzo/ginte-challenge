'use client'

import { LucideCircleChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Title } from '@/components/title'
import { Button } from '@/components/ui/button'
import { getCustomerByIdQuery } from '@/queries/tanstack/customers/get-customer-by-id'

export const EditCustomerTitle = ({
  editingCustomerId,
}: {
  editingCustomerId: string
}) => {
  const { data: customer, isLoading } = getCustomerByIdQuery(editingCustomerId)
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !customer) {
      router.replace('/')
    }
  }, [customer])

  if (!customer) {
    return null
  }

  return (
    <div className='flex items-center gap-4'>
      <Link href='/' className='flex items-center'>
        <Button variant='ghost' size='fit'>
          <LucideCircleChevronLeft className='-mb-1.5 size-8 text-app-green-200' />
        </Button>
      </Link>
      <Title>Editando: {customer?.name}</Title>
    </div>
  )
}
