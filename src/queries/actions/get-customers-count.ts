'use server'

import { prisma } from '@/lib/prisma'

export type Response = number

export async function doGetCustomersCount(): Promise<Response> {
  const count = await prisma.customer.count()

  return count
}
