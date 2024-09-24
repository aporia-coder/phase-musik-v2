'use client'

import { Navbar } from '@/components/Navbar'
import { LibraryContext } from '@/context/LibraryContext'
import { ReactNode, useState } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [libraryOpen, setLibraryOpen] = useState(false)
  console.log(libraryOpen)

  const toggleLibraryOpen = () => setLibraryOpen((prev) => !prev)
  const closeLibrary = () => setLibraryOpen(false)

  return (
    <LibraryContext.Provider
      value={{ libraryOpen, toggleLibraryOpen, closeLibrary }}
    >
      <header>
        <Navbar />
      </header>
      {children}
    </LibraryContext.Provider>
  )
}
