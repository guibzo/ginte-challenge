'use client'

import { DatePicker, Group } from 'react-aria-components'
import { type Control, Controller, type FieldError } from 'react-hook-form'

import { FormError } from '@/components/form-error'
import { Label } from '@/components/ui/label'
import { DateInput } from '@/components/ui/rac/datefield-rac'
import { cn } from '@/lib/cn'
import { hasFieldError } from '@/utills/has-field-error'

type FieldErrors = {
  birthdate: FieldError | undefined
  address: FieldError | undefined
  name: FieldError | undefined
  email: FieldError | undefined
  phone: FieldError | undefined
}

type _Control = Control<
  {
    birthdate: string
    address: string
    name: string
    email: string
    phone: string
  },
  any
>

type Props = {
  errors: FieldErrors
  control: _Control
  isSubmitting: boolean
}

export const RegisterCustomerFormCalendar = ({
  control,
  errors,
  isSubmitting,
}: Props) => {
  return (
    <>
      <Label>Data de nascimento</Label>

      <Controller
        control={control}
        name='birthdate'
        render={({ field }) => {
          const hasError = hasFieldError(
            errors,
            'birthdate' as keyof typeof errors,
          )

          return (
            <div
              className={cn(
                isSubmitting &&
                  'cursor:not-allowed pointer-events-none opacity-50',
              )}
            >
              <DatePicker
                className='*:not-first:mt-2'
                isDisabled={isSubmitting}
                onChange={field.onChange}
              >
                <div className='flex'>
                  <Group className='w-full'>
                    <DateInput
                      className={cn('', hasError && 'border-destructive')}
                    />
                  </Group>
                </div>
              </DatePicker>
            </div>
          )
        }}
      />

      {hasFieldError(errors, 'birthdate' as keyof typeof errors) && (
        <FormError>
          {errors['birthdate' as keyof typeof errors]!.message}
        </FormError>
      )}
    </>
  )
}
