import { differenceInCalendarDays, format, parseISO } from 'date-fns'
import { redirect } from 'next/navigation'

import { getCharterStatement } from '@/lib/stripe'
import { formatAmountForDisplay } from '@/lib/utils'

import StripeCheckout from './checkout'

//TODO: proper date exception handling

async function BookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { start, end, passengers, sleep } = searchParams
  if (!(start || end || passengers)) return redirect('/trip')

  const startDate = parseISO(start as string)
  const endDate = parseISO(end as string)
  const nights = differenceInCalendarDays(endDate, startDate)

  if (nights < 0 || nights > 14 || (nights > 0 && Number(passengers) > 6))
    return redirect('/trip')

  const displayStartDate = format(startDate, 'dd MMM')
  const displayEndDate = format(endDate, 'dd MMM yyyy')
  const isSleeping = String(sleep).toLowerCase() === 'true'
  const statement = await getCharterStatement(nights, isSleeping)
  const balanceDue = statement[statement.length - 1].amount

  return (
    <StripeCheckout amount={balanceDue} nights={nights}>
      <div className="mt-10 lg:mt-0">
        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
          <h3 className="sr-only">Sailing Charter details</h3>
          <div className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <h2 className="text-charcoal text-lg font-medium">
              Sailing Charter Details
            </h2>
            <div className="flex flex-col">
              <span>
                {displayStartDate} - {displayEndDate}
              </span>
              {nights === 0 && <span>Day Sail</span>}
              {nights === 1 && <span>1 night</span>}
              {nights > 1 && <span>{nights} nights</span>}
              <span>{passengers} passengers</span>
            </div>
          </div>

          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            {statement.map((item) =>
              item.amount === 0 ? null : (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <dt className="text-sm">{item.label}</dt>
                  <dd className="text-charcoal text-sm font-medium">
                    {formatAmountForDisplay(item.amount, 'CAD')}
                  </dd>
                </div>
              )
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">
                Balance <span className="text-gray-400">(Due now)</span>
              </dt>
              <dd className="text-charcoal text-base font-medium">
                {formatAmountForDisplay(balanceDue, 'CAD')}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </StripeCheckout>
  )
}

export default BookPage
