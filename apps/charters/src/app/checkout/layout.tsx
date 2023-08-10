import { Metadata } from 'next'
import React, { Suspense } from 'react'

import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Container from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Checkout',
}
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <Suspense>
        <main className="bg-gray-50 lg:pt-24">
          <Container>{children}</Container>
        </main>
      </Suspense>
      <Footer />
    </>
  )
}
