import React from 'react'

import Banner from '@/components/layout/banner'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Container from '@/components/ui/container'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <Banner className="relative" />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}
