import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useCustomersCtx } from '@/contexts/customers-context'

import { useParamsRouter } from './use-params-router'

export const usePagination = ({ itemsPerPage }: { itemsPerPage: number }) => {
  const router = useParamsRouter()
  const { customersCount: totalItems } = useCustomersCtx()
  const currentPage = Number(useSearchParams().get('page')) ?? 1

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage * itemsPerPage >= totalItems

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleChangePage = (type: 'previous' | 'next') => {
    if (type === 'previous') {
      if (currentPage === 1) return

      router.remove(['page'])
      router
        .add({ page: String(currentPage - 1) })
        .update()
        .refresh()
    }

    if (type === 'next') {
      if (currentPage === totalPages) return

      router.remove(['page'])
      router
        .add({ page: String(currentPage + 1) })
        .update()
        .refresh()
    }
  }

  useEffect(() => {
    const isPageInvalid = currentPage < 1 || currentPage > totalPages

    if (!currentPage || isPageInvalid) {
      router.remove(['page'])
      router
        .add({ page: String(1) })
        .update()
        .refresh()
    }
  }, [currentPage])

  return {
    currentPage,
    totalPages,
    handleChangePage,
    isLastPage,
    isFirstPage,
  }
}
