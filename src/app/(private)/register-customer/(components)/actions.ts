'use server'

import { prisma } from '@/lib/prisma'
import { formatToDDMMYYYY } from '@/utills/format-to-dd-mm-yyyy'
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
  console.log('formData', formData)
  const parsed = registerCustomerSchema.safeParse(formData)
  console.log('parsed', parsed)

  if (!parsed.success) {
    return {
      message: 'Dados inválidos.',
      code: 400,
    }
  }

  const parsedData = parsed.data

  const { name, email, phone, birthdate, address } = parsedData
  const formattedBirthdate = formatToDDMMYYYY(String(birthdate))

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

  await prisma.customer.create({
    data: {
      name,
      email,
      phone,
      birthdate: formattedBirthdate,
      address,
    },
  })

  return {
    message: 'Cliente cadastrado com sucesso!',
    code: 201,
  }
}
