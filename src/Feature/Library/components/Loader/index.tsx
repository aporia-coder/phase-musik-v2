import { cn } from '@/lib/utils'
import { LoaderProps } from './types'
import { Loader2 } from 'lucide-react'

export const Loader = ({ className, message }: LoaderProps) => {
  return (
    <>
      <Loader2
        className={cn('w-10 h-10 animate-spin text-zinc-500 mb-1', className)}
      />
      {message && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{message}</p>
      )}
    </>
  )
}
