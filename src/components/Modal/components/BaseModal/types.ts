import { ModalHeaderProps } from '../ModalHeader/types'
import { ModalFooterProps } from '../ModalFooter/types'
import { ReactNode } from 'react'

export interface BaseModalProps {
  title: ModalHeaderProps['title']
  description: ModalHeaderProps['description']
  buttons?: ModalFooterProps['buttons']
  content?: ReactNode | string
}
