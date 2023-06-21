import { Metadata } from 'next'
import React, { Suspense } from 'react'

import Container from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Checkout',
}
function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <main className="bg-gray-50 lg:pt-24">
        <Container>{children}</Container>
      </main>
    </Suspense>
  )
}

export default BookLayout
