import { RefObject, useEffect } from 'react'

export const useOnClickOutside = (
  fn: (event: MouseEvent | TouchEvent) => void,
  ref: RefObject<HTMLDivElement> | undefined,
  prevent?: boolean
) => {
  useEffect(() => {
    if (!ref?.current || prevent) return

    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      if (ref.current?.contains(target)) return

      fn(event)
    }

    document.addEventListener('click', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, fn, prevent])
}
