import { format } from 'date-fns'
import Link from 'next/link'

import Container from '@/components/ui/container'
import { getAuth } from '@/lib/clerk/server'
import { getUserSucceededIntents } from '@/lib/stripe'

export default async function AccountPage() {
  const { userId } = await getAuth()
  const intents = await getUserSucceededIntents(userId as string)
  return (
    <Container>
      <h1 className="text-base font-semibold leading-6 text-gray-900">
        Your Charters
      </h1>

      <table className="w-full text-left">
        <thead className="bg-white">
          <tr>
            <th
              scope="col"
              className="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
            >
              Transaction Number
              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Transaction Date
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
            >
              Starting Date
            </th>
            <th
              scope="col"
              className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
            >
              Passengers
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
            >
              Status
            </th>
            <th scope="col" className="relative py-3.5 pl-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {intents.map((intent) => (
            <tr key={intent.id}>
              <td className="relative py-4 pr-3 text-sm font-medium text-gray-900">
                {intent.id}
                <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                {format(new Date(intent.created * 1000), 'yyyy-MM-dd')}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                {intent.metadata.charterStartDate}
              </td>
              <td className="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                {intent.metadata.passengers}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">
                {intent.status}
              </td>
              <td className="relative py-4 pl-3 text-right text-sm font-medium">
                <Link
                  href="#"
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  View<span className="sr-only">, {intent.id}</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}
