'use server'

import { prisma } from '@/lib/prisma'
import type { Customer } from '@prisma/client'

export type Response = {
  customer: Customer
}

export async function doFetchCustomers(id: string): Promise<Response | null> {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  })

  if (!customer) {
    return null
  }

  return { customer }
}
