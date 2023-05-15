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

  const duration =
    start && end ? `${formatDistance(end, start).charAt(0)} nights` : 'Day Sail'

  return (
    <section
      aria-labelledby="summary-heading"
      className="px-6 text-indigo-300 lg:col-start-2 lg:row-start-1 lg:mx-auto lg:w-full lg:max-w-lg"
    >
      <div className=" mx-auto h-full max-w-2xl rounded-lg bg-indigo-900 px-6 lg:max-w-none">
        <h2 id="summary-heading" className="sr-only">
          Booking summary
        </h2>

        <dl></dl>

        <ul
          role="list"
          className="divide-y divide-white divide-opacity-10 text-sm font-medium"
        >
          <li className="flex items-start space-x-4 py-6">
            {/* <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  /> */}
            <div className="flex-auto space-y-1">
              <h3 className="text-white">{startFormat}</h3>
              <p>{duration}</p>
            </div>
          </li>
        </ul>

        <dl className="space-y-6 border-t border-white border-opacity-10 pt-6 text-sm font-medium">
          <div className="flex items-center justify-between">
            <dt className="text-sm font-medium">Amount due</dt>
            <dd className="mt-1 text-3xl font-bold tracking-tight text-white">
              Stripe Price
            </dd>
          </div>
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
