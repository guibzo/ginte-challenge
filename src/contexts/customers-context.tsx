import type { Customer } from '@/app/@types/customer'
import { useCheckedItems } from '@/hooks/use-checked-items'
import { createContext, useContext, type ReactNode } from 'react'

export type CustomersContextType = {
  checkedItems: Customer[]
  toggleItem: (customer: Customer) => void
}

const defaultCustomersContext: CustomersContextType = {
  checkedItems: [],
  toggleItem: () => {},
}

export const CustomersContext = createContext<CustomersContextType>(
  defaultCustomersContext,
)

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const { checkedItems, toggleItem } = useCheckedItems<Customer>()

  return (
    <CustomersContext.Provider value={{ checkedItems, toggleItem }}>
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
