'use server'

import { prisma } from '@/lib/prisma'
import { formatToDDMMYYYY } from '@/utills/format-to-dd-mm-yyyy'
import { editCustomerSchema } from './schemas'

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
  const formattedBirthdate = formatToDDMMYYYY(String(birthdate))

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

  if (existingCustomerEmail) {
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
      birthdate: formattedBirthdate,
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
