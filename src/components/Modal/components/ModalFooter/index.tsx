import { DialogFooter } from '@/components/ui/dialog'
import { ReactNode } from 'react'

export const ModalFooter = ({
  buttons,
}: {
  buttons?: ReactNode | ReactNode[] | (() => JSX.Element)
}) => {
  return buttons && <DialogFooter>{buttons}</DialogFooter>
}
