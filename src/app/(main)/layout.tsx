'use client'

import { Navbar } from '@/components/Navbar'
import { ModalController } from '@/Feature/Modal/ModalController'
import { ReactNode } from 'react'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      {children}
      <ModalController />
    </>
  )
}
