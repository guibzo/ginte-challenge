import { useQuery } from '@tanstack/react-query'
import { doGetCustomersCount } from '../actions/get-customers-count'

export const getCustomersCountQuery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['customers-count'],
    queryFn: doGetCustomersCount,
  })

  return {
    data,
    isLoading,
  }
}
