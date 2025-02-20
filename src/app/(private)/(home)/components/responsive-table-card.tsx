import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { LucidePencil } from 'lucide-react'
import { Fragment } from 'react'

export const ResponsiveTableCard = () => {
  return (
    <ul className='lg:hidden'>
      <Separator className='bg-border' />

      {Array.from({ length: 6 }).map((_, i) => {
        return (
          <Fragment key={i}>
            <Card className='rounded-none border-0' key={i}>
              <CardContent className='flex items-center justify-between gap-2.5'>
                <div className='flex items-center gap-3'>
                  <Checkbox className='size-6' />

                  <div className='flex flex-col gap-1 text-sm text-white'>
                    <span>Latoya Bartoletti</span>
                    <span>Alison48@hotmail.com</span>
                    <span>489-742-5107</span>
                    <span>Rua XYZ</span>
                  </div>
                </div>

                <Button
                  variant='outline'
                  size='icon'
                  className='flex items-center justify-center border-amber-500 bg-amber-500'
                >
                  <LucidePencil className='size-5 text-white' />
                </Button>
              </CardContent>
            </Card>

            <Separator className='bg-border' />
          </Fragment>
        )
      })}
    </ul>
  )
}
