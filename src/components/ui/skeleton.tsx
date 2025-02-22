import { cn } from '@/lib/cn'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-zinc-700', className)}
      {...props}
    />
  )
}

export { Skeleton }
