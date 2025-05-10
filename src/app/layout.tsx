import '@/styles/global.css'

import type { Metadata } from 'next'

import { segoe_ui } from '@/../public/fonts/fonts'
import { Providers } from '@/components/providers'
import { cn } from '@/lib/cn'

export const metadata: Metadata = {
  title: {
    template: '%s | Ginse',
    default: 'Ginse',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt' className={cn(segoe_ui.className)}>
      <body className='flex h-screen w-full flex-col antialiased'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
