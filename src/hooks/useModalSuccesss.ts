import { useRouter } from 'next/navigation'
import { useModalStore } from '../Feature/Modal/store'
import { useCallback } from 'react'
import { Modals } from '../Feature/Modal/types'

export const useModalSuccess = () => {
  const router = useRouter()
  const { closeModal, openModal } = useModalStore()

  return useCallback(() => {
    closeModal()
    openModal(Modals.AUTO_SUCCESS)
    router.refresh()
  }, [closeModal, openModal, router])
}
