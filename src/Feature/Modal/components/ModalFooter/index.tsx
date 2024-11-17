import { DialogFooter } from '@/components/ui/dialog'
import { ReactNode } from 'react'

export const ModalFooter = ({
  buttons,
}: {
  buttons?: ReactNode | ReactNode[]
}) => {
  return buttons && <DialogFooter>{buttons}</DialogFooter>
}
