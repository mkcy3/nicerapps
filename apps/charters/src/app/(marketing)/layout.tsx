import React from 'react'

import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Container from '@/components/ui/container'

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default MarketingLayout
