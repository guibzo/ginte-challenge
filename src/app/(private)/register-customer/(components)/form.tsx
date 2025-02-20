'use client'

import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { registerCustomerFormFields } from '@/constants/register-customer-form-fields'
import { cn } from '@/lib/cn'
import { hasFieldError } from '@/utills/has-field-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale/pt'
import { LucideCalendarDays, LucideChevronLeft, LucidePlus } from 'lucide-react'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { editCustomerSchema, type EditCustomerSchema } from './schemas'

export const RegisterCustomerForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditCustomerSchema>({
    resolver: zodResolver(editCustomerSchema),
  })

  const registerWithMask = useHookFormMask(register)

  const onSubmit = (data: EditCustomerSchema) => {
    console.log(data)
  }

  return (
    <Card className='mt-8'>
      <CardContent>
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
            {registerCustomerFormFields.map(
              ({ fieldName, label, placeholder, icon, colSpan, mask }) => {
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
                    className='col-span-2 space-y-1.5 sm:col-span-1'
                    style={
                      colSpan
                        ? { gridColumn: `span ${colSpan} / span ${colSpan}` }
                        : {}
                    }
                  >
                    <Label htmlFor={fieldName}>{label}</Label>

                    <Input
                      {...(mask
                        ? registerWithMask(
                            fieldName as keyof EditCustomerSchema,
                            mask,
                          )
                        : register(fieldName as keyof EditCustomerSchema))}
                      id={fieldName}
                      placeholder={placeholder}
                      endIcon={<Icon className='size-5 text-white' />}
                      className={cn(hasError && 'border-destructive')}
                    />
                    {hasError && <FormError>{fieldError}</FormError>}
                  </div>
                )
              },
            )}

            <div className='col-span-2 row-start-3 mt-2.5 flex flex-col gap-1.5 sm:col-span-1 sm:col-start-2 sm:row-start-2'>
              <Label>Data de nascimento</Label>

              <Controller
                control={control}
                name='birthdate'
                render={({ field }) => {
                  return (
                    <Popover {...register('birthdate')}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'relative justify-between border-zinc-700 bg-zinc-950 text-white',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: pt })
                          ) : (
                            <span className='text-muted-foreground/80'>
                              1 de janeiro de 2024
                            </span>
                          )}
                          <LucideCalendarDays className='absolute end-2.5 size-5 text-white' />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className='w-auto p-0'>
                        <Calendar
                          mode='single'
                          locale={pt}
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )
                }}
              />

              {hasFieldError(errors, 'birthdate' as keyof typeof errors) && (
                <FormError>
                  {errors['birthdate' as keyof typeof errors]!.message}
                </FormError>
              )}
            </div>
          </div>

          <div className='flex w-full items-center justify-end gap-2'>
            <Link href='/' className='flex flex-1 sm:flex-grow-0'>
              <Button
                variant='gray'
                className='flex flex-1 items-center gap-2 text-sm font-semibold sm:flex-grow-0'
              >
                <LucideChevronLeft className='size-4 text-white' />
                Cancelar
              </Button>
            </Link>

            <Button
              type='submit'
              variant='green'
              className='flex flex-1 items-center gap-2 text-sm font-semibold sm:flex-grow-0'
            >
              <LucidePlus className='size-4 text-white' />
              Cadastrar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
