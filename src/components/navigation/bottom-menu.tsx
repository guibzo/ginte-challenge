'use client'

import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { navigationItems } from '@/constants/navigation-items'
import { LucideLogOut, LucideMenu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Title } from '../title'
import { DialogTitle } from '../ui/dialog'
import { MenuLink } from './menu-link'

export const BottomMenu = () => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className='fixed bottom-0 flex h-12 w-full items-center bg-zinc-700 lg:hidden'>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='ghost' className='h-full w-full hover:bg-zinc-800'>
            <LucideMenu className='mx-auto text-white' />
          </Button>
        </DrawerTrigger>

        <DrawerContent className='p-2.5'>
          <DialogTitle asChild>
            <div className='my-4'>
              <Title>Menu</Title>
            </div>
          </DialogTitle>

          <ul className='flex flex-col gap-2.5'>
            {navigationItems.map((item) => {
              return <MenuLink key={item.id} {...item} />
            })}
          </ul>

          <div className='mt-5'>
            <Button
              variant='ghost'
              className='flex w-full items-center justify-start gap-2 text-destructive/90 hover:text-destructive'
            >
              <LucideLogOut className='size-6' />
              <span className='font-semibold'>Sair</span>
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
