import { cn } from '@/lib/utils'
import { LoaderProps } from './types'
import { Loader2 } from 'lucide-react'

export const Loader = ({
  className,
  message,
  strokeWidth = undefined,
}: LoaderProps) => {
  return (
    <>
      <Loader2
        className={cn('animate-spin', className)}
        strokeWidth={strokeWidth}
      />
      {message && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
      )}
    </>
  )
}
