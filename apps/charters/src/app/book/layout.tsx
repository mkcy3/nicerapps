import React from 'react'

function BookLayout({ children }: { children: React.ReactNode }) {
  return <main className="lg:pt-24">{children}</main>
}

export default BookLayout
