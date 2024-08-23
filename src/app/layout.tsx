import type { Metadata } from 'next'
import { Montserrat, Mr_Dafoe } from 'next/font/google'
import './globals.css'
import { cn } from '@/utils'
import { ClerkProvider } from '@clerk/nextjs'

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
  children: React.ReactNode
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
