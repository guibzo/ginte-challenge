import { LucidePlus, LucideUsers2, type LucideIcon } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'

export type NavigationItem = {
  name: string
  href: string
  id: string
  icon: LucideIcon
}

export const navigationItems: NavigationItem[] = [
  { name: 'Clientes', href: '/', id: uuidv4(), icon: LucideUsers2 },
  {
    name: 'Cadastrar Cliente',
    href: '/register-customer',
    id: uuidv4(),
    icon: LucidePlus,
  },
]
