'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { navigationItems } from '@/constants/navigation-items'
import { cn } from '@/lib/cn'
import { LucideLogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Sidebar = () => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className='flex w-full max-w-[260px] flex-1 flex-col border-r border-r-zinc-300/60 p-6'>
      <div className='mx-auto'>
        <Logo />
      </div>

      <ul className='mt-12 flex flex-col gap-3'>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant='ghost'
                className={cn(
                  'flex w-full items-center justify-start gap-2',
                  isActive && 'bg-app-green-100/15 hover:bg-app-green-100/20',
                )}
              >
                <Icon className='size-6 text-app-green-200' />
                <span className='font-semibold text-zinc-900'>{item.name}</span>
              </Button>
            </Link>
          )
        })}
      </ul>

      <div className='mt-auto'>
        <Button
          variant='ghost'
          className='flex w-full items-center justify-start gap-2 text-destructive/90 hover:text-destructive'
        >
          <LucideLogOut className='size-6' />
          <span className='font-semibold'>Sair</span>
        </Button>
      </div>
    </div>
  )
}
