'use client'
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { Stripe, StripeElements } from '@stripe/stripe-js'

import getStripe from '@/lib/get-stripe'

const loader = 'auto'
const appearance = {
  /* ... */
}

export default function Checkout({ clientSecret }: { clientSecret: string }) {
  const stripe = useStripe() as Stripe
  const elements = useElements() as StripeElements

  async function handleSubmit() {
    //event.preventDefault()

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    })

    if (error) {
      // handle error
    }
  }
  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance, loader }}
    >
      <form onSubmit={handleSubmit}>
        <h3>Contact info</h3>
        <LinkAuthenticationElement options={{}} />
        <h3>Payment</h3>
        <PaymentElement options={{}} />;<button type="submit">Submit</button>
      </form>
    </Elements>
  )
}
