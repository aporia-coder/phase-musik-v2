import { ReactNode } from 'react'

export interface ModalFooterProps {
  buttons?: ReactNode | ReactNode[] | (() => JSX.Element)
}
