'use client'

import { Navbar } from '@/components/Navbar'
import { LibraryContext } from '@/context/LibraryContext'
import { ReactNode, useState } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  const [libraryOpen, setLibraryOpen] = useState(false)

  const toggleLibraryOpen = () => setLibraryOpen((prev) => !prev)

  return (
    <LibraryContext.Provider value={{ libraryOpen, toggleLibraryOpen }}>
      <header>
        <Navbar />
      </header>
      {children}
    </LibraryContext.Provider>
  )
}
