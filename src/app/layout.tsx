import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { cn } from '@/utils'

const montserrat = Montserrat({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={cn(montserrat.className, 'text-[#f2f2f2] bg-[#141414]')}>
        <main>{children}</main>
      </body>
    </html>
  )
}
