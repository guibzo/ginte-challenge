'use client'

import type { Customer } from '@/@types/customer'
import { mockCustomers } from '@/app/(private)/(home)/components/mock-customers'
import { useCheckedItems } from '@/hooks/use-checked-items'
import { getCustomersCountQuery } from '@/queries/tanstack/get-customers-count'
import { createContext, useContext, useState, type ReactNode } from 'react'

export type CustomersContextType = {
  checkedItems: Customer[]
  toggleItem: (customer: Customer) => void
  findCustomerById: (id: string) => Customer | undefined
  customersCount: number
}

const defaultCustomersContext: CustomersContextType = {
  checkedItems: [],
  findCustomerById: () => undefined,
  toggleItem: () => {},
  customersCount: 0,
}

export const CustomersContext = createContext<CustomersContextType>(
  defaultCustomersContext,
)

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const { checkedItems, toggleItem } = useCheckedItems<Customer>()

  const { data: _customersCount } = getCustomersCountQuery()
  const customersCount = _customersCount ?? 0

  const findCustomerById = (id: string) => {
    return customers.find((customer) => customer.id === id)
  }

  return (
    <CustomersContext.Provider
      value={{ checkedItems, toggleItem, findCustomerById, customersCount }}
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
