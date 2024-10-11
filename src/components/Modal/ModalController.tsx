'use client'

import { Dialog } from '../ui/dialog'
import { Suspense, lazy } from 'react'
import { create } from 'zustand'

const UploadSongModal = lazy(() => import('./components/UploadSongModal'))

export enum Modals {
  UPLOAD_SONG = 'upload-song',
}

interface ModalMeta {
  [Modals.UPLOAD_SONG]: undefined
}

interface ModalStore {
  modals: Modals[]
  meta: ModalMeta
  openModal: <T extends keyof ModalMeta>(modal: T, meta?: ModalMeta[T]) => void
}

const getModal = (modal: Modals) =>
  ({
    [Modals.UPLOAD_SONG]: <UploadSongModal />,
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
    set((state) => ({ modals: [...state.modals, modal], meta })),
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
