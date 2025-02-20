import { useState } from 'react'

export function useCheckedItems<T extends { id: string }>() {
  const [checkedItems, setCheckedItems] = useState<T[]>([])

  const toggleItem = (item: T) => {
    setCheckedItems((prev) => {
      const isChecked = prev.some((c) => c.id === item.id)

      if (isChecked) {
        return prev.filter((c) => c.id !== item.id)
      }

      return [...prev, item]
    })
  }

  return { checkedItems, toggleItem }
}
