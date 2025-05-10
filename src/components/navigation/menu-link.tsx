'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { type NavigationItem } from '@/constants/navigation-items'
import { cn } from '@/lib/cn'

export const MenuLink = ({ href, icon, name }: NavigationItem) => {
  const pathname = usePathname()

  const isActive = pathname === href
  const Icon = icon

  return (
    <Link href={href}>
      <Button
        variant='ghost'
        className={cn(
          'flex w-full items-center justify-start gap-2',
          isActive && 'bg-app-green-100/15 hover:bg-app-green-100/20',
        )}
      >
        <Icon className='size-5 text-app-green-200' />
        <span className='font-semibold text-zinc-900'>{name}</span>
      </Button>
    </Link>
  )
}
