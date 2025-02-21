import { formatToDDMMYYYY } from '@/utills/format-to-dd-mm-yyyy'
import { z } from 'zod'

export const editCustomerSchema = z.object({
  name: z
    .string({ message: 'Nome inválido' })
    .min(1, { message: 'Nome inválido' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  phone: z.string().min(9, { message: 'Celular inválido' }),
  birthdate: z.coerce
    .string()
    .min(1, { message: 'Data inválida' })
    .default('')
    .transform((val) => formatToDDMMYYYY(String(val))),
  address: z
    .string({ message: 'Endereço inválido' })
    .min(1, { message: 'Endereço inválido' }),
})

export type EditCustomerSchema = z.infer<typeof editCustomerSchema>
