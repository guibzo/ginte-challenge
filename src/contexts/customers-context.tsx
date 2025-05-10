'use client'

import { createContext, type ReactNode,useContext, useState } from 'react'

import type { Customer } from '@/@types/customer'
import { useCheckedItems } from '@/hooks/use-checked-items'
import { getCustomersCountQuery } from '@/queries/tanstack/customers/get-customers-count'

export type CustomersContextType = {
  checkedItems: Customer[]
  toggleItem: (customer: Customer) => void
  customersCount: number
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  clearCheckedItems: () => void
}

const defaultCustomersContext: CustomersContextType = {
  checkedItems: [],
  toggleItem: () => {},
  customersCount: 0,
  searchQuery: '',
  setSearchQuery: () => {},
  clearCheckedItems: () => {},
}

export const CustomersContext = createContext<CustomersContextType>(
  defaultCustomersContext,
)

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const { checkedItems, toggleItem, clearCheckedItems } =
    useCheckedItems<Customer>()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: _customersCount } = getCustomersCountQuery()
  const customersCount = _customersCount ?? 0

  return (
    <CustomersContext.Provider
      value={{
        checkedItems,
        toggleItem,
        customersCount,
        searchQuery,
        clearCheckedItems,
        setSearchQuery,
      }}
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
