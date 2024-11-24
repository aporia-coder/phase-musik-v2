import { Song } from '@prisma/client'
import { AutoErrorModalMeta } from './components/AutoErrorModal/types'

export enum Modals {
  UPLOAD_SONG = 'upload-song',
  AUTO_SUCCESS = 'auto-success',
  AUTO_ERROR = 'auto-error',
  DELETE_SONG = 'delete-song',
}

export interface ModalMeta {
  [Modals.UPLOAD_SONG]: undefined
  [Modals.AUTO_SUCCESS]: undefined
  [Modals.AUTO_ERROR]: AutoErrorModalMeta
  [Modals.DELETE_SONG]: Song
}

export interface ModalState {
  modals: Modals[]
  meta: Partial<ModalMeta>
  openModal: <T extends keyof ModalMeta>(modal: T, meta?: ModalMeta[T]) => void
  closeModal: () => void
  getModalMeta: <T extends Modals>(modal: T) => ModalMeta[T] | undefined
}
