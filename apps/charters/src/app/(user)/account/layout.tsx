import { Metadata } from 'next'
import { Suspense } from 'react'

import Container from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'Dashboard',
}
export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="min-h-screen pt-16">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-charcoal text-base font-semibold leading-6">
              Your Charters
            </h1>
          </div>
        </div>
        <div className="mt-8 flow-root ">
          <div className="-mx-4 -my-2 overflow-x-auto  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full bg-gray-50 py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-0"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Charter Starting
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Passengers
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Sleep Aboard
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Payed
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Remaining
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold"
                    >
                      Due Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <Suspense>{children}</Suspense>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
