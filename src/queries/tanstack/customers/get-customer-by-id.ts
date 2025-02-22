import type { Customer } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const getCustomerByIdQuery = (id: string) => {
  const fetchData = async (): Promise<Customer | null> => {
    const response = await fetch(`/api/customers/${id}`)
    const json = await response.json()

    return json
  }

  const { data, isLoading } = useQuery({
    queryKey: ['get-customer', id],
    queryFn: fetchData,
  })

  return {
    data,
    isLoading,
  }
}
