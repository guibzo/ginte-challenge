'use server'

import { prisma } from '@/lib/prisma'
import { queryClient } from '@/lib/query-client'

export type FormState = {
  message: string
  code: number
}

export async function doDeleteCustomers(
  extras: { ids: string[] },
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const { ids: idsToDelete } = extras

  const existingCustomers = await prisma.customer.findMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
    select: {
      id: true,
    },
  })

  if (existingCustomers.length !== idsToDelete.length) {
    return {
      message: 'Houve um erro ao deletar ao menos um dos registros.',
      code: 400,
    }
  }

  await prisma.customer.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  })

  queryClient.invalidateQueries({ queryKey: ['fetch-customers'] })

  return {
    message: 'Clientes excluídos com sucesso!',
    code: 204,
  }
}
