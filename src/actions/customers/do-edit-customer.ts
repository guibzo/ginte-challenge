'use server'

import { editCustomerSchema } from '@/app/(private)/edit-customer/[id]/(components)/schemas'
import { prisma } from '@/lib/prisma'

export type FormState = {
  message: string
  code: number
}

export async function doEditCustomer(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = editCustomerSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      message: 'Dados inválidos.',
      code: 400,
    }
  }

  const parsedData = parsed.data

  const { name, email, phone, birthdate, address } = parsedData

  const editingCustomerId = formData.id as string

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      id: editingCustomerId,
    },
  })

  if (!existingCustomer) {
    return {
      message: 'Usuário não encontrado.',
      code: 404,
    }
  }

  const existingCustomerEmail = await prisma.customer.findUnique({
    where: {
      email,
    },
  })

  if (existingCustomerEmail && existingCustomerEmail.id !== editingCustomerId) {
    return {
      message: 'E-mail já cadastrado.',
      code: 409,
    }
  }

  await prisma.customer.update({
    data: {
      name,
      email,
      phone,
      birthdate,
      address,
    },
    where: {
      id: editingCustomerId,
    },
  })

  return {
    message: 'Cliente editado com sucesso!',
    code: 204,
  }
}
