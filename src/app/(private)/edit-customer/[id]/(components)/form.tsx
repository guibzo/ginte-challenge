'use client'

import type { Customer } from '@/app/@types/customer'
import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editCustomerFormFields } from '@/constants/edit-customer-form-fields'
import { cn } from '@/lib/cn'
import { hasFieldError } from '@/utills/has-field-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideChevronLeft, LucidePencil } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { editCustomerSchema, type EditCustomerSchema } from './schemas'

export const EditCustomerForm = (editingCustomer: Customer) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCustomerSchema>({
    resolver: zodResolver(editCustomerSchema),
  })

  const onSubmit = (data: EditCustomerSchema) => {
    console.log(data)
  }

  return (
    <Card className='mt-8'>
      <CardContent>
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-4'>
            {editCustomerFormFields.map(
              ({ fieldName, label, placeholder, icon, colSpan }) => {
                const Icon = icon
                const hasError = hasFieldError(
                  errors,
                  fieldName as keyof typeof errors,
                )
                const fieldError =
                  errors[fieldName as keyof typeof errors]?.message

                return (
                  <div
                    key={fieldName}
                    className='space-y-1.5'
                    style={
                      colSpan
                        ? { gridColumn: `span ${colSpan} / span ${colSpan}` }
                        : {}
                    }
                  >
                    <Label htmlFor={fieldName}>{label}</Label>

                    <Input
                      {...register(fieldName as keyof EditCustomerSchema)}
                      id={fieldName}
                      placeholder={placeholder}
                      endIcon={<Icon className='size-5 text-white' />}
                      defaultValue={
                        editingCustomer[fieldName as keyof Customer]
                      }
                      className={cn(hasError && 'border-destructive')}
                    />
                    {hasError && <FormError>{fieldError}</FormError>}
                  </div>
                )
              },
            )}
          </div>

          <div className='flex w-full items-center justify-end gap-2'>
            <Link href='/'>
              <Button
                variant='gray'
                className='flex flex-1 items-center gap-2 text-sm font-semibold lg:flex-grow-0'
              >
                <LucideChevronLeft className='size-4 text-white' />
                Cancelar
              </Button>
            </Link>

            <Button
              type='submit'
              variant='green'
              className='flex flex-1 items-center gap-2 text-sm font-semibold lg:flex-grow-0'
            >
              <LucidePencil className='size-4 text-white' />
              Editar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
