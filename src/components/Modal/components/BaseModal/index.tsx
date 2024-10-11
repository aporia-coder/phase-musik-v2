import { DialogContent } from '@/components/ui/dialog'
import { BaseModalProps } from './types'
import { ModalHeader } from '../ModalHeader'
import { ModalFooter } from '../ModalFooter'

export const BaseModal = ({
  title,
  description,
  buttons,
  content,
}: BaseModalProps) => {
  return (
    <>
      <DialogContent>
        <ModalHeader title={title} description={description} />
        {typeof content === 'string' ? <p>{content}</p> : content}
        <ModalFooter buttons={buttons} />
      </DialogContent>
    </>
  )
}
