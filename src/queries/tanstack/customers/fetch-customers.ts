import type { PaginationParams } from '@/@types/pagination-params'
import type { Customer } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const fetchCustomersQuery = ({
  itemsPerPage,
  page,
}: PaginationParams) => {
  const fetchData = async (): Promise<Customer[]> => {
    const response = await fetch(
      `/api/customers?page=${page}&itemsPerPage=${itemsPerPage}`,
    )
    const json = await response.json()

    return json
  }

  const { data, isLoading } = useQuery<Customer[]>({
    queryKey: ['fetch-customers', { page, itemsPerPage }],
    queryFn: fetchData,
  })

  return {
    data,
    isLoading,
  }
}
