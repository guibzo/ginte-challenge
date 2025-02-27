'use client'

import type { Customer } from '@/@types/customer'
import { doEditCustomer } from '@/actions/customers/do-edit-customer'
import { FormError } from '@/components/form-error'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CustomToast } from '@/components/ui/custom-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { editCustomerFormFields } from '@/constants/edit-customer-form-fields'
import { cn } from '@/lib/cn'
import { queryClient } from '@/lib/query-client'
import { getCustomerByIdQuery } from '@/queries/tanstack/customers/get-customer-by-id'
import { hasFieldError } from '@/utills/has-field-error'
import { parseDDMMYYYYToISO } from '@/utills/parse-dd-mm-yyyy-to-iso'
import { zodResolver } from '@hookform/resolvers/zod'
import { parseDate } from '@internationalized/date'
import { LucideChevronLeft, LucidePencil } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { startTransition, useActionState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useHookFormMask } from 'use-mask-input'
import { EditCustomerFormCalendar } from './form-calendar'
import { editCustomerSchema, type EditCustomerSchema } from './schemas'

export const EditCustomerForm = ({
  editingCustomerId,
}: {
  editingCustomerId: string
}) => {
  const router = useRouter()
  const { data: editingCustomer } = getCustomerByIdQuery(editingCustomerId)

  const [state, formAction, isSubmitting] = useActionState(doEditCustomer, {
    message: '',
    code: 0,
  })

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<EditCustomerSchema>({
    resolver: zodResolver(editCustomerSchema),
  })

  const registerWithMask = useHookFormMask(register)

  const formRef = useRef<HTMLFormElement>(null)

  const onFormSubmit = () => {
    startTransition(() => {
      const formData = new FormData(formRef.current!)
      const birthdateValue = getValues('birthdate')

      formData.append('birthdate', birthdateValue)
      formData.append('id', editingCustomer!.id)

      formAction(formData)
    })
  }

  useEffect(() => {
    if (!state.code) return

    setTimeout(() => {
      const toastProps = {
        title: state.message,
        type: state.code === 204 ? 'success' : ('error' as any),
        error: state.message,
      }

      toast(<CustomToast {...toastProps} />)
    }, 0)

    if (state.code === 204) {
      queryClient.invalidateQueries({ queryKey: ['fetch-customers'] })
    }
  }, [state])

  useEffect(() => {
    if (!editingCustomer) {
      router.replace('/')
    }
  }, [])

  if (!editingCustomer) {
    return null
  }

  const formattedBirthdate = parseDate(
    parseDDMMYYYYToISO(editingCustomer!.birthdate),
  )

  return (
    <Card className='mt-8'>
      <CardContent>
        <form
          className='space-y-8'
          ref={formRef}
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
            {editCustomerFormFields.map(
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
                      disabled={isSubmitting}
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

            <div className='col-span-2 row-start-3 mt-2.5 flex flex-col gap-1.5 sm:col-span-1 sm:col-start-2 sm:row-start-2'>
              <EditCustomerFormCalendar
                control={control}
                errors={errors as any}
                isSubmitting={isSubmitting}
                defaultValue={formattedBirthdate}
              />

              {/* <Label>Data de nascimento</Label>

              <Controller
                control={control}
                name='birthdate'
                defaultValue={formattedBirthdate}
                render={({ field }) => {
                  const hasError = hasFieldError(
                    errors,
                    'birthdate' as keyof typeof errors,
                  )

                  return (
                    <Popover disabled={isSubmitting} {...register('birthdate')}>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'relative justify-between border-zinc-700 bg-zinc-950 text-white hover:brightness-100',
                            hasError && 'border-destructive',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', {
                              locale: pt,
                            })
                          ) : (
                            <span className='text-gray-400'>
                              1 de janeiro de 2025
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
              )} */}
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
              disabled={isSubmitting}
              className='flex flex-1 items-center gap-2 text-sm font-semibold sm:flex-grow-0'
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
