import React from 'react'

import Navbar from '@/components/layout/navbar'

function RatesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default RatesLayout
