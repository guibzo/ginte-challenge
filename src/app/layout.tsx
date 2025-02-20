import { segoe_ui } from '@/../public/fonts/fonts'
import { cn } from '@/lib/cn'
import '@/styles/global.css'
import type { Metadata } from 'next'

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
      <body className='antialiased'>
        <div className='flex h-screen w-full flex-col'>{children}</div>
      </body>
    </html>
  )
}
