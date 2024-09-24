import { createContext, useContext } from 'react'

interface LibraryContextTypes {
  libraryOpen: boolean
  toggleLibraryOpen: () => void
  closeLibrary: () => void
}

export const LibraryContext = createContext<LibraryContextTypes | undefined>(
  undefined
)

export const useLibrary = () => {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider')
  }
  return context
}
