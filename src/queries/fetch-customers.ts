'use server'

import type { PaginationParams } from '@/@types/pagination-params'
import { prisma } from '@/lib/prisma'
import type { Customer } from '@prisma/client'

export type Response = {
  customers: Customer[]
}

export async function doFetchCustomers({
  page,
  itemsPerPage,
}: PaginationParams): Promise<Response> {
  const itemsSkipQuantity = (page - 1) * itemsPerPage

  const customers = await prisma.customer.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: itemsPerPage,
    skip: itemsSkipQuantity,
  })

  return { customers }
}
