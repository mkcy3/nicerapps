import { Cancel, CheckCircle } from 'iconoir-react'

import { getAuth } from '@/lib/clerk/server'
import { getUserSucceededIntents } from '@/lib/stripe'
import { formatAmountForDisplay } from '@/lib/utils'

export default async function AccountPage() {
  const { userId } = await getAuth()
  const intents = await getUserSucceededIntents(userId as string)

  return (
    <>
      {intents.length !== 0 ? (
        intents.map((intent) => (
          <tr key={intent.id}>
            <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
              {intent.id}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
              {intent.metadata.charterStartDate}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
              {intent.metadata.passengers}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
              {intent.metadata.sleepAboard === 'true' ? (
                <CheckCircle className="text-green-500" />
              ) : (
                <Cancel className="text-red-500" />
              )}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
              {formatAmountForDisplay(intent.amount, 'CAD')}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
              {'N/A'}
            </td>
            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
              {'N/A'}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
            No charters found
          </td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
          <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"></td>
        </tr>
      )}
    </>
  )
}
