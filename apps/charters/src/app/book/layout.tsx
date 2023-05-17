import React, { Suspense } from 'react'

import Container from '@/components/ui/container'

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
