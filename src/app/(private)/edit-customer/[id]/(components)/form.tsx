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
    reset: resetForm,
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
    if (editingCustomer) {
      const formValues: any = {}

      editCustomerFormFields.forEach(({ fieldName }) => {
        if (fieldName in editingCustomer) {
          formValues[fieldName] = editingCustomer[fieldName as keyof Customer]
        }
      })

      const formattedBirthdate = parseDate(
        parseDDMMYYYYToISO(editingCustomer.birthdate),
      )
      formValues.birthdate = formattedBirthdate.toString()

      resetForm(formValues)
    }
  }, [editingCustomer, resetForm])

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
      resetForm()

      queryClient.invalidateQueries({
        queryKey: ['fetch-customers'],
      })

      router.push('/?page=1')
    }
  }, [state, editingCustomerId, resetForm, router])

  useEffect(() => {
    if (!editingCustomer) {
      router.replace('/')
    }
  }, [editingCustomer, router])

  if (!editingCustomer) {
    return null
  }

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
                defaultValue={parseDate(
                  parseDDMMYYYYToISO(editingCustomer.birthdate),
                )}
              />
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
