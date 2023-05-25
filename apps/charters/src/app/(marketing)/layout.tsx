import React from 'react'

import Banner from '@/components/layout/banner'
import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'
import Container from '@/components/ui/container'

function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Banner />
      <Container>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Container>
    </>
  )
}

export default MarketingLayout
