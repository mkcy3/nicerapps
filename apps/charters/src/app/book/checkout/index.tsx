'use client'
import { Elements } from '@stripe/react-stripe-js'

import getStripe from '@/lib/stripe'

import StripeElements from './stripe-elements'

const appearance = {
  /* ... */
}
const loader = 'auto'
function StripeCheckout({ clientSecret }: { clientSecret: string }) {
  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance, loader }}
    >
      <StripeElements />
    </Elements>
  )
}

export default StripeCheckout
