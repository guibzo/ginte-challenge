import { cn } from '@/lib/cn'

export const ContentContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <main
      className={cn('mx-auto flex min-h-screen w-full flex-col p-6', className)}
    >
      {children}
    </main>
  )
}
