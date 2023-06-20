import Footer from '@/components/layout/footer'
import Navbar from '@/components/layout/navbar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  )
}
