import { ContentContainer } from '@/components/content-container'
import { Sidebar } from '@/components/sidebar'
import '@/styles/global.css'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex flex-1'>
      <Sidebar />

      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}
