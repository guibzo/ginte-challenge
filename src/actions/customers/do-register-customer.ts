'use server'

import { registerCustomerSchema } from '@/app/(private)/register-customer/(components)/schemas'
import { prisma } from '@/lib/prisma'

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

  return {
    message: 'Cliente cadastrado com sucesso!',
    code: 201,
  }
}
