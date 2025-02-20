import { cn } from '@/lib/cn'

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1
      className={cn(
        'text-2xl font-semibold leading-tight lg:text-[32px]',
        className,
      )}
    >
      {children}
    </h1>
  )
}
