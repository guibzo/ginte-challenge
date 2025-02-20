'use client'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { navigationItems } from '@/constants/navigation-items'
import { LucideLogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MenuLink } from './menu-link'

export const Sidebar = () => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className='hidden w-full max-w-[260px] flex-1 flex-col border-r border-r-zinc-300/60 p-6 lg:flex'>
      <div className='mx-auto'>
        <Logo />
      </div>

      <ul className='mt-12 flex flex-col gap-3'>
        {navigationItems.map((item) => {
          return <MenuLink key={item.id} {...item} />
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
