import './globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  )
}

export default RootLayout
