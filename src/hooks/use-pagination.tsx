import { parseAsInteger, useQueryState } from 'nuqs'
import { useEffect } from 'react'

export const usePagination = ({
  itemsPerPage,
  totalItems,
}: {
  totalItems: number
  itemsPerPage: number
}) => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1),
  )

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleChangePage = (type: 'previous' | 'next') => {
    if (type === 'previous') {
      if (currentPage === 1) return

      setCurrentPage((prev) => prev - 1)
    }

    if (type === 'next') {
      if (currentPage === totalPages) return

      setCurrentPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    const isPageInvalid = currentPage < 1 || currentPage > totalPages

    if (!currentPage || isPageInvalid) {
      setCurrentPage(1)
    }
  }, [currentPage, setCurrentPage])

  return {
    currentPage,
    totalPages,
    handleChangePage,
  }
}
