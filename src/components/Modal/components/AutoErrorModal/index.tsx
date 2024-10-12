import { CrossIcon } from '@/components/CrossIcon'
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '../../ModalController'

const AutoErrorModal = () => {
  const { closeModal } = useModalStore()

  setTimeout(() => closeModal(), 1000)

  return (
    <DialogContent className="flex flex-col justify-center items-center w-80 h-80 border-none">
      <CrossIcon />
      <DialogTitle>Error!</DialogTitle>
      <DialogDescription>this is the error</DialogDescription>
    </DialogContent>
  )
}

export default AutoErrorModal
