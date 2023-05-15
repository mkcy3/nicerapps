import React from 'react'

import Navbar from '@/components/layout/navbar'

function TripLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default TripLayout
