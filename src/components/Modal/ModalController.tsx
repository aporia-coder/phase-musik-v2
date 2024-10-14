'use client'

import { Dialog } from '../ui/dialog'
import { Suspense, lazy } from 'react'
import { create } from 'zustand'
import { AutoErrorModalMeta } from './components/AutoErrorModal/types'

const AutoSuccessModal = lazy(() => import('./components/AutoSuccessModal'))
const AutoErrorModal = lazy(() => import('./components/AutoErrorModal'))
const UploadSongModal = lazy(() => import('./components/UploadSongModal'))

export enum Modals {
  UPLOAD_SONG = 'upload-song',
  AUTO_SUCCESS = 'auto-success',
  AUTO_ERROR = 'auto-error',
}

interface ModalMeta {
  [Modals.UPLOAD_SONG]: undefined
  [Modals.AUTO_SUCCESS]: undefined
  [Modals.AUTO_ERROR]: AutoErrorModalMeta
}

interface ModalStore {
  modals: Modals[]
  meta: Partial<ModalMeta>
  openModal: <T extends keyof ModalMeta>(modal: T, meta?: ModalMeta[T]) => void
  closeModal: () => void
  getModalMeta: <T extends Modals>(modal: T) => ModalMeta[T] | undefined
}

const getModal = (modal: Modals) =>
  ({
    [Modals.UPLOAD_SONG]: <UploadSongModal />,
    [Modals.AUTO_SUCCESS]: <AutoSuccessModal />,
    [Modals.AUTO_ERROR]: <AutoErrorModal />,
  })[modal]

export const ModalHandler = ({ modal }: { modal: Modals }) => {
  return (
    <Dialog open>
      <Suspense fallback={<div>fallback</div>}>{getModal(modal)}</Suspense>
    </Dialog>
  )
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: [],
  meta: {} as ModalMeta,
  openModal: (modal, meta) =>
    set((state) => ({
      modals: [...state.modals, modal],
      meta: { ...state.meta, [modal]: meta },
    })),
  closeModal: () =>
    set((state) => {
      const topModal = state.modals[-1]

      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { [topModal]: _, ...meta } = state.meta
      return {
        modals: state.modals.slice(0, -1),
        meta: meta,
      }
    }),
  closeAllModals: () =>
    set(() => ({
      modals: [],
      meta: {},
    })),
  getModalMeta: (modals) => get().meta[modals],
}))

export const ModalController = () => {
  const modals = useModalStore((state) => state.modals)

  return (
    <>
      {modals.map((modal) => (
        <ModalHandler modal={modal} key={modal} />
      ))}
    </>
  )
}
