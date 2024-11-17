import { CrossIcon } from '@/components/CrossIcon'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '../../store'
import { Modals } from '../../types'

const AutoErrorModal = () => {
  const { closeModal, getModalMeta } = useModalStore()
  const modalMeta = getModalMeta(Modals.AUTO_ERROR)

  setTimeout(() => closeModal(), 2000)

  return (
    <DialogContent className="flex flex-col justify-center items-center w-80 h-80 border-none">
      <CrossIcon />
      <DialogTitle>Error!</DialogTitle>
      <DialogDescription>{modalMeta?.error}</DialogDescription>
    </DialogContent>
  )
}

export default AutoErrorModal
