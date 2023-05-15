import formatDistance from 'date-fns/formatDistance'

import { cn } from '@/lib/utils'

type CharterSummaryProps = {
  className?: string
  end: Date | null
  passengers?: number
  start: Date | null
}

function CharterSummary({
  className = '',
  start = null,
  end = null,
  passengers = 0,
}: CharterSummaryProps) {
  const startFormat = start?.toDateString() ?? ''

  const duration = start && end ? formatDistance(end, start) : null

  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-indigo-900 py-12 text-indigo-300 md:px-10 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg lg:bg-transparent lg:px-0 lg:pb-24 lg:pt-0"
    >
      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
        <h2 id="summary-heading" className="sr-only">
          Order summary
        </h2>

        <dl>
          <dt className="text-sm font-medium">Amount due</dt>
          <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
            $232.00
          </dd>
        </dl>

        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
          <div className="flex items-center justify-between">
            <dt>Subtotal</dt>
            <dd>$570.00</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt>Shipping</dt>
            <dd>$25.00</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt>Taxes</dt>
            <dd>$47.60</dd>
          </div>

          <div className="flex items-center justify-between border-t border-white border-opacity-10 pt-6 text-white">
            <dt className="text-base">Total</dt>
            <dd className="text-base">$642.60</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default CharterSummary
