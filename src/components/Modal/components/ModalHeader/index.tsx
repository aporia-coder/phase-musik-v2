import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalStore } from '../../ModalController'
import { ModalHeaderProps } from './types'
import { X } from 'lucide-react'

export const ModalHeader = ({
  title,
  description,
  handleClose,
}: ModalHeaderProps) => {
  const { closeModal } = useModalStore()
  return (
    <DialogHeader>
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        onClick={handleClose ?? closeModal}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
      <DialogTitle>{title}</DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </DialogHeader>
  )
}
