'use client'
import { Elements } from '@stripe/react-stripe-js'

import getStripe from '@/lib/stripe/get-stripe'

import Extras from '../extras'
import StripeElements from './stripe-elements'

const appearance = {
  /* ... */
}
const loader = 'auto' as const

type StripeCheckoutProps = {
  amount: number
  children: React.ReactNode
  nights: number
}
//USESVR: refactor and useReducer for extras when theres more

function StripeCheckout({ amount, nights, children }: StripeCheckoutProps) {
  const options = {
    mode: 'payment' as const,
    amount: amount,
    currency: 'cad',
    appearance,
    loader,
  }

  return (
    <>
      <h1 className="sr-only">Booking</h1>
      <div className="min-h-screen lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          {nights > 1 && <Extras />}
          <Elements stripe={getStripe()} options={options}>
            <StripeElements />
          </Elements>
        </div>

        {children}
      </div>
    </>
  )
}

export default StripeCheckout
