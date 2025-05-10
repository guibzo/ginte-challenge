import '@/styles/global.css'

import { ContentContainer } from '@/components/content-container'
import { BottomMenu } from '@/components/navigation/bottom-menu'
import { Sidebar } from '@/components/navigation/sidebar'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-1 pb-12 lg:pb-0'>
      <Sidebar />
      <BottomMenu />

      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}
