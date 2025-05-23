import type { Customer } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

import type { PaginationParams } from '@/@types/pagination-params'

export const fetchCustomersQuery = ({
  itemsPerPage,
  page,
  search,
}: PaginationParams) => {
  const fetchData = async (): Promise<Customer[]> => {
    const response = await fetch(
      `/api/customers?page=${page}&itemsPerPage=${itemsPerPage}&search=${search}`,
    )
    const json = await response.json()

    return json
  }

  const { data, isLoading } = useQuery<Customer[]>({
    queryKey: ['fetch-customers', { page, itemsPerPage, search }],
    queryFn: fetchData,
  })

  return {
    data,
    isLoading,
  }
}
