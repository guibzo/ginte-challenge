import {
  LucideMail,
  LucideMapPin,
  LucidePhone,
  LucideUser2,
  type LucideIcon,
} from 'lucide-react'

export type RegisterCustomerFormField = {
  icon: LucideIcon
  label: string
  placeholder: string
  colSpan?: number
  fieldName: string
  mask?: string
}

export const registerCustomerFormFields: RegisterCustomerFormField[] = [
  {
    fieldName: 'name',
    label: 'Nome',
    placeholder: 'Nome do cliente',
    icon: LucideUser2,
  },
  {
    fieldName: 'email',
    label: 'E-mail',
    placeholder: 'E-mail do cliente',
    icon: LucideMail,
  },
  {
    fieldName: 'phone',
    label: 'Celular com DDD',
    mask: '(99) 99999-9999',
    placeholder: 'Celular do cliente',
    icon: LucidePhone,
  },
  {
    fieldName: 'address',
    label: 'Endereço',
    placeholder: 'Endereço do cliente',
    icon: LucideMapPin,
    colSpan: 2,
  },
]
