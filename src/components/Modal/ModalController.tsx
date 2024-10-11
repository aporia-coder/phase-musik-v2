'use client'

import { Dialog } from '../ui/dialog'
import { Suspense, lazy } from 'react'
import { create } from 'zustand'

const AutoSuccessModal = lazy(() => import('./components/AutoSuccessModal'))
const UploadSongModal = lazy(() => import('./components/UploadSongModal'))

export enum Modals {
  UPLOAD_SONG = 'upload-song',
  AUTO_SUCCESS = 'auto-success',
}

interface ModalMeta {
  [Modals.UPLOAD_SONG]: undefined
  [Modals.AUTO_SUCCESS]: undefined
}

interface ModalStore {
  modals: Modals[]
  meta: Partial<ModalMeta>
  openModal: <T extends keyof ModalMeta>(modal: T, meta?: ModalMeta[T]) => void
  closeModal: () => void
}

const getModal = (modal: Modals) =>
  ({
    [Modals.UPLOAD_SONG]: <UploadSongModal />,
    [Modals.AUTO_SUCCESS]: <AutoSuccessModal />,
  })[modal]

export const ModalHandler = ({ modal }: { modal: Modals }) => {
  return (
    <Dialog open>
      <Suspense fallback={<div>fallback</div>}>{getModal(modal)}</Suspense>
    </Dialog>
  )
}

export const useModalStore = create<ModalStore>((set) => ({
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
