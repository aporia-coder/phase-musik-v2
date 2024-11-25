import { Song } from '@prisma/client'
import { AutoErrorModalMeta } from './components/AutoErrorModal/types'
import { UploadEditSongMeta } from '../Library/components/UploadEditSongModal/types'

export enum Modals {
  UPLOAD_EDIT_SONG = 'upload-edit-song',
  AUTO_SUCCESS = 'auto-success',
  AUTO_ERROR = 'auto-error',
  DELETE_SONG = 'delete-song',
}

export interface ModalMeta {
  [Modals.UPLOAD_EDIT_SONG]: UploadEditSongMeta
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
