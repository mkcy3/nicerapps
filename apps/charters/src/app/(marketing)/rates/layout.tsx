//nested layout acts as 'page' and page essentially compontent...
import { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Rates',
}
const information = [
  {
    text: 'Every overnight charter has the option to add the sleep aboard addition at checkout. Any single night charter, including weekends, this is included.',
  },
  {
    text: 'For short overnight charters, two additional passengers can sleep in the makeshift saloon bed. Not recommended for adults on longer trips.',
  },
  {
    text: 'All personal and payment information is not stored or handled by us. The checkout process is handled securely by Stripe.',
  },
]

export default function RatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-16 min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-charcoal text-base font-semibold leading-6">
            Charter Rates
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Rates are listed below include skipper, but without provisions.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="text-charcoal py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      Number of Nights
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Passengers
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Departure Time
                    </th>
                    <th
                      scope="col"
                      className="text-charcoal px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Returning Time
                    </th>
                  </tr>
                </thead>
                <Suspense>{children}</Suspense>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="prose mt-8">
        <h4> Additional Information</h4>
        <ul role="list" className="">
          {information.map((info, idx) => (
            <li key={`${idx}-info`} className="py-2">
              {info.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
