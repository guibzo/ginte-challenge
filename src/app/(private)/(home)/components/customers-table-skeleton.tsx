import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export const CustomersTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <TableRow key={i}>
          <TableCell>
            <Skeleton className='size-4 rounded-sm' />
          </TableCell>

          <TableCell>
            <Skeleton className='h-[20px] w-[125px]' />
          </TableCell>

          <TableCell>
            <Skeleton className='h-[20px] w-[160px]' />
          </TableCell>

          <TableCell>
            <Skeleton className='h-[20px] w-[120px]' />
          </TableCell>

          <TableCell>
            <Skeleton className='h-[20px] w-[100px]' />
          </TableCell>

          <TableCell>
            <Skeleton className='h-[20px] w-[220px]' />
          </TableCell>

          <TableCell>
            <div className='flex justify-end'>
              <Skeleton className='size-[40px]' />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
