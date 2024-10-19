import { create } from 'zustand'
import { LibraryState } from '../Library.types'

export const useLibraryStore = create<LibraryState>((set) => ({
  libraryOpen: false,
  toggleLibraryOpen: () =>
    set((state) => ({ libraryOpen: !state.libraryOpen })),
  closeLibrary: () => set(() => ({ libraryOpen: false })),
}))
