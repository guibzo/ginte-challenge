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
      className={cn(
        'mx-auto flex min-h-screen flex-1 flex-col p-4 lg:p-6',
        className,
      )}
    >
      {children}
    </main>
  )
}
