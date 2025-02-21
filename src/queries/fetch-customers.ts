'use server'

import { prisma } from '@/lib/prisma'
import type { Customer } from '@prisma/client'

export type Response = {
  customers: Customer[]
}

export async function doFetchCustomers(): Promise<Response> {
  const customers = await prisma.customer.findMany()

  return { customers }
}
