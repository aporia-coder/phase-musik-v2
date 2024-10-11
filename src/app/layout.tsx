import type { Metadata } from 'next'
import { Montserrat, Mr_Dafoe } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

const mrDafoe = Mr_Dafoe({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mr-dafoe',
})

export const metadata: Metadata = {
  title: 'Phase Musik',
  description: 'Your new music player for the web',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            montserrat.className,
            mrDafoe.variable,
            'text-[#f2f2f2]'
          )}
        >
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
