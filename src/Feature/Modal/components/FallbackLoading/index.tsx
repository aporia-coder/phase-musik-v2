import { Loader } from '@/components/Loader'

export const FallbackLoading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center fixed top-0 left-0 bg-black/80">
      <Loader className="w-36 h-36" strokeWidth={0.5} />
    </div>
  )
}
