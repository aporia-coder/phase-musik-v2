import type { Metadata } from 'next'
import { Montserrat, Mr_Dafoe } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from './api/uploadthing/core'

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
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  )
}
