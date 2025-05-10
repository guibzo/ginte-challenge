import Image from 'next/image'

import { cn } from '@/lib/cn'

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src='/logo.svg'
      width={50}
      height={50}
      alt='Ginse Logo'
      className={cn('size-[50px]', className)}
    />
  )
}
