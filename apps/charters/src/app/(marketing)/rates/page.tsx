import { getPrices } from '@/lib/stripe'
import { formatAmountForDisplay } from '@/lib/utils'

export default async function RatesPage() {
  const prices = await getPrices()
  const descendingPrices = prices.data.sort((a, b) => {
    if (!b.unit_amount && !a.unit_amount) {
      return -1
    }

    return (b.unit_amount ?? 0) - (a.unit_amount ?? 0)
  })

  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {descendingPrices.map(
        (price) =>
          price.metadata.name && (
            <tr key={price.id}>
              <td className="text-charcoal whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                {price.metadata.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatAmountForDisplay(Number(price.metadata.amount), 'CAD')}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {price.metadata.passengers}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {price.metadata.starting}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {price.metadata.ending}
              </td>
            </tr>
          )
      )}
    </tbody>
  )
}
