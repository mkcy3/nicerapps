import './globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import React from 'react'

import Navbar from '@/components/layout/navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  )
}
