'use server'

import { prisma } from '@/lib/prisma'
import { queryClient } from '@/lib/query-client'
import { registerCustomerSchema } from './schemas'

export type FormState = {
  message: string
  code: number
}

export async function doRegisterCustomer(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data)
  const parsed = registerCustomerSchema.safeParse(formData)

  if (!parsed.success) {
    return {
      message: 'Dados inválidos.',
      code: 400,
    }
  }

  const parsedData = parsed.data

  const { name, email, phone, birthdate, address } = parsedData

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      email,
    },
  })

  if (existingCustomer) {
    return {
      message: 'E-mail já cadastrado.',
      code: 409,
    }
  }

  console.log('birth', birthdate)

  const formattedPhone = phone.replace(/\D/g, '')

  await prisma.customer.create({
    data: {
      name,
      email,
      phone: formattedPhone,
      birthdate,
      address,
    },
  })

  queryClient.invalidateQueries({ queryKey: ['get-customers-count'] })
  queryClient.invalidateQueries({ queryKey: ['fetch-customers'] })

  return {
    message: 'Cliente cadastrado com sucesso!',
    code: 201,
  }
}
