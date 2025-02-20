export const hasFieldError = <T extends Record<string, unknown>>(
  errors: T,
  field: keyof T,
) => Boolean(errors[field])
