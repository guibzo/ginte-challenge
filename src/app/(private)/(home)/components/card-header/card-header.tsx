'use client'

import debounce from 'lodash.debounce'
import { LucideSearch } from 'lucide-react'
import { useCallback, useRef } from 'react'

import { CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useCustomersCtx } from '@/contexts/customers-context'
import { useParamsRouter } from '@/hooks/use-params-router'
import { queryClient } from '@/lib/query-client'

import { CardHeaderDeleteCustomers } from './delete-customers'

export const CardHeaderComponent = () => {
  const { setSearchQuery } = useCustomersCtx()
  const paramsRouter = useParamsRouter()

  const debouncedUpdate = useRef(
    debounce((search: string) => {
      paramsRouter.remove(['search'])
      paramsRouter.add({ search }).update().refresh()
      setSearchQuery(search)

      queryClient.invalidateQueries({ queryKey: ['fetch-customers'] })
    }, 800),
  ).current

  const onUpdateSearch = useCallback((search: string) => {
    debouncedUpdate(search)
  }, [])

  return (
    <CardHeader className='mb-6 pb-0 lg:mb-0 lg:pb-0'>
      <div className='flex flex-col justify-between space-y-2.5 lg:flex-row lg:items-center'>
        <>
          <Input
            aria-describedby='search-email-or-name'
            className='w-full lg:w-[360px]'
            placeholder='Pesquise por nome ou e-mail'
            autoComplete='off'
            endIcon={<LucideSearch className='size-5 text-muted-foreground' />}
            onChange={(e) => onUpdateSearch(e.target.value)}
          />

          <span id='search-email-or-name' className='sr-only'>
            Pesquise por nome ou e-mail
          </span>
        </>

        <CardHeaderDeleteCustomers />
      </div>
    </CardHeader>
  )
}
