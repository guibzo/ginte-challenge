import { z } from 'zod'

export const registerCustomerSchema = z.object({
  name: z
    .string({ message: 'Nome inválido' })
    .min(1, { message: 'Nome inválido' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  phone: z.string().min(9, { message: 'Celular inválido' }),
  birthdate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === 'invalid_date'
          ? 'Data de nascimento inválida'
          : defaultError,
    }),
  }),
  address: z
    .string({ message: 'Endereço inválido' })
    .min(1, { message: 'Endereço inválido' }),
})

export type RegisterCustomerSchema = z.infer<typeof registerCustomerSchema>
