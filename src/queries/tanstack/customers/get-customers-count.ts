import { useQuery } from '@tanstack/react-query'

export const getCustomersCountQuery = () => {
  const fetchData = async (): Promise<number> => {
    const response = await fetch(`/api/customers/get-customers-count`, {
      next: { tags: ['get-customers-count'] },
    })
    const json = await response.json()

    return json
  }

  const { data, isLoading } = useQuery({
    queryKey: ['get-customers-count'],
    queryFn: fetchData,
  })

  return {
    data,
    isLoading,
  }
}
