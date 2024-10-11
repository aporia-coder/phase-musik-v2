import { TickIcon } from '@/components/TickIcon'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useModalStore } from '../../ModalController'

const AutoSuccessModal = () => {
  const { closeModal } = useModalStore()

  setTimeout(() => closeModal(), 1000)

  return (
    <DialogContent className="flex flex-col justify-center items-center w-80 h-80 border-none">
      <TickIcon />
      <DialogTitle>Success!</DialogTitle>
    </DialogContent>
  )
}

export default AutoSuccessModal
