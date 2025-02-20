import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function useParamsRouter() {
  const router = useRouter()
  const currentPath = usePathname()
  const searchParams = useSearchParams()

  let params = new URLSearchParams(searchParams)

  const remove = (paramsToDelete?: string[]) => {
    paramsToDelete?.forEach((param) => {
      params.delete(param)
    })
    return operations
  }

  const add = (paramsToAdd?: Record<string, string>) => {
    if (paramsToAdd) {
      for (const [key, value] of Object.entries(paramsToAdd)) {
        params.append(key, value)
      }
    }
    return operations
  }

  const update = () => {
    router.push(`${currentPath}?${params.toString()}`)
    return operations
  }

  const refresh = () => {
    router.refresh()
    return operations
  }

  const operations = { remove, add, update, refresh }

  return operations
}
