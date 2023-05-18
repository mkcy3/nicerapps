import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/server'
import Dinero from 'dinero.js'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'

import { format } from '@/lib/day-of-year'
import { formatAmountForDisplay, stripeErrorHandling } from '@/lib/utils'

import StripeCheckout from './checkout'
import Extras from './extras'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
})

async function getPaymentIntent(
  startDayOfYear: number,
  endDayOfYear: number,
  nights: number,
  isSleeping: boolean,
  passengers: number
) {
  const charterDayDuration = nights + 1
  const charterStartDate = format(startDayOfYear, 'yyyy-MM-dd')
  const charterEndDate = format(endDayOfYear, 'yyyy-MM-dd')

  const prices = await stripe.prices.list()

  const clerkUser = (await currentUser()) as User

  const matchingDayPrice = prices.data.find((price) => {
    const nicknameParts = price.nickname?.split('-') ?? ['1']

    if (nicknameParts.length === 2) {
      const min = parseInt(nicknameParts[0])
      const max = parseInt(nicknameParts[1])
      return charterDayDuration >= min && charterDayDuration <= max
    }

    return parseInt(nicknameParts[0]) === charterDayDuration
  })?.unit_amount as number

  const sleepAboardPrice = isSleeping
    ? Dinero({ amount: 20000, currency: 'CAD' })
    : Dinero({ amount: 0, currency: 'CAD' })

  const subTotal = Dinero({
    amount: matchingDayPrice * charterDayDuration,
    currency: 'CAD',
  })

  const discount = subTotal.multiply(0.5)
  const tax = subTotal.subtract(discount).add(sleepAboardPrice).multiply(0.13)
  //TODO: Deposit and Remaining balance for next season
  const balance = subTotal.subtract(discount).add(sleepAboardPrice).add(tax)

  const statement = [
    {
      id: 'subtotal',
      label: 'Subtotal',
      amount: subTotal.getAmount(),
    },
    {
      id: 'discount',
      label: 'Discount',
      amount: discount.getAmount(),
    },
    {
      id: 'sleepAbroad',
      label: 'Sleep Abroad',
      amount: sleepAboardPrice.getAmount(),
    },
    {
      id: 'tax',
      label: 'Tax',
      amount: tax.getAmount(),
    },
    {
      id: 'balance',
      label: 'Balance',
      amount: balance.getAmount(),
    },
  ]

  const stripeMetadata = {
    clerkUserId: clerkUser.id,
    clerkEmail: clerkUser.emailAddresses[0].emailAddress,
    charterStartDate,
    charterEndDate,
    sleepAboard: isSleeping.toString(),
    passengers,
  }

  //USESVR: currently refreshing page for data via url
  const storedPaymentId = clerkUser.privateMetadata?.stripePi as string
  if (storedPaymentId) {
    try {
      const updatePaymentIntent = await stripe.paymentIntents.update(
        storedPaymentId,
        {
          amount: balance.getAmount(),
          metadata: stripeMetadata,
        }
      )
      return { stripePi: updatePaymentIntent, statement: statement }
    } catch (e) {
      stripeErrorHandling(e)
    }
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: balance.getAmount(),
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
      metadata: stripeMetadata,
    })
    return { stripePi: paymentIntent, statement: statement }
  } catch (e) {
    stripeErrorHandling(e)
  }

  return { stripePi: null, statement: statement }
}

//TODO: proper date exception handling
async function BookPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { start, end, passengers, sleep } = searchParams
  if (!(start || end || passengers)) return redirect('/trip')

  const startDayOfYear = Number(start)
  const endDayOfYear = Number(end)
  const duration = endDayOfYear - startDayOfYear

  if (duration < 0 || duration > 14 || (duration > 0 && Number(passengers) > 4))
    return redirect('/trip')

  const startDate = format(startDayOfYear, 'dd MMM')
  const endDate = format(endDayOfYear, 'dd MMM yyyy')
  const isSleeping = String(sleep).toLowerCase() === 'true'
  //const isWithin = isWithinSixtyDays(startDayOfYear)
  const { stripePi, statement } = await getPaymentIntent(
    startDayOfYear,
    endDayOfYear,
    duration,
    isSleeping,
    Number(passengers)
  )
  const balanceDue = formatAmountForDisplay(
    statement[statement.length - 1].amount,
    'CAD'
  )
  return (
    <>
      <h1 className="sr-only">Booking</h1>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          {duration > 0 && (
            <>
              {' '}
              <h2 className="mb-4 border-b text-lg font-medium text-gray-900">
                Extras
              </h2>
              <Extras />{' '}
            </>
          )}
          {stripePi?.client_secret && (
            <StripeCheckout clientSecret={stripePi.client_secret} />
          )}
        </div>
        <div className="mt-10 lg:mt-0">
          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <h3 className="sr-only">Sailing Charter details</h3>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">
                Sailing Charter Details
              </h2>
              <div className="flex flex-col">
                <span>
                  {startDate} - {endDate}
                </span>
                <span>{duration > 0 ? `${duration} nights` : 'Day Sail'}</span>
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
                    <dd className="text-sm font-medium text-gray-900">
                      {formatAmountForDisplay(item.amount, 'CAD')}
                    </dd>
                  </div>
                )
              )}

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium">
                  Balance <span className="text-gray-400">(Due now)</span>
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {balanceDue}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookPage
