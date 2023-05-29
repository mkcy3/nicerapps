//nested layout acts as 'page' and page essentially compontent...
import React, { Suspense } from 'react'

const information = [
  {
    text: 'Every overnight charter has the option to add the sleep aboard addition at checkout. The weekend or any single night charter, this is included.',
  },
  {
    text: 'For short overnight charters, two additional passengers can sleep in the makeshift saloon bed.',
  },
]

export default function RatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Charter Rates
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Rates are listed below include skipper, but without provisions.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
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
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Number of Nights
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Passengers
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Departure Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
