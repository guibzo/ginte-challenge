export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className='text-2xl font-semibold leading-tight lg:text-[32px]'>
      {children}
    </h1>
  )
}
