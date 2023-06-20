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
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  //USESVR: here
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!stripe || !elements) return

    const { error: submitError } = await elements.submit()
    if (submitError) {
      return
    }

    const res = await fetch(`/book/api?` + params.toString(), {
      method: 'POST',
    })

    const { client_secret: clientSecret } = await res.json()

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_URL}/payment`,
      },
    })

    if (error) {
      // handle error
    }
  }
  return (
    <form className="flex flex-col space-y-5 pb-16" onSubmit={handleSubmit}>
      <h2 className="text-charcoal mt-4 text-lg font-medium">Head Charterer</h2>

      <LinkAuthenticationElement options={{}} />
      <h2 className="text-charcoal text-lg font-medium">Address information</h2>
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
      <h2 className="text-charcoal mt-4 text-lg font-medium">
        Payment information
      </h2>
      <PaymentElement options={{}} />
      <Button variant="primary" type="submit">
        Pay
      </Button>
      <div className="flex justify-center text-xs text-gray-600">
        <p>Personal and payment information securely handled by Stripe.</p>
      </div>
    </form>
  )
}
