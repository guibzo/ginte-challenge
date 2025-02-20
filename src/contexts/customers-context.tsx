'use client'

import { mockCustomers } from '@/app/(private)/(home)/components/mock-customers'
import type { Customer } from '@/app/@types/customer'
import { useCheckedItems } from '@/hooks/use-checked-items'
import { createContext, useContext, useState, type ReactNode } from 'react'

export type CustomersContextType = {
  checkedItems: Customer[]
  toggleItem: (customer: Customer) => void
  findCustomerById: (id: string) => Customer | undefined
}

const defaultCustomersContext: CustomersContextType = {
  checkedItems: [],
  findCustomerById: () => undefined,
  toggleItem: () => {},
}

export const CustomersContext = createContext<CustomersContextType>(
  defaultCustomersContext,
)

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const { checkedItems, toggleItem } = useCheckedItems<Customer>()

  const findCustomerById = (id: string) => {
    return customers.find((customer) => customer.id === id)
  }

  return (
    <CustomersContext.Provider
      value={{ checkedItems, toggleItem, findCustomerById }}
    >
      {children}
    </CustomersContext.Provider>
  )
}

export function useCustomersCtx() {
  const context = useContext(CustomersContext)

  if (!context) {
    throw new Error('useCustomers must be used within a CustomersProvider')
  }

  return useContext(CustomersContext)
}
