'use client'

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function StripeElements() {
  const stripe = useStripe()
  const elements = useElements()

  //USESVR: here
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()
    if (submitError) {
      return
    }

    const res = await fetch('/book/api', {
      method: 'POST',
    })

    const { client_secret: clientSecret } = await res.json()

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'http://localhost:3000/success',
      },
    })

    if (error) {
      // handle error
    }
  }
  return (
    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
      <h2 className="text-lg font-medium text-gray-900">Head Charterer</h2>

      <LinkAuthenticationElement options={{}} />
      <h2 className="text-lg font-medium text-gray-900">Address information</h2>
      <AddressElement
        options={{
          mode: 'billing',
          fields: { phone: 'always' },
          validation: {
            phone: {
              required: 'always',
            },
          },
        }}
      />
      <h2 className="mt-4 text-lg font-medium text-gray-900">
        Payment information
      </h2>
      <PaymentElement options={{}} />
      <Button variant="primary" type="submit">
        Pay
      </Button>
    </form>
  )
}
