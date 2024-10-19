import { create } from 'zustand'
import { ModalMeta, ModalState } from '../types'

export const useModalStore = create<ModalState>((set, get) => ({
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
