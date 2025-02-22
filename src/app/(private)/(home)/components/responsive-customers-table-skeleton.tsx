import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Fragment } from 'react'

export const ResponsiveCustomersTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <Fragment key={i}>
          <Card className='rounded-none border-0'>
            <CardContent className='flex items-center justify-between gap-2.5'>
              <div className='flex items-center gap-3'>
                <Skeleton className='size-6 rounded-sm' />

                <div className='flex flex-col gap-1 text-sm text-white'>
                  <Skeleton className='h-[20px] w-[125px]' />
                  <Skeleton className='h-[20px] w-[160px]' />
                  <Skeleton className='h-[20px] w-[120px]' />
                  <Skeleton className='h-[20px] w-[220px]' />
                </div>
              </div>

              <div className='flex justify-end'>
                <Skeleton className='size-[40px]' />
              </div>
            </CardContent>
          </Card>

          <Separator className='bg-border' />
        </Fragment>
      ))}
    </>
  )
}
